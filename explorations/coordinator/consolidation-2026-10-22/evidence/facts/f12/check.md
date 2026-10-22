<!-- The clarity check of FACTS chunk f12 (F-131, F-132, F-133, F-135, F-136, F-137, F-140, F-141, F-142): each rewrite compared with the record's entry and its sources, the cold reader's answers compared with the source meaning, and each failure classed with its proposed fix. -->

# FACTS chunk f12: the check

Read on `main` at `34fbf49d4`. The nine entries in `FACTS.md` are as `assessment.md` quotes them at `4caa90c81`. For each entry I read the record's text (`facts-extract.sh 'F-N'`) and its history. I also read the positions, facts and gap-ledger rows that the entry cites, the report sections, the tests, and the code where a claim is about the code. No command was run beyond reading.

Classes: **concept** (a concept the reader lacked, and where it belongs), **wording** (a proposed wording), **uncertain fidelity** (the source that settles it, settled here where I could).

## Across the chunk

- **"Lone" is defined without its condition, in F-137, F-141 and `concepts.md`.** The rewrite defines a lone type parameter as "one that is the whole declared type of some argument". Walk's rule takes such a parameter only if no other argument fixes it. The code says so: `interpreter/evaluator/EvaluatorBase.java:639-643` skips a lone parameter that the first pass fixed, and the javadoc at `:521-522` reads "a type parameter that is the whole declared type of some argument and that nothing else fixes". The report says so too (`rung-inference-walk/REPORT.md` section 2: "If the first pass fixed it, its arguments are left to the binding"), and so does row 432's note: "Rung K's rule chooses only for a type parameter that stands alone, so `Int` still fixes `T` through `BIG +`'s `Generator[\T\]` parameter". The definition is new in the entries, so the drop is the rewrite's. Without it, a reader can conclude that `T` in `f[\T\](a: T, xs: List[\T\])` is promoted. That is the case row 432 is about. `concepts.md`'s row for the term needs the same condition. I checked it for walk only, not for the checker's use in F-73.
- **"With no narrowest candidate, … takes its bound", in F-137 and F-141's title.** The source has a condition here: walk takes the bound only "where every argument's type is a subtype of it", and otherwise the arguments' join (`decision-record.md` D5; `EvaluatorBase.java:648`, javadoc `:524-528`). The record dropped this condition before the rewrite (F-137's text at the F3 consolidation still had "takes its declared bound where every argument is below it … else the old unification"). The rewrite keeps the drop. I list it as uncertain fidelity, inherited and now settled.
- **`Bottom` against `BottomType`.** The skill's core calls the empty type `Bottom`, and F-141 says `BottomType`. Give the skill's name, with walk's class in brackets once.

## F-131

**Fidelity**
- Fail. "Gated, for the integer coercions and `=`, by `tests/FlatTowerRungF.fss`." This says less than the test does. `FlatTowerRungF.fss:16-34` (`shape`) asserts that none of the seven older types is another's subtype and that each is a `Number`. `:36-76` asserts the integer coercions, `QQ` from all five integer types (`:58-67`), `RR64` from a `ZZ32` and from a numeral (`:68-71`), and `=`. `run()` runs every group (`:193-199`). The cold reader concluded that the test gates "only the integer coercions and `=`, not the sibling structure itself or the `QQ` … coercions".
- Pass: `IntLiteral` scoped to the compiled checker, with walk's numeral a `ZZ32`, `ZZ64` or `ZZ` (P-76: "Walk still gives an integer numeral the type `ZZ32`, or `ZZ64` or `ZZ` when its value does not fit"); `QQ`'s coercions (`Library/FortressLibrary.fsi:399-404`); `RR64` from `RR32` (`:301`); "It builds P-43".

**Comprehension**
- "The integer types and `RR64` convert by P-74's coercions": the reader cannot tell which pairs convert, in which direction, or whether `IntLiteral` counts as an integer type. P-74 states the pairs.
- "`NN32` into `RR64` waits (P-75)": the reader takes "waits" as either decided or undecided. By P-75, the coercion is decided, and how to build it waits for the curator's choice.
- "is refused (row 432)": the reader cannot tell whether the program is refused at load or fails at run time. Row 432 says "Failed to find any matching overload", at run time.
- "bare": not defined.
- Walk's three numeral types: the rule ("when its value does not fit", P-76) is missing. Without it, F-137's "walk reads a numeral as a `ZZ32`" reads as a contradiction.

**Classes and fixes**
- Wording (the gate): "Gated by `tests/FlatTowerRungF.fss` for every type but `RR32` and `IntLiteral`: none is another's subtype, their coercions and `=`; `RR32`'s place is gated with F-139, `IntLiteral`'s with F-79."
- Wording (coercions): "Each wider integer type converts from each narrower one, and `RR64` from a `ZZ32` and an `IntLiteral`; a `ZZ64` goes into `RR64` only when written out (P-74)."
- Wording: "`NN32` does not yet convert into `RR64`: P-75 decides that it will, and how to build it waits for the curator's choice."
- Wording: "a big operator over a list of numerals, with no static argument on either, such as `SUM <|1, 2, 3|>`, finds no matching overload at run time (row 432)".
- Wording: "walk still gives it `ZZ32`, or `ZZ64` or `ZZ` when its value does not fit (P-76)".

## F-132

**Fidelity**
- Fail. "Gated by `tests/FixedWidthOverflowRungB.fss` (`+`, `-`, `DOT`, negation and absolute value)" leaves out `DIV`, which the test asserts (`FixedWidthOverflowRungB.fss:30`, `:36`: `MIN DIV -1` on `ZZ32` and `ZZ64`). The cold reader concluded that "division … [is] neither named nor gated".
- Fail, small. "Three kinds of operation keep the low bits and raise nothing: … and the shifts `LSHIFT` and `RSHIFT` (F-125)." With a nonnegative count, `RSHIFT` is ⌊x/2^k⌋ (`Specification/basic-lib/basic-integers.tex:52-53`), which keeps the high bits. What the three kinds share is that no `IntegerOverflow` is thrown (`:44-45`, `:55-56`). `narrow` (P-72) and the wrapping operators do keep the low bits.
- Pass: "every arithmetic operation" (P-73: "The rule covers every operation whose result can leave its type"); the two reports; the compiled-path rows.

**Comprehension**
- The compiled path's scope: the reader cannot tell whether the compiled path raises apart from the three gaps listed. The fact is not about the compiled path, and the entry does not say so.
- `DOT`: the reader does not know the multiplication operator's ASCII name.
- `narrow`: the reader does not know the conversion. P-72 names it.
- "the prelude's ranges at the integer bounds": the reader cannot tell what goes wrong. By row 453, they raise `IntegerOverflow` where they should not.

**Classes and fixes**
- Wording (the gate): "(`+`, `-`, `DOT`, `DIV`, negation and absolute value, on the four fixed widths)".
- Wording: "Three kinds of operation raise nothing: the wrapping operators (F-130) and `narrow`, the written conversion of a `ZZ64` to `ZZ32` or an `NN64` to `NN32` (P-72), which keep the low bits; and the shifts `LSHIFT` and `RSHIFT`, which lose the bits shifted out (F-125)."
- Wording: "The compiled path is outside this fact. Its known gaps: the compiler prelude's ranges raise `IntegerOverflow` where their bounds sum beyond `ZZ32` (gap-ledger row 453), `^` saturates, throws an uncatchable Java exception or adds (rows 523 to 525), and `CHOOSE` past its helper's table dies with a Java exception (row 521)."
- Concept: the ASCII names of operators (`DOT` for `·`, `TIMES` for `×`, `DOTPLUS` for `∔`). It belongs in the `fortress-repo` core, "Fortress as a language", beside juxtaposition, since many entries use them. Failing that, write "`DOT` (`·`)" in the entry.

## F-133

**Fidelity**
- Fail. "In the interpreter's library, a range whose bounds are at `ZZ32`'s minimum or maximum gives the right answers, with no overflow." This is broader than the evidence. Row 522's own examples contradict it: `MIN:MAX:3` and `MAX:MIN:1` have their bounds at the minimum and the maximum, and they raise `IntegerOverflow`. The evidence is rows 450 and 451, both fixed, with these tests: `RangeBoundsRungO.fss` (the sizes of `#` and `:` ranges at the bounds), `SeqRangeTopRungO.fss` (`seq(lo:MAX)` and `seq(lo:MAX:2)` give their 3 elements), `RangeEmptyHashRungO.fss` (`MIN # 0` is empty) and `RangeSizeRungO.fss` (F-133's history). The record's text, "The range bodies answer at the integer bounds", was ambiguous, but it did not claim every range. The entry states the exception later ("Open under walk: … row 522"), so a reader who reads to the end can recover it. The first sentence still states it unconditionally.
- Fail, small. Row 480's consequence is dropped: the `=` "applies without error, so such a compiled clause never matches" (row 480).
- Pass: row 480's two conditions restored; row 482 moved out (an extremum expression, `case most > of … end`, is not a range: row 482); rows 479, 481, 514 and 522.

**Comprehension**
- "scalar ranges": the reader does not know the term (P-77: a range of rank 2 or 3 is a tuple of `ZZ32` scalar ranges).
- `Contains`: the reader does not know the library trait (`FortressLibrary.fsi:690`, `opr IN`; `Range` and `Generator` extend it, `:2182`, `:738`).
- The `case` rule: the reader cannot decode the specification's default ("If the type of the guarding expression is a subtype of type `Contains` and the condition expression does not, the default operator is ∈; otherwise, it is `=`", `Specification-1.0-frozen/basic/expressions/case.tex:47-51`), or what the wrong `=` leads to.
- "On the one library": the reader cannot tell whether the defect shows today or only after the switch-over. Row 480 says "in the one-library world"; with the compiler library the checker picks ∈.
- `RangeBoundsRungO` has no folder, and "raises at construction" names no exception.

**Classes and fixes**
- Wording: "In the interpreter's library, a range that reaches `ZZ32`'s minimum or maximum has the right size and elements, with no overflow, unless it is strided and a difference of its bounds leaves `ZZ32` (row 522, below)." Gated: add `SeqRangeTopRungO` and `RangeEmptyHashRungO`, and write `tests/RangeBoundsRungO.fss`.
- Wording: "When the compiled checker reads the one library, as every compiled program will after the switch-over, a `case` without a comparison operator whose guard is typed by a type variable bounded by a `Contains` type (the library's trait of a membership `IN`, which ranges extend), or by a union of them, compares by `=` where the specification gives ∈, so the clause never matches (row 480); over the compiler library the checker picks ∈."
- Wording: "… raises `IntegerOverflow` at construction (row 522)".
- Concept: scalar range, in the `fortress-repo` skill's `references/library.md`, where ranges are described: a range of rank 1, over `ZZ32`; a range of rank 2 or 3 is a tuple of them (P-77).

## F-135

**Fidelity**
- Pass. "On the compiled path" holds: `CodeGen.delegate` is the support (report section 1, item 2; section 7). The rewrite's "the operands of an operator, such as `||`, can run as such tasks" is no broader than section 1, item 3 ("the method's `||` operands are run as a task"), and section 3, "The parallelism analyzer's operands reach the same `forExprsParallel`, whose one call of `delegate` … makes every task class". "Walk makes no task classes" adds nothing beyond what the skill says of walk.

**Comprehension**
- "names the task class with them": the reader cannot tell whether the class becomes a template or only carries the parameters in its name. By section 1, item 2, `delegate` "makes the task class generic over the task's free static parameters, as `forFnExpr` does for a closure".
- "can run": the reader reads it either as "now work" or as "may, by the scheduler". The sentence also does not say why `||` is the example.

**Classes and fixes**
- Wording: "The code generator makes the task class generic over them, a template like a closure's class, which the class loader instantiates at the enclosing call's static arguments. So, in a generic method, the operands of an operator that the compiled path runs as parallel tasks, such as those of the concatenation `||`, run in such generic task classes."

## F-136

**Fidelity**
- Fail, a condition dropped. `atTemplateParams` returns nothing unless both the arm and the dispatcher's principal declaration are `DeclaredFunction`s, that is, top-level function declarations (`compiler/OverloadSet.java:1345-1346`). The report says the change "covers top-level generic functions whose dispatcher is a template" (`rung-generic-runtime/REPORT.md` section 9), and it lists "functional methods in a top-level set" as not measured. The title, "a generic arm of a template dispatcher is called …", reads wider than that. Uncertain fidelity, settled by the code.
- Fail, a status unmarked. "Otherwise the call takes the old path." For a count that differs or a static parameter that is not a type, this is read in the code (`OverloadSet.java:1817-1821`, `invokeParticularMethod`), and section 9 says that neither case was measured. The entry does not say so, and it does not say what the old path is. Section 9 does: the arm "was tested at an instantiation read from the value".
- Fail, narrower than the code. "`opr` and `nat` arguments lack it (F-45)." The kind test at `OverloadSet.java:1350` refuses a dispatcher whose static parameter has any kind other than a type: `nat`, `int`, `bool`, `opr`, dimension or unit (`astgen/Fortress.ast:2098-2128`). The title's "each of the dispatcher's is a type" is right; this sentence narrows it.
- Fail, small. Row 496 has a condition: "reached through an argument of static type `Any`". For a dispatcher that is not a template, the defects are the `ZZ32` spelling and an arm's static parameter left unrewritten (`Marker⟦X⟧`; section 9, `PlainBesideZZ32`, `PlainBesideRet`). "Where an arm names its static parameters differently from the dispatcher" does not fit such a dispatcher, which has no static parameters.
- Pass: two conditions in the title; the instantiation test and its result (row 499; section 9, "the compiled answer moved from the more specific arm to the less specific one"); rows 493 and 494 fixed for template dispatchers.

**Comprehension**
- "arm" and "template dispatcher": the reader does not know the concepts. They belong in `references/compiler.md`, as `concepts.md` says.
- "the old path": see Fidelity.
- "lack it": the reader cannot tell what "it" refers to.
- "The arm's kinds are not checked": the reader cannot tell what follows. Section 9 says: "an arm with a `nat` parameter where the dispatcher has a type parameter is not guarded out" (not measured).
- "in the more-specific relation … tested at the call's instantiation": the reader decodes it only through the example.
- "spells differently": the two spellings are in row 494: `fortress|CompilerBuiltin%ZZ32` and `…runtimeValues|FZZ32`.

**Classes and fixes**
- Uncertain fidelity, settled. Wording for the title: "On the compiled path, a generic top-level function, as an arm of a template dispatcher, is called at the dispatcher's own static parameters, by position, where it has as many static parameters as the dispatcher and each of the dispatcher's is a type."
- Wording: "Otherwise, by reading of `OverloadSet`, the dispatcher still reads the arm's static arguments from the argument's run-time value, as before the change; this is not measured for a count that differs or for a dispatcher with a `nat`, `int`, `bool` or `opr` parameter. The arm's own kinds are not checked, so an arm with a `nat` parameter at a dispatcher's type parameter is not guarded out (by reading)."
- Wording: "Where one arm is more specific than another but does not line up with the dispatcher position by position, the dispatcher tests both at the call's static arguments, not at static arguments read from the value, so the less specific arm can run: …"
- Wording: "Generic dotted methods (row 495), and a generic declaration beside a plain one reached through an argument of static type `Any` (row 496), still die with `ClassCastException`: on an arm's static parameter left unrewritten, or on `ZZ32`, which the run time spells `…runtimeValues|FZZ32` and static code `fortress|CompilerBuiltin%ZZ32`. For template dispatchers both are fixed (rows 493 and 494)."
- Concept: template dispatcher and arm, in `references/compiler.md` (as `concepts.md`).

## F-137

**Fidelity**
- Fail, a condition dropped: "lone" (see "Across the chunk"). This also hides why row 432 is not reached.
- Fail, inherited: "With no narrowest candidate, the parameter takes its bound (F-141)" (see "Across the chunk").
- Pass: walk's promotion from run-time types is marked a default (P-46: "a choice taken without the curator's word, which waits for his review (review-queue item 85)"; `review-queue.md:765`). The examples match `tests/InferCoercionRungK.fss:41` and `:47`. The rows have their cases (rows 486, 510 and 511). The numeral case is marked an inference (`041682188`: "walk's numeral is a `ZZ32` until rung Q").

**Comprehension**
- "Not reached": the reader cannot tell whether the cases are defects or untested. All four rows are open defects (NEGATIVE-VERIFIED), and row 486's refusal is the binding's, not a call's.
- "promotion", "promotes": the reader does not know the concept. It belongs in the `fortress-repo` core, as `concepts.md` says.
- The numeral case: the reader cannot follow it, since `ZZ32` coerces into `RR64`. The case is a bound that a `ZZ32` neither extends nor coerces into: the rule admits by subtyping or one coercion (`Coercions.admits`, report section 2). "walk reads a numeral as a `ZZ32`" also conflicts with F-131's three types, unless the numeral fits.
- "`ZZ64` with `RR64` gives the declared bound": the reader cannot tell whether the bound is the narrowest candidate or the fallback. It is the narrowest candidate: a `ZZ64` goes into `RR64` only when written out (P-74), so only the bound admits both (`InferCoercionRungK.fss:47`, "nothing is converted").

**Classes and fixes**
- Uncertain fidelity, settled. Wording: "A lone type parameter, one that is the whole declared type of some argument and that no other argument fixes through a type such as `List[\T\]`, takes …"
- Uncertain fidelity, settled. Wording: "With no narrowest candidate, it takes its bound where every argument is below the bound (F-141), and otherwise the arguments' join."
- Wording: "The rule does not reach these open defects: …, a `nat` parameter used as a value at an `NN32` binding, refused at the binding (row 486), …; nor, by inference and not measured, a numeral that fits `ZZ32` passed alone for a parameter whose bound a `ZZ32` neither extends nor coerces into, since walk reads such a numeral as a `ZZ32` (P-76)."
- Wording: "and `ZZ64` with `RR64` gives the declared bound, the only candidate that admits both, since a `ZZ64` goes into `RR64` only when written out (P-74)."
- Concept: promotion, in the `fortress-repo` core (as `concepts.md`). Also define "lone" there, with the condition above, for F-73, F-137 and F-141.

## F-140

**Fidelity**
- Fail, a limit dropped. "Row 325 left: its subject is a numeral outside a bounded integer type, not a size" (proposals.md, and the apply file's note). Row 325's notes name "a `nat` size above ℤ32's range" among the shapes of its compiled failure: a run-time error where the specification gives a static one. The size-range report files a size case under walk as a note on row 325 (section 12, item 15): "Walk's `ZZ32`-declared return answers a size from 2^31 to 2^32-1 as a `ZZ64` value". Both cases bear on the entry's own sentence, "Walk reads a size used as a value as a `ZZ32` up to 2^31-1 and as a `ZZ64` above; the checker types it `IntLiteral`". The assessment allowed either giving the row its subject or dropping it, but its subject does include sizes.
- Fail, small. The gate names fewer tests than the report: `compiler_tests/NatRtBigSize` (section 12, item 2, the checker's refusal) and `tests/XXXNatArithProductWalk` and `XXXNatArithSumWalk` (item 11, walk's exact size arithmetic) are left out. F-140's history listed them.
- Pass: the title scoped by row 675 and F-222; the kinds' ranges; row 527.

**Comprehension**
- The `XXX` tests "for the refusals": the reader takes them for deferred defects. The skill defines an `XXX` test as an expected failure that "asserts the answer that the specification gives, and fails today" (`tests-writing.md`). These tests instead pass because the program is refused, which is the answer (section 12, item 2: "`XXXNatRangeChecker` (a refusal test)"). `XXXNatBeyondNN32Walk.fss` prints `REACHED`, and is then refused when it binds `Box[\4294967296\]`.
- "when it binds one": the reader cannot tell whether walk refuses at load or at run time. It refuses at run time, at the binding (the test above; `EvalType.java:256-273`).
- "reads a size exactly": the reader takes "exactly" as unclear. It means read and computed with no wrap (`Math.*Exact`, history).
- "with a size `k + 1`": the declaration is in row 675: `next[\nat k\](): ZZ64 = sz64[\k + 1\](Box[\k + 1\](0))`.
- `XXXNatRangeChecker` and `XXXNatArithRangeChecker` have no folder: they are in `compiler_tests/`.

**Classes and fixes**
- Wording (restore the limit): "Open: on the compiled path a `nat` size above `ZZ32`'s range fails at run time, as a numeral beyond `ZZ32` does, where the specification refuses it statically; and under walk a `ZZ32`-declared return passes such a size on as a `ZZ64` (both notes on gap-ledger row 325, a numeral outside a bounded integer type)."
- Wording: "… and by walk at run time, where it binds the size to a static parameter; walk reads and computes a size exactly, with no wrap."
- Wording: "Gated by `tests/NatBigSizeWalk` for walk's reading, and for the refusals by `compiler_tests/XXXNatRangeChecker`, `XXXNatArithRangeChecker` and `NatRtBigSize` and `tests/XXXNatBeyondNN32Walk`, `XXXIntBeyondZZ32Walk`, `XXXIntBelowZZ32Walk`, `XXXNatArithProductWalk` and `XXXNatArithSumWalk`, each `XXX` test green because its program is refused."
- Wording: "`next[\nat k\]()`, which builds a `Box[\k + 1\]`, answers 4294967296 at `k = 4294967295` (row 675; F-222)".
- Concept: an `XXX` test whose expected failure is a refusal that a decision requires. It belongs in `references/tests-writing.md`, beside the definition of `XXX`, which names only deferred defects.

## F-141

**Fidelity**
- Fail, a condition dropped: "lone" (see "Across the chunk").
- Fail, inherited: the title's "a lone one with no narrowest candidate takes its bound" (see "Across the chunk").
- Fail, conditions dropped in the clause moved from F-142: "A type parameter that the arguments bound only from above, because the declared parameter types mention it only in the domain of a function parameter, as in `g: T -> ZZ32`, takes the meet …". The source gives two more conditions and a guard: "mention only in arrow domains, an odd number deep, and never inside a static argument", and the meet is taken "where its lower end is `BottomType`" (`rung-walk-meet/REPORT.md` section 1, row 588; `EvaluatorBase.java:408-413`, `polarities`). As written, `g: (T -> ZZ32) -> ZZ32` and `g: List[\T\] -> ZZ32` fit the sentence, but walk does not treat `T` as bounded only from above in either.
- Fail, a default not marked. "A big operator's parameter, at a clause form that writes no static argument, is fixed first by the declared type of its value or by its elements' join (F-228). Two rules are defaults of the walk-instance rung's decision record: …". By naming exactly two defaults, the entry lets a reader take F-228's rule as settled. That rule is the coordinator's call, waiting for the curator's review: F-228, "It builds P-48 by the coordinator's call"; review-queue item 210, "Landed: As built (`20474c144`; F-228). … Default: as built." The record's text had grouped it among "its departures by the rung's decisions". Uncertain fidelity, settled by item 210.
- Pass: D3 marked a default with item 80 (`review-queue.md:740`; row 592, "deliberate"). D5 is named with item 4, whose home is "PLAN, 'Climb batch 9, listed for his review', D5's reach" (`review-queue.md:85`). Rows 587, 589, 591, 612 and 616 are correct.

**Comprehension**
- "F-bounded": the reader matched it from general type theory. The skill's core describes the case ("one whose bound names the parameter itself stays open") but does not name it.
- "clause form": not defined. It belongs in the `fortress-repo` core (as `concepts.md`). The core already says "a reduction or a comprehension without static arguments", which the entry can use instead.
- "takes the arguments' type": the reader cannot tell whose type. Row 592's example settles it: `ap[\T, A extends T\](a: A)` gives `T` the type of `A`'s argument.
- "keeps": the reader asks what the contrast is. D5 means that such a parameter keeps the rule from before the rung: the arguments' supertypes are candidates, and it takes no bound.
- "an untyped function expression's result (row 587)": the defect is not stated.
- Row 589's "whose repair changes which declaration runs": the reader reads it only as "needs care". The repair is the curator's to decide (row 589; review-queue item 18).

**Classes and fixes**
- Uncertain fidelity, settled. Wording, title: "… and a lone one with no narrowest candidate takes its bound where every argument is below it."
- Uncertain fidelity, settled. Wording: "A type parameter that the declared parameter types mention only in function domains, an odd number of arrows deep and never inside a static argument, as `T` in `g: T -> ZZ32`, is bounded by the arguments only from above; where nothing bounds it from below, it takes the meet of its declared bound and the bounds that the arguments place on it."
- Uncertain fidelity, settled. Wording: "A reduction or comprehension that writes no static argument fixes its big operator's parameter by the declared type of its value, else by its elements' join (F-228), the coordinator's call, which waits for the curator's review (review-queue item 210). Two more rules are defaults of the walk-instance rung's decision record: …"
- Wording: "a parameter that only another fixed parameter's bound mentions takes that parameter's instance, not its own bound: `ap[\T, A extends T\](a: A)` gives `T` the type of `a` (D3, row 592; …); a lone one whose bound mentions a static parameter has the arguments' supertypes among its candidates, and so takes their narrowest common supertype, never its bound (D5; …)".
- Wording: "a parameter that only the result of a function expression with no declared return type fixes, which takes `Bottom` (row 587)"; "… whose repair changes which declaration runs, the curator's to decide (review-queue item 18)".
- Concept: F-bounded, in the `fortress-repo` core, "Static parameters", where the case is already described.

## F-142

**Fidelity**
- Fail, a count that is no longer current. "Symbolic operators are skipped, as the compiled checker skips them; over them the rule breaks at five library sites, such as `EmptyString`'s `||` (gap-ledger row 611)." The rewrite brought in the count. It is the walk-meet rung's measurement (`rung-walk-meet/REPORT.md` section 11, item 1, landed in `833420ce4` on 2026-10-03). Row 611's own notes say the 2D and 3D ranges inherited their `|self|` sites "until `b872d65a1`" (2026-10-09). F-245, measured at `d212b2c1f` (2026-10-17), says that walk's meet check, widened to operators, "refuses only `EmptyString`'s `||`, which one declaration clears". The record's text gave no count. Uncertain fidelity, settled by F-245 and row 611's notes. Row 611's claim column also still says five; that is for the ledger.
- Pass: the stand-in's limit follows the code's comment (`interpreter/evaluator/BuildEnvironments.java:1052-1057`); the upper-end clause moved to F-141; row 611's subject given.

**Comprehension**
- "the Meet Rule for Functional Methods": the reader cannot say what a violation is. It belongs in `references/interpreter.md` and `compiler.md`, as `concepts.md` says.
- "through a stand-in for every instance": the reader takes it as one stand-in or one per instance. It is one type that stands for every instance (`symbolicInstance`, `BuildEnvironments.java:1054`).
- "or that a supertype mentioning one provides, is read": the reader cannot parse it.
- "Symbolic operators": the reader does not know the term. `checkedName` (`OverloadedFunction.java:1990-1994`) passes an operator only where `NodeUtil.validOp` holds: a name of capitals and underscores, such as `MAX` or `DOT`, or one of a few words such as `juxtaposition`. So an operator written in symbols, such as `+`, `||` or `|_|`, is skipped. `SUM` and `PROD` are skipped as well.

**Classes and fixes**
- Uncertain fidelity, settled. Wording: "Symbolic operators are skipped, as the compiled checker skips them. Checked, they would refuse only `EmptyString`'s `||` at load, which one declaration clears (row 611; F-245, measured at `d212b2c1f`)."
- Wording: "A type with static parameters is checked through one type that stands for all its instances (F-145). That check skips each pair of functional methods whose parameter types mention a static parameter, and each pair that a supertype whose type mentions one provides."
- Concept: symbolic operator, in the `fortress-repo` core, "Fortress as a language", beside operators: an operator named by symbols, as against a name in capitals. F-80, F-142 and F-245 use it. Also the Meet Rule (as `concepts.md`).

## For the coordinator

- `concepts.md` needs four more rows: an operator's ASCII name, a scalar range, an `XXX` refusal test and F-bounded. Its row for "lone" needs the condition "that no other argument fixes".
- The apply file's note for F-140 gives the reason that row 325 left as "a numeral …, not a size". With the fix above, row 325 stays, with its size cases.
- Row 611's claim column still says "five library sites"; its notes and F-245 say otherwise. This is a ledger edit, not this chunk's.
- The writer's other points for the coordinator stand: row 482 has no FACTS owner, F-144 cites a clause of F-141 that is gone, and P-76's title wrongly includes `RR32`. The old titles of F-135, F-136, F-140, F-141 and F-142 are quoted only in batch briefs, reviews and process notes (for example `coordinator/CLIMB-BATCH-10.md`, `process-engineering/record-test/key.md`). Those files are historical, and a title query still finds the entry through `FACTS-history.md`.
