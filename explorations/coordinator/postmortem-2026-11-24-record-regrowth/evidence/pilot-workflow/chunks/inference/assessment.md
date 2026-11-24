<!-- Assessment of chunk "inference" (30 entries) by the rubric of explorations/reviews/revival-record-synthesis.md, "For Claude: assess all FACTS, rewrite only failing entries". Entries read at the working tree on 2026-11-24; scout.md beside this file used for sources, rows and overlaps. Bounded checks made here: Functionals.scala around :962 and :1027; inference.tex :45-195; distance/run.sh :1-138; ledger rows 21, 436, 665, 1012, 1021; F-253; the report folders under explorations/compile-ladder/. -->

# Assessment: chunk inference

Marks: S scope, PM present meaning, E evidence, C comprehension, O ownership, K consistency. Each is pass, fail or unresolved. A fail quotes its passage.

Totals: keep 11, reword 9, reorganize 8, investigate 2. 30 of 30 assessed.

## Walk: generic instantiation

### F-28: reword
- S pass: the title and body are both about walk at an `Any` return type.
- PM pass.
- E pass: `GenericReturningAny.fss` exists, row 157 is FIXED, and the report section 3 exists.
- C **fail**: the residual gap is stated, but what it does is not. Quote: "Its visitor has no case for 11 of the syntax tree's 18 concrete type classes, and of those only the dimension forms can be written as a return type." The reader cannot tell what happens to a dimension-form return type (refused, wrong instance, crash?), or whether a row holds it. The scout found no row.
- O pass: one subject.
- K pass.

### F-344: keep
- S pass: the title states both halves (the reading for inference, and the printing) and the body serves them. Both come from one mechanism, `LanguageTypes.java`.
- PM pass.
- E pass: the test, the source lines and the report section exist.
- C pass.
- O pass: the two claims change together, since they come from one component's table. The map's split of the printing half to F-123 is optional, not required.
- K pass: agrees with F-123, F-74 and F-328 on `Cell(3)`.

### F-367: reword
- S pass.
- PM **fail**: it uses a status word. Quote: "Not built: an immutable top-level variable keeps the generic value (row 1019)".
- E pass: the source files, the three tests and the rows 1018 to 1021 (NEGATIVE-VERIFIED) exist.
- C pass.
- O pass: one subject. The checker's refusal (row 1021) is a consequence for a program written for both paths.
- K **fail**: the entry says the checker refuses the form at `Any`, but F-365 and ledger row 1012 say the checker accepts a reference at `Any`, which then dies at run time. Quote: "Where the arrow type leaves a static parameter of the function open, and at `Any`, a type parameter or an untyped place, the value stays generic ...; the compiled checker refuses those forms (row 1021)." Row 1021 says "The checker refuses both", meaning the open arrow and the untyped place. Row 1012 says the checker accepts the reference at `p(x: Any)`. The support settles the scope, so a rewording is enough: the checker refuses the open-arrow and untyped forms, and accepts the reference at `Any` (row 1012, F-365).

## Static-argument inference on both paths

### F-51: keep
- S pass: the title says "on both paths" and both tests are named (one walk, one compiled).
- PM pass: row 388 is fixed, so this is the current property.
- E pass: the tests and the probe note exist, and row 388 is FIXED.
- C pass: the `scale` example makes the claim concrete.
- O pass: one case of the inference rule, with its own consequence for the library's array-scalar operators. That consequence is held nowhere else. The map would merge it into F-73, but nothing in the entry fails.
- K pass: agrees with F-73 and F-137.

### F-55: reorganize
- S pass.
- PM pass.
- E pass: the tests and report sections exist. Row 510 is NEGATIVE-VERIFIED and agrees.
- C pass.
- O **fail**: the entry is mostly a summary that repeats its owners. Quote: "F-73 gives the checker's rule and F-137 walk's; F-87 lists where the checker has an expected type." The row-510 example ("`a: BoxK[\ZZ64\] = wrapK(3)` ... is refused") is also held in F-137 (row 510) and F-228 (rows 510, 705). The "bounded by `Any`" sentence points to F-78. Its one conclusion of its own ("on both paths ... narrowest type ... P-74") belongs as a sentence of F-73 and F-137, pointing to each other.
- K pass: agrees with F-73, F-137, F-78 and F-141. A parameter with no written bound takes `Any`, which is its declared bound and the intersection of its bounds.

### F-73: reorganize
- S pass: the title and body agree on the compiled checker.
- PM pass.
- E pass: `NatLitArgChecker` and the other tests exist. Rows 506 and 507 are NEGATIVE-VERIFIED.
- C pass.
- O **fail**: two claims answer other questions and change apart from inference. (1) The ranking of declarations: "A coerced declaration ranks below one that needs no coercion. A tie among coerced declarations is refused, 'Ambiguous coercion', outside three narrow cases". This is the choice among a call's declarations (owner F-408). (2) The reading of numerals: "When the tied declarations differ only at positions where the call passes a numeral, the checker reads the numeral as `ZZ32`, or as `ZZ64` or `ZZ`...; that reading builds P-173's rule". This belongs to the numeral defaults (owner F-342). Also, "the report's section 3.2" in the body repeats the Detail pointer.
- K pass.

### F-78: reword
- S pass.
- PM pass.
- E **fail**: one cited source no longer holds the claim. Quote: "the order, by reading, `compile-ladder/rung-instance-bound/decision-record.md`, D4, and `scala_src/typechecker/impls/Functionals.scala:962-966`." Lines 962-966 now hold helper definitions (`candidatesOf`, `counted`, `holds`). The attempt list is at `:1027` (`val attempts`). The claim itself is supported by D4 and the code. Only the pointer needs mending: cite by name, not by line.
- C pass, with one note: "an agent's choice, the instance-bound rung's (its decision record, D4)" is plain enough and correctly marks a worker's choice, not a ruling.
- O pass. The run-time defect, row 559, is the consequence of its row-541 claim. The map would move it to F-377, but the entry is readable as it is.
- K pass: agrees with F-173, F-271 and F-141 (walk's twin, the declared bound).

### F-137: keep
- S pass: walk only, and the title states the rule.
- PM pass.
- E pass: `InferCoercionRungK.fss` exists and rows 509 to 511 agree. The unmeasured claim is marked "by inference, not measured".
- C pass: the meaning of "lone type parameter" is defined in the entry.
- O pass: one subject, with its defects.
- K pass: agrees with F-141 (its bound, else the join) and with F-55 and F-228 on row 510.

### F-141: reorganize
- S pass.
- PM **fail**: plan and status language. Quote: "whose repair changes which declaration runs, the curator's to decide". Also: "That rule is the coordinator's call." This is about who decided, not what the tree does. It belongs in the history, or in a review-queue item that names the entry.
- E pass: the tests, the reports and the walk-instance `decision-record.md` exist. The scout's "MISSING" was a bare-name lookup; the file is at `explorations/compile-ladder/rung-walk-instance/decision-record.md`. All six rows agree.
- C pass.
- O **fail**: it restates the rule that F-228 owns. Quote: "A reduction or comprehension that writes no static argument fixes its big operator's parameter by the declared type of its value, else by its elements' join (F-228)." It also repeats F-137's definition of the lone parameter. Its own rules (the declared bound, the meet for contravariant positions, the defaults D3 and D5) and its five defects are the subject. The sentences that F-228 owns should become pointers.
- K pass.

### F-143: keep
- S pass: walk's F-bounded parameter, as the title says.
- PM pass. The probe is explicitly bounded: "no gated test holds this".
- E pass: the three tests and both SKEPTIC files exist (under `explorations/compile-ladder/`). Rows 663 and 825 are CONTESTED, and the entry says so. Row 716 agrees.
- C pass: it defines F-bound, open and skeptic.
- O pass. The sentence on reductions is there to bound where the open type reaches. Without it a reader would misread the scope, so it passes question 2 of record.md.
- K pass: agrees with F-228 on row 716 (an open parameter there takes `ZZ32`'s identity, which is one case of F-228's "takes its bound or stays open").

### F-173: keep
- S pass: the specification's rule, with the paths' departures marked as departures.
- PM pass.
- E pass: `inference.tex:45-125` holds "The Static Arguments of a Call". `XXXInferPromoteNN32` and the `InferLone*` tests exist. Rows 442 and 587 agree.
- C pass.
- O pass. The departures are consequences of the chapter's rule for a reader. They agree with F-138 and F-141 and do not copy their mechanism.
- K pass.

### F-273: keep
- S pass: it states the specification's run-time instance and each path's departure.
- PM pass.
- E pass: `overloading.tex:312-349`, the decision record's sections 5 and 6, and `XXXGenericInstanceUnfixed` exist. Rows 496 and 538 agree.
- C pass.
- O pass.
- K pass: agrees with F-173, F-271 and F-136 (row 496).

### F-271: keep
- S pass. Its limits are explicit ("among other limits").
- PM pass.
- E pass: the extract's sections 6 and 8 and `popl-recheck.md` exist.
- C pass.
- O pass.
- K pass: agrees with F-78 (the intersection of the upper bounds) and F-166.

### F-300: keep
- S pass. PM pass. E pass: every named file is found, and so is the README's licence section.
- C pass. O pass: one subject, where the paper and its licences are. K pass.
- The map's "not about the tree" is a placement question for the coordinator, not a fail of this rubric. The fact is about the repository's contents, and workers act on it (what may be quoted, where the sources are).

## The checker: the expected type

### F-56: keep
- S pass: the call form `f(x)` is stated, and the method and operator contexts are named.
- PM pass.
- E pass: `Operators.scala:88-90` agrees (scout), and the test and measure-D section 1 exist.
- C pass: "tight juxtaposition" is explained.
- O pass. Its warning about the `fnApp = true` path is a consequence for the work that F-87 does not hold. It points to F-87 for the other contexts.
- K pass.

### F-87: reword
- S pass.
- PM **fail**: the title is phrased against an earlier state. Quote: "Besides the contexts that it already had, such as a typed declaration's right-hand side, the compiled checker gives a call its expected type in ...". The reader has to reconstruct which contexts were added and when. The entry should state the current list. The chapter's paragraph lists every context, so the title can point to it.
- E pass: "The expected type" is an `\emph` paragraph label at `inference.tex:129`, inside "The Static Arguments of a Call". It is not a heading, but the citation resolves. The scout's "gone" mark is a false alarm.
- C pass.
- O pass.
- K pass: agrees with F-56, F-221 and F-364.

### F-221: reword
- S pass.
- PM **fail**: two phrases are relative to a change. Quote: "A chain `a OPLUS b OPLUS c` that only the retry makes acceptable to a multifix declaration now runs it, not the binary one." Here "now" refers to a landing.
- E pass: the tests exist, and so do `rung-argument-context/SKEPTIC.md` (the scout's MISSING was a bare-name lookup) and its finding 5. Row 705 agrees.
- C **fail**: the referent of "so" is unclear. Quote: "A reduction's plain-bounded big operator, an argument of `__bigOperator` once desugared, so takes the reduction's expected type". The reader has to infer that the retry is what gives it the expected type.
- O pass: one subject. The reduction sentence is one case of the retry, pointing to F-364.
- K pass: agrees with F-59 and F-364.

### F-364: reword
- S pass: the title is limited to "where the call as written is not accepted".
- PM pass. The measurement of copies is bounded: "Observed once".
- E pass: `reductionApplication`, the tests and the report sections exist. Rows 731, 1007, 1008 and 1015 agree.
- C **fail**: one referent is ambiguous. Quote: "and the model's sum, now written so at `explorations/run-c4/src/MicroGptFlat.fss:38`, give no error". Does "written so" mean written without the argument, or with it? F-59 says the model leaves the argument out. Also, the second sentence (about 90 words, from "For `__bigOperator(BIG OP(), clauses)`" to "takes the first form that is accepted and converts") is hard to restate. It should be split.
- O pass. The library sentence is one pointer clause, so it does not need a split. The map's move of it to F-59 is optional.
- K pass: agrees with F-59, F-221 and F-285.

### F-365: reword
- S pass.
- PM pass. "Still refused" and "still accepted" mark open defects with rows, which is allowed.
- E pass: the files, the four tests and the report step 2 exist. Rows 758, 1009, 1010, 1012 and 1013 agree.
- C **fail**: the referent is ambiguous. Quote: "The test passes a sized generic function to a callee that is not generic". The entry lists four tests, and "the test" names none of them. The kind-environment sentence ("A static parameter of the function's own counts as unbound also where ...") is also hard to restate.
- O pass, with one note: the arrow-memo clause is part of the same repair's correctness. The map's move of it to F-65 is optional.
- K pass: agrees with F-367 once F-367 is mended (see F-367: at `Any` the checker accepts, row 1012).

## Reductions: identities, static arguments, fusion

### F-59: reorganize
- S pass. The title is limited to `SUM` and `PROD`, for which the call as written is never accepted, so "else from the type of its body" holds (F-364).
- PM pass.
- E pass: the tests and `sum-replacement-judgement.md` section 5 exist. "Table 2" is a bold line, not a heading, but it can be found.
- C pass.
- O **fail**: it restates three other owners' rules beside its own. Quote: "A plain-bounded big operator takes its bound, or the reduction's expected type where the bound does not fit (F-221). Walk instantiates the big operator at its value's declared type, else at its elements' join, and leaves the parameter open only with neither (F-228, F-143)." The title also joins the library's identity rule (P-78) and the checker's inference (owner F-364/F-87). It should keep the library rule and the model's sum, with one-clause pointers to the checker and walk.
- K pass: agrees with F-364, F-221, F-228 and F-285.

### F-60: keep
- S pass: the title states what is carried and what is not.
- PM pass. The `BIG MAX` measurement is bounded: "when measured".
- E pass: `tests/simpleSum` and the cited review sections exist. `EmptyReduction` is a library exception name, not a file.
- C pass.
- O pass.
- K pass: agrees with F-144 and P-78.

### F-85: reorganize
- S pass.
- PM **fail**: the title and body tell a rung's work. Quote: "the rung's repairs of the generator, condition, reduction and nested-generator declarations that the compiled checker refused are in forms that the library already uses" and "The sites that the rung left were cleared by other work: F-250 holds ...". The reader must reconstruct which rung and what it repaired.
- E pass: `:1670` agrees, the tests exist, and rows 628, 629 and 632 are FIXED.
- C pass.
- O **fail**: the `cast[\O0\]` claim is also F-285's. Quote: "`__bigOperator2`'s fused branch passes its result through `cast[\O0\]`". Compare F-285: "`__bigOperator2`'s fused arm casts its result to `O0`". The sentence "The sites that the rung left were cleared by other work" is history. What stays is the `Condition` bodies' written static argument and the fused branch's cast, which should be merged with F-285's.
- K pass.

### F-220: reorganize
- S pass. PM pass. E pass: line `:1511` agrees, and the report section 6 exists.
- C pass.
- O **fail**: its one claim is held in F-228, and the rest is pointers. Quote: "F-228 holds how walk runs it: a reduction or a comprehension that writes no static argument is instantiated by its value's declared type, else its elements' join, else its bound." F-228 already says "the library types `__bigOperator`'s local function `body(i: I)` at the element type `I`". The checker's acceptance of the line belongs with F-285, which says the library's reduction sites are clear of the distance. Merge it there.
- K pass.

### F-242: reword
- S pass.
- PM **fail**: the title describes the repair against errors that no longer exist. Quote: "a `where` condition on each of `SumReduction`'s two `distribute` overloads clears their four unmet bounds, and `ActualReduction`'s generic `distribute` ... clears their two return-type errors". Also: "Row 433, fixed; F-250 gives the landing and its test." The current property is the declarations: the `where` conditions and the inherited generic `distribute` over `K`. Why they are written that way is kept. The counted errors and the landing go to the history.
- E pass: both probe reports and their sections exist. No test is named directly; F-250 holds the test, and the entry says so.
- C pass.
- O pass: one subject, the fusion pairs' declarations.
- K pass: agrees with F-250 and P-151.

### F-243: reorganize
- S pass.
- PM **fail**: the entry is history. Quote: "The 13 errors that were filed as waiting on `where` clauses, 13 of the distance's 49 at the gates of climb batches 15b and 16, are all cleared".
- E pass: the probe and batch-17 review exist. Row 436 is cited for the fallbacks' `cast`; the row is about walk's empty `SUM` `CastError` from that same `cast[\T\](0)`. The line is the same, so the citation holds, but the row is a defect of that cast, not its repair.
- C pass.
- O **fail**: a breakdown of a count, pointing to F-242, F-251, F-255 and F-85. The one present-tense counterfactual ("library edits with no new language would also have cleared 12") belongs in the probe report or with F-242. Merge into the history, and keep pointers where needed.
- K pass.

### F-285: reorganize
- S **fail**: a count in the title is false today. Quote: "in the twelve components the distance checks". `explorations/coordinator/tools/distance/run.sh` now lists fourteen (line 3, `COMPONENTS` at :87-90). The added `CovariantCollection.fss` and `OneShotFlag.fss` hold no `SUM`, `PROD`, `BIG` or comprehension form (grep), so the property itself holds for all fourteen. Rewording settles it. The text should say "the components the distance checks", or point to the distance's owner (F-53), not copy the count.
- PM pass.
- E pass: every line cited agrees (scout), and the tests exist. Row 824 agrees.
- C pass.
- O **fail**: walk's behaviour is beside the library rule. Quote: "Under walk, the written comprehension makes `List`'s strided subscript answer a `List[\E\]`; `PureList`'s, at `Library/PureList.fss:73`, answers ... (row 824)". That is walk's reduction instantiation (owner F-228). The site list is also detail for the report. The fused-arm cast should merge with F-85's.
- K pass.

### F-144: investigate
- S pass.
- PM pass.
- E **unresolved**: the row cited for one defect may not be that defect's row. Quote: "One with static parameters escapes that check and stops at its first join (row 665)." Ledger row 665 is "the load check of an inherited abstract method left without a body skips generic objects". It says nothing of `simpleJoin` or of stopping at the first join. The mechanism may be the same (checks at load skip generic instances), but the row does not show it.
- C pass.
- O pass, with one note: the library typing of `AssociativeReduction` and walk's runs of the operators answer one question, what type an identity-less reduction is at. The map's split is optional.
- K pass otherwise. It agrees with F-228 and F-60.
- Question: does a generic reduction escape walk's load-time refusal of a `simpleJoin` at `Any` for the same cause as row 665 (the check skips generic instances, `Constructor.java:263`)? Or is it a separate defect that needs its own row?

### F-228: keep
- S pass: the title states the three steps and the F-bound exception.
- PM pass. Row 718 is stated as a current property ("is read through the trait it extends"), with its fixed row.
- E pass: the seven tests and the report sections exist. Rows 510, 705, 716, 717 and 718 agree.
- C pass: it lists the directing and the non-directing contexts.
- O pass: one subject, with its defects.
- K pass: agrees with F-141, F-143, F-144 and F-221.

### F-248: reword
- S pass.
- PM **fail**: the title is conditional on a capability the tree now has. Quote: "and stops a nested reduction with no fused pair only where walk infers no static argument of a generic method" and "with it, on the tree that holds both, `NestedReductionFusion`'s `SUM` of `SUM`s over `inits` is 11 under walk". Row 21 is FIXED (`743eb5286`), F-253 states walk's inference of a generic method's static arguments, and row 21's notes say the nested reductions of `Generator2.fss:73` run (`NestedReductionFusion`). The present property is that the nested reduction runs. The conditional reading is history.
- E pass: the probe section 5 and the tests exist. Row 744 agrees.
- C pass.
- O pass, with one note: a probe's result on the library's generic `distribute`. The map's merge into F-242 is reasonable, but not required.
- K pass, once worded in the present. Today it reads against F-253.

## The harness

### F-114: investigate
- S **fail**: a count in the title is false today. Quote: "`ant testSpecData` runs 130 of the specification's 133 extracted examples". By the scout and the pilot check, there are now 135 examples, five in `library/`, since `73213e4be4`. The 130 run still holds.
- PM pass.
- E **unresolved**: why the five examples pass. Quote: "they pass only because walk leaves that parameter open (F-143; row 424, fixed)". Since F-228, walk first instantiates such a reduction by a declared type or the elements' join, so these examples may now pass by the join and not by the open parameter. The scout marks this unsettled.
- C pass.
- O pass: one subject, with the walk claim beside it. The map's move of that claim to F-141 depends on the answer.
- K **unresolved**: P-124 says every example must pass, while `library/`'s five run in no suite (followups "Open"). The entry says `library/`'s three are not run, but there are five now.
- Question: at the current tree, (a) how many examples does `SpecData/examples` hold, and how many in `library/`; (b) do the five F-bounded big-operator examples pass by F-228's declared type or join, or still only by the open parameter? (b) needs one walk run of the five with the open fallback traced, or a reading of their clause forms against F-228's contexts.
