# The briefing and checks lists of climb batch 7b's four rungs, S, C, W and L (CLIMB-BATCH-7.md, section 7), in
# batch 6.5's form (explorations/compile-ladder/plan-6.5/manifest/lists65.py). Each briefing entry is a pair: its
# facts-extract.sh key and one line on why it is there and what the rung does with it (the process review's measure 5,
# explorations/reviews/process-review-6b-7-7R.md section 9, approved by Pavol on 2026-09-28 at 14:18 UTC). gen7b.py
# renders the lines at the end of each rung's tail, after its section of the record, in the order of the briefing. A
# checks list is a sub-list of its briefing's keys. `python3 lists7b.py` checks every key with facts-extract.sh --check
# (each must match exactly one place) and every reason's form. Every key names its place by a heading, a declaration's
# first line or a FACTS title, never by a line number, so that it survives the batches that land before 7b; the check is
# run again on the tree 7b is cut from.
SRC = 'ProjectFortress/src/com/sun/fortress'
OVL = SRC + '/scala_src/overloading/OverloadingOracle.scala'
OVC = SRC + '/scala_src/typechecker/OverloadingChecker.scala'
OF = SRC + '/interpreter/evaluator/values/OverloadedFunction.java'
VALS = SRC + '/interpreter/evaluator/values'

STOPS = "Every stop reserved for Pavol is reversible: finish, list it in stopsMet with liftedBy citing this entry, and land."
RUN_TO_RUN = "An output the untouched tree already varies from run to run, its verdict unchanged, is a ledger row and not a stop; apply it to every comparison you run."
GATE_BEFORE = "The rule for your count and distance tables: the last landed gate's tables are your before, not a run of the stage on your unchanged base; capture only the after."
FROZEN = "The frozen copy is the Working Draft of February 2011: quote originals from it, and never edit it (a stop)."
LIB_PRACTICE = "The library's own practice is the standard; find its device for the same kind of problem before any other way."
ANSWER9 = "positions:2026-09-26 answer 9"
ITEM26 = "positions:2026-09-29 PLAN item 26"
ITEM30 = "positions:2026-09-29 PLAN item 30"
ADD = "doc:explorations/reviews/comprises-type-level-proof-addendum.md#"
CONV = "positions:2026-09-28 two decisions of Fable's judgement"
BOUND = "positions:2026-09-29 implicit bound"
COERC = "positions:2026-09-29 walk's run-time choice of coercions"

S_BRIEFING = [
  (ANSWER9, "The decision this rung writes into the text: the sentence goes, the 2011 model with the positional rule, the original kept; cite it in every callout and entry."),
  (CONV, "The rule for conversions and overloading; your cross-reference sentence in the coercion chapter states its first step, and batch N's inference chapter its second."),
  ("positions:2026-09-24 requirement on the plan", "Why the specification changes with the implementation and keeps the original; the reason each of your entries exists."),
  ("positions:2026-09-26 S1", "The form of every change: text in place, a revision callout, an Appendix I entry quoting the original, reasons in a decision record; follow it for each passage."),
  ("positions:2026-09-26 first of the batch-5 answers", "Quote each original as the Working Draft of February 2011, with its path and line in Specification-1.0-frozen/."),
  ("positions:2026-09-26 lineage note", "Cite the later Types chapter and the restart's overloading chapter beside the specification where they cover a topic."),
  ("positions:2026-09-23 fork weighed", "The implementers' later word weighs more than the 2009 text where they conflict; the grounds for dropping the sentence, for the decision record."),
  ("positions:2026-09-26 second batch-5 answer", "Every static argument except an operator argument counts in the exclusion rule; state the reduction of two quantified domains with it."),
  ("positions:2026-09-26 third batch-5 answer", "The precedent for Q3: the covariant keyword named in a callout and the decision record as a design neither path implements; name Naden's instantiation the same way."),
  ("positions:2026-09-27 numerics plans", "Q1's answer, the bound Any, and batch N's inference chapter, which your text cites for instantiation and does not restate."),
  (BOUND, "Q1 decided in Pavol's own words: the bound is Any; your sentence says it, with a callout quoting the Working Draft's Object and naming the compile path's Object setting, row 412, as the divergence until the switch-over."),
  ("positions:2026-09-27 launch of phase 3's batches", "Q2 and Q3 taken at their defaults and listed for his review; you follow Q3's default."),
  ("positions:2026-09-28 comprises clause row 459", "Batch 7C's value reading of a comprises clause, which item 26's decision carries into the four passages and the Meet Rule's closed-trait case."),
  (ITEM26, "Item 26 decided: option 1 with the proof addendum's three points; your four passages, covering, the Meet Rule's case and the proof appendix's revision rest on it."),
  (ITEM30, "Item 30 decided: option 1 of its judgement, the generic declaration at the instance the value fixes, the least instance where it fixes none; your dispatch sentence and example follow it."),
  (COERC, "Item 16 decided: walk's choice of a coercion on the value is the interpreter's limit; your one callout at the coercion chapter's resolved-statically passage says so, cites its two tests and names the switch-over."),
  ("positions:2026-09-19 answering the open question", LIB_PRACTICE),
  ("positions:2026-09-27 stops a batch record reserves", STOPS),
  ("ledger:19", "Walk's coercion, chosen on the value, and the two expected failures where that differs from the text's static choice; your callout cites them, and you append that the text now records the difference."),
  ("ledger:398", "The permuted override the positional rule refuses; append the note that the specification now states the rule."),
  ("ledger:412", "The compile path's Object bound; you revise the implicit bound under Q1, so append the note that the text now says Any."),
  ("ledger:478", "Walk reading one bound for two generic overloads; your text makes its four probe sets legal, so append that its home is now rung W's test."),
  ("ledger:491", "The four passages that read a comprises clause at the level of types, item 26; under its decision you restate them at the level of values and close the row."),
  ("ledger:492", "Both paths refuse the Meet Rule's own example, which your chapter keeps as valid; rungs C and W repair it, and you do not reword it."),
  ("ledger:487", "The closure the coverage proof rests on, unenforced across components; name it in the proof appendix as its open assumption, not this batch's, and append that note to the row."),
  ("ledger:496", "A generic declaration beside a plain one at run time, item 30; under its decision your dispatch sentence gives the answer, and you note the row moves to home 2."),
  ("ledger:499", "The positional reading of generic arms at run time; the passages it cites are those you rewrite, so say which answer your text gives and which it leaves."),
  ("doc:explorations/reviews/overloading-judgement.md#3.4 What the revised specification says", "What the revised text states, rule by rule; your wording follows it and adds nothing it does not name."),
  ("doc:explorations/reviews/overloading-judgement.md#3.5 What the checker enforces", "The two rules rung C builds; your text states exactly these, so check each sentence against it."),
  ("doc:explorations/reviews/overloading-judgement.md#8. Where this differs from the workers and from the S2 judgement", "Why row 398 is the positional rule's and not the sentence's; the decision record's account of the permuted override."),
  ("doc:explorations/reviews/conversion-overloading-judgement.md#1. The rule", "The resolution text for the coercion chapter, unchanged in substance; your sentence renders its applicability clause and points to the inference chapter."),
  ("doc:explorations/reviews/conversion-overloading-judgement.md#5. Where it lands, and in what order", "The three coercion-chapter passages your sentence goes beside, and what batch N's rung T states instead of you."),
  ("doc:explorations/reviews/overload-static-params-ways.md#2.2 The probes", "The probe shapes GenPlainRTR, GenPlainSub and PermuteReturn that your three examples are written from."),
  ("doc:explorations/reviews/overload-static-params-ways.md#7. The history in the commits", "The sentence's date and authorship and the 1.0 section it displaced, for the decision record."),
  ("doc:explorations/compile-ladder/plan-7b/probes/P1.md#The answers", "What rung C's rules refuse on the library, and the domain condition Q4 asks about; state the positional rule as Q4's answer in your section says."),
  ("doc:explorations/compile-ladder/rung-generic-runtime/REPORT.md#9. The dispatch change's reach and its remainder", "Item 30's and row 499's evidence: which passages give which run-time answer; your list names them."),
  ("doc:explorations/compile-ladder/rung-spec-comprises/decision-record.md#4. Left, with the reason", "Row 491's passages as batch 7C's rung X left them, and the model for how you leave a passage you do not revise."),
  ("doc:explorations/reviews/comprises-type-level-judgement.md#4. The recommendation", "Item 26's option, which Pavol took on 2026-09-29: the four passages at the level of values and the Meet Rule's closed-trait case, with the reasons."),
  ("doc:explorations/reviews/comprises-type-level-judgement.md#5. The specification change, in the S1 form", "What the four passages, covering and fact 2 must state under item 26's decision; the proof appendix is revised as the addendum says, not only given a callout; the wording is yours."),
  ("doc:explorations/reviews/comprises-type-level-judgement.md#7. Where it lands, and what it costs", "Your grown file list, and the fallback that leaves P2 to batch 8, now taken only if rung C's half needs broader subtype or closure repairs; write P2's pieces apart."),
  (ADD + "Source and scope", "The proof's scope, ground declarations applicable without coercion; mark it in the appendix, and never present the revision as the proof of the whole generic system."),
  (ADD + "One replacement premise", "Cover-Meet, the coverage case of the Meet Rule the proof now assumes; state it in the appendix in plain words beside the exact-meet case."),
  (ADD + "Replacement lemmas and theorem", "The appendix's revision step by step: existence kept, static uniqueness replaced by run-time uniqueness, the refinement and result-type steps that give the call's type."),
  (ADD + "Application to the existing brief", "What the addendum asks of each rung; its S line is yours, and its C and W lines are what your text states they build."),
  (ADD + "What coverage checking assumes", "Why row 487 is the proof's open assumption, a closure the checker does not enforce across components; name it in the appendix, never as repaired."),
  ("doc:explorations/reviews/plain-beside-generic-judgement.md#4. The decision", "Item 30's option 1, which Pavol took on 2026-09-29: the generic declaration runs at the instance the value fixes."),
  ("doc:explorations/reviews/plain-beside-generic-judgement.md#5. The specification change, in the S1 form", "The dispatch sentence, its two cross-references and the example's second direction under item 30's decision; the wording is yours."),
  ("doc:explorations/reviews/batch-7C-review.md#Findings@Item 26 belongs before batch 7b", "Why item 26 bears on your chapter: the Meet Rule's example is in it."),
  ("doc:explorations/reviews/comprises-type-level-ways.md#For batch 7b's record", "The ways note's points for this batch: the coverage case beside answer 9's Meet Rule, stated as an addition to the paper's form."),
  ("doc:explorations/reviews/batch-5-conformance.md#Findings that need Pavol@One sentence of the revised specification is broader", "Item 14's sentence, which you leave as it stands until he answers."),
  ("doc:Specification/basic/overloading.tex#Overloading and Multiple Dispatch", "The basic chapter whole, which you revise; read every passage on static parameters and dispatch before you choose where the model goes."),
  ("doc:Specification/advanced/overloading.tex#Overloaded Functional Declarations", "The advanced chapter whole, which you revise: the sentence's echo, the naked-Any rule, the rules and the Meet Rule's example."),
  ("doc:Specification/appendices/overloading-function.tex#Proof of Overloading Resolution for Functions", "The proof appendix whole, which you revise under item 26's decision: its lemmas and theorems by label, the original you quote from the frozen copy."),
  ("doc:Specification/basic/conversions-coercions.tex#Coercion Resolution", "The coercion chapter's resolution, where your cross-reference sentence goes at its three passages and item 16's callout at its passage on static resolution."),
  ("doc:Specification/basic/trait-parameters.tex#Type Parameters", "The implicit bound, which you revise under Q1: batch N's rung T names Any in its chapter's callout and leaves the sentence to you."),
  ("doc:Specification/basic/inference.tex#Type Inference", "Batch N's inference chapter, whole: reword its first callout for the passages you revise, add walk's named supertype to its interpreter's callout, cite its instantiation step, and leave its rule as it is."),
  ("doc:Specification/appendices/changes.tex#The inference of a call's static arguments", "Its Appendix I entry: reword the rationale's claim that the chapter states the rule the checker builds and no more, and list rows 508, 515, 516 and 518 in its Effect as the checker's departures."),
  ("doc:explorations/reviews/batch-N-review.md#Findings@chapter says it states no more", "Why the inference chapter is yours: four gated rows contradict its claim, their tests named here, and batch 7C's rung X listed its checker's departures the same way."),
  ("doc:Specification/appendices/future.tex#Functions and Overloading", "The future-work entries on overloading: mark the relaxation done, and answer Jan's pair and the exclusion question."),
  ("doc:Specification/appendices/changes.tex#Initializing an array from a function", "An entry that does not follow from route A and says so; the model for your entries' first sentence, and under item 23's default you reword the introduction to say the entries follow the revival's decisions, each naming its own."),
  ("doc:Specification/appendices/changes.tex#Passages not yet revised", "The subsection your entries go before; add the passages you leave, each with its item."),
  ("doc:Documentation/Specification/Prose/Language/overloading.tick#Principles of Overloading", "The team's 2012 restart of the chapter, which dropped the sentence; cite it beside the passage."),
  ("doc:Papers/Types/rules.tick#Overloading Rules", "The paper's three rules as it states them; your text states them the same way."),
  ("doc:explorations/compile-ladder/rung-spec-route-a/decision-record.md#3.9 The form", "How batch 5's rung S applied the S1 form; your callouts and entries take it."),
  ("doc:explorations/compile-ladder/climb-batch-6/JUDGE-review.md#Finding 1", "The rule for test citations your edits move: re-anchor them by the map of unchanged lines, no assertion changed."),
  ("The compiled checker does not enforce the specification's sentence that overloads may not differ", "What each path does with the sentence today; the ground of your decision record."),
  ("Measured by the overloading judgement on private library copies", "The library's own overloads across different lists; the price of the way back, for the decision record."),
  ("The checker's return-type rule lets the more specific declaration choose its own instantiation", "Row 398's mechanism; why the positional rule is needed."),
  ("A generic arm of a template dispatcher is called at the dispatcher's own static parameters", "What batch 6.5's rung G landed at run time; the reading row 499 describes."),
  ("The specification reads a comprises clause as the later Types chapter does", "Batch 7C's text, whose reading your item 26 passages carry on; edit only the sentence of entry I.1.20 the default names."),
  ("The specification never wrote static-argument inference", "Why instantiation belongs to the inference chapter batch N writes, not to yours."),
  ("Specification-1.0-frozen/ is byte for byte", FROZEN),
  ("The team's latest word on types", "The later Types chapter's standing, cited beside the specification."),
  ("Citing Specification/library/apis/*.tex as an independent standard is circular", "The generated apis render the library; never cite them as the standard for a rule."),
  ("map:spec-to-implementation.md#Chapter 9, Functions; Chapter 15, Overloading", "The map's row for the overloading chapters and what implements each part."),
  ("map:spec-to-implementation.md#Chapter 17, Conversions and Coercions", "The map's row for the coercion chapter your sentence joins."),
  ("map:README.md#Touch this@Specification/ (the standard)", "What a specification edit moves, the PDF and the test citations, and what guards it."),
  ("index:overloading", "The notes on file on overloading; open those your passages touch."),
]
S_CHECKS = [
  ANSWER9, CONV, "positions:2026-09-26 S1", "positions:2026-09-26 first of the batch-5 answers", "positions:2026-09-26 lineage note",
  "positions:2026-09-28 comprises clause row 459", ITEM26, ITEM30, BOUND, COERC,
  "ledger:491", "ledger:496", "ledger:499", "ledger:487",
  "doc:explorations/reviews/overloading-judgement.md#3.4 What the revised specification says",
  "doc:explorations/reviews/overloading-judgement.md#3.5 What the checker enforces",
  "doc:explorations/reviews/conversion-overloading-judgement.md#1. The rule",
  "doc:explorations/compile-ladder/plan-7b/probes/P1.md#The answers",
  "doc:explorations/compile-ladder/rung-generic-runtime/REPORT.md#9. The dispatch change's reach and its remainder",
  "doc:explorations/compile-ladder/rung-spec-comprises/decision-record.md#4. Left, with the reason",
  "doc:Specification/basic/conversions-coercions.tex#Coercion Resolution",
  "doc:Specification/appendices/changes.tex#The inference of a call's static arguments",
  "doc:explorations/reviews/batch-N-review.md#Findings@chapter says it states no more",
  "doc:Papers/Types/rules.tick#Overloading Rules",
  "doc:explorations/compile-ladder/rung-spec-route-a/decision-record.md#3.9 The form",
  "doc:explorations/reviews/comprises-type-level-judgement.md#5. The specification change, in the S1 form",
  ADD + "Replacement lemmas and theorem", ADD + "Application to the existing brief",
  "doc:explorations/reviews/plain-beside-generic-judgement.md#5. The specification change, in the S1 form",
  "Specification-1.0-frozen/ is byte for byte",
]

C_BRIEFING = [
  (ANSWER9, "The two changes this rung builds, the return-type rule over every instance and the positional rule, and no third."),
  (CONV, "Batch N's rule for conversions, which your rules must not contradict, and your one item from it: defect 3's expected-failure test."),
  ("positions:2026-09-24 exclusion route P's fork", "Route A: the checker keeps instantiation exclusion; your rules read exclusion through it and change nothing of it."),
  ("positions:2026-09-26 second batch-5 answer", "Every static argument except an operator argument counts; your rules treat a size as they treat a type parameter."),
  ("positions:2026-09-26 answer 12", "Decision 3 in overload sets, a size the call cannot fix refused at the call; your rules keep that refusal."),
  ("positions:2026-09-28 comprises clause row 459", "Batch 7C's checker reading of a clause; row 492's coverage check sits beside it, local to overload checking."),
  (ITEM26, "Item 26 decided: option 1 with the proof addendum's three points; row 492's checker half, the typing of the call between and the acceptance pair rest on it."),
  (ITEM30, "Item 30 decided: option 1 of its judgement, the generic declaration at the instance the value fixes; row 496's expected-failure pairs rest on it."),
  ("positions:2026-09-21 library route", "No declaration goes into the compiler's prelude; a library declaration your rules refuse is repaired in the library, by rung L."),
  ("positions:2026-09-26 answer 11", "The count is reported and never red on its own; declare the total you measure."),
  ("positions:2026-09-27 stops a batch record reserves", STOPS),
  ("positions:2026-09-26 rung D's stop", RUN_TO_RUN),
  ("positions:2026-09-28 rungs re-running measurements", GATE_BEFORE),
  ("ledger:398", "The permuted override you refuse; closed by your test."),
  ("ledger:492", "Both paths refuse the Meet Rule's example; the checker's half, at validOverloading, is yours under item 26's decision, by a coverage check local to overload checking."),
  ("ledger:491", "The passages and programs of item 26; under its decision BetweenTwoClosed is typed by the intersection rule and SkBetweenAssign stays refused."),
  ("ledger:487", "The closure the coverage argument assumes, unenforced across components; not yours to repair: leave TypeHierarchyChecker.scala alone and claim no more than your tests show."),
  ("ledger:499", "Rung G's positional dispatch; under Q4 = (1), answer 9's rule, both pairs return String and stay accepted, so you write its two expected failures (box, fixed) and move the row to home 2."),
  ("ledger:495", "Generic dotted methods keep rung G's dispatch defects; legal programs your rules must keep accepting."),
  ("ledger:496", "A generic beside a plain declaration at run time; under item 30's decision you write its two expected-failure pairs, the repair staying in phase 5."),
  ("ledger:494", "The ZZ32 spelled two ways at run time, one of row 496's two crashes; the remainder your expected failure pins."),
  ("doc:explorations/reviews/overloading-judgement.md#3.5 What the checker enforces", "The recommendation's account of the two rules; one way to build the first, among the ways you list."),
  ("doc:explorations/reviews/overloading-judgement.md#3.7 The four defects", "Defects 2 and 3, their homes and tests; you open both rows."),
  ("doc:explorations/reviews/overloading-judgement.md#8. Where this differs from the workers and from the S2 judgement", "Why the paper accepts the permuted override and the positional rule refuses it."),
  ("doc:explorations/compile-ladder/plan-7b/probes/P1.md#The answers", "What your two rules refuse on the landed library, measured by shadow: the cond pairs, and nothing else under Q4 = (1)."),
  ("doc:explorations/compile-ladder/plan-7b/probes/P1.md#2. The shadow", "The shadow's three return-type verdicts and the positional check; evidence of one working way, not your design."),
  ("doc:explorations/compile-ladder/plan-7b/probes/P1.md#3. The probe shapes, on the compiled path", "Why the paper's theorem as the team coded it cannot be your rule: it refuses the prelude's own nest overloads."),
  ("doc:explorations/compile-ladder/plan-7b/probes/P1.md#4. The landed library", "The cond pairs, the positional rule's three refusals that today's rule already makes, and the domain condition's five factory pairs."),
  ("doc:explorations/reviews/overload-static-params-ways.md#2.2 The probes", "The probe shapes and captures your tests restate."),
  ("doc:explorations/reviews/overload-static-params-ways.md#2.3 Defects found (not the question, but on its path)", "Defects 1 to 4 as measured; 2 and 3 are yours to open."),
  ("doc:explorations/reviews/conversion-overloading-judgement.md#7. The findings that stand under every way", "Defect 3 stays on phase 5's list, and your test is its gated home."),
  ("doc:explorations/reviews/option-2-soundness.md#4. Answer 9's rules", "How the conversion rule reads answer 9's rules; your rules keep its measured shapes type-safe."),
  ("doc:explorations/compile-ladder/rung-generic-runtime/REPORT.md#9. The dispatch change's reach and its remainder", "What rung G's dispatcher reads by position; the programs row 499 names."),
  ("doc:explorations/reviews/batch-7C-review.md#Findings@Row 492's repair is in batch 7b's files", "Why row 492's checker half is yours and what its expected-failure test means."),
  ("doc:explorations/reviews/comprises-type-level-judgement.md#2. What was checked, and what was measured", "The measurement that the checker already finds a meet through a clause, and the call that sits between; the ground of your row 492 work."),
  ("doc:explorations/reviews/comprises-type-level-judgement.md#6. The two paths", "Row 492's repair and the in-between call's typing, as item 26's decision requires of you, read with the proof addendum; the device is yours."),
  (ADD + "Source and scope", "The proof's scope, ground declarations applicable without coercion; your typing is sound inside it, and coercion ties stay under batch N's rule."),
  (ADD + "One replacement premise", "Cover-Meet, what your coverage check establishes before it accepts an overlap: every incomparable overlapping pair covered by declarations strictly below both."),
  (ADD + "Replacement lemmas and theorem", "Why the call between is typed by the intersection of its candidates' return types, and why the Return Type Rule is its premise, not something it repairs."),
  (ADD + "Application to the existing brief", "What the addendum asks of C: Cover-Meet with applicability and strict refinement, coercion ties apart, the Return Type Rule a premise; your checks."),
  (ADD + "Review of the 7b briefing, at the same base", "The normalizer boundary, what the coverage search assumes, coercion and the fallback: keep the check local, bound it by cycle detection, refuse what it cannot settle."),
  (ADD + "Concrete acceptance pair for rung C", "Astra's two programs, your tests as written: the good one in both declaration orders, the bad one refused on the Return Type Rule."),
  ("doc:explorations/reviews/comprises-type-level-ways.md#For batch 7b's record", "OwnClauseBetween, the shape with two minimal candidates your repair meets."),
  ("doc:explorations/reviews/plain-beside-generic-judgement.md#6. Where it lands, and what it costs", "Row 496's two expected-failure pairs and the unread annotation, under item 30's decision."),
  ("doc:explorations/compile-ladder/rung-spec-comprises/probes/between/MeetExample.txt", "Both paths' refusal of the Meet Rule's example; the recorded failure of row 492's test."),
  ("doc:Specification/advanced/overloading.tex#Overloaded Functional Declarations", "The rules the checker enforces, in the specification's words; the Meet Rule's example is in it."),
  ("doc:Papers/Types/rules.tick#Overloading Rules", "The paper's three rules, the standard your return-type rule is checked against."),
  ("doc:Papers/Types/overloading-check.tick#Mechanically Checking the Rules", "The paper's special arrow and theorem for the return-type rule over every instance."),
  ("code:" + OVL + "#def satisfiesReturnTypeRule(f: Functional..def excludes(f: Functional", "Today's return-type rule, one solved instance, and the team's commented-out paper versions below it; where your first rule goes."),
  ("code:" + OVC + "#private def validOverloading(first..private def meetRule(first", "The pairwise check whose refusal row 492 meets, and the meet rule beside it."),
  ("code:ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala#protected def normConjunct", "The normalizer's one-clause case of your coverage expansion, team code shared by subtype, meet and equivalent: reuse its helpers, never widen it."),
  ("code:" + SRC + "/scala_src/typechecker/impls/Functionals.scala#val top = candidates.filter..private def signalAmbiguity(", "Rung I's ambiguity check, where you type the call between by the intersection; its numeral tie, same-types tie and coercion ambiguity keep their own rules."),
  ("The compiled checker does not enforce the specification's sentence that overloads may not differ", "What the checker does with differing static parameters today."),
  ("The checker's return-type rule lets the more specific declaration choose its own instantiation", "Row 398's mechanism, which your positional rule closes."),
  ("The return-type rule now reads a size as it reads a type parameter", "How rung N keeps a size quantified; the precedent your first rule generalises."),
  ("The compiled type checker checks nat and int static parameters", "Sizes in the checker; your rules must keep every sized test's verdict."),
  ("The compiled checker refuses a call whose most specific arm has a size the call cannot fix", "Batch 6's rung R's refusal; keep it."),
  ("The hidden layer, classified", "The classes of the api's overloading errors; name every row your rules move by class."),
  ("The compiled checker reads a comprises clause as the 2012 texts do", "Batch 7C's rule beside row 492's repair."),
  ("A generic arm of a template dispatcher is called at the dispatcher's own static parameters", "Rung G's run-time reading, which answers row 499's two programs against the text; the defect your expected failures pin for phase 5."),
  ("The XXX expected-failure mechanism in compiler_tests/ and library_tests/", "How your expected failures are written: a compile-stage failure alone, and a run-time defect in two test files."),
  ("A thrown CompilerError takes a third path through the test harness", "The check stream a checker crash takes, if one of your tests meets it."),
  ("An XXX compile test pinned by compile_err_contains whose program compiles is reported as a wrong failure", "What your two refusal tests report on the base; that capture is the recorded failure."),
  ("ant compileAll deletes a tracked file", "Restore default_repository/caches/global.map after every ant compileAll."),
  ("The true distance to the switch-over", "The distance stage your rules move; read it by class."),
  ("map:compile-path-walkthrough.md#How it differs from the interpreter's run-time dispatch", "Where the checker's choice and walk's dispatch part; your rules act on the checker's side."),
  ("map:modules-and-phases.md#B.7 Overloading", "The overloading phase and its files."),
  ("map:README.md#Touch this@scala_src/typechecker/", "What a checker edit moves and what guards it."),
  ("index:overloading", "The notes on file on overloading; open those your rules touch."),
]
C_CHECKS = [
  ANSWER9, CONV, "positions:2026-09-24 exclusion route P's fork", "positions:2026-09-28 comprises clause row 459", ITEM26, ITEM30,
  "positions:2026-09-28 rungs re-running measurements",
  "ledger:398", "ledger:492", "ledger:491", "ledger:487", "ledger:499",
  "doc:explorations/reviews/overloading-judgement.md#3.5 What the checker enforces",
  "doc:explorations/compile-ladder/plan-7b/probes/P1.md#The answers",
  "doc:explorations/compile-ladder/plan-7b/probes/P1.md#4. The landed library",
  "doc:Papers/Types/rules.tick#Overloading Rules",
  "doc:Papers/Types/overloading-check.tick#Mechanically Checking the Rules",
  "code:" + OVL + "#def satisfiesReturnTypeRule(f: Functional..def excludes(f: Functional",
  "doc:explorations/reviews/comprises-type-level-judgement.md#6. The two paths",
  ADD + "One replacement premise", ADD + "Application to the existing brief",
  ADD + "Review of the 7b briefing, at the same base", ADD + "Concrete acceptance pair for rung C",
  "doc:explorations/reviews/plain-beside-generic-judgement.md#6. Where it lands, and what it costs",
  "The XXX expected-failure mechanism in compiler_tests/ and library_tests/",
]

W_BRIEFING = [
  (ANSWER9, "Walk dispatches by declared domains, which ends its order dependence; the change this rung builds."),
  (CONV, "Your four items: compare on declared domains, hand the chosen generic to rung K's inference, dispatch the converted call again, and lift the load check for the sets the checker accepts."),
  ("positions:2026-09-27 numerics plans", "Walk does at dispatch what the checker does; batch N's rung K built the inference you hand the chosen declaration to."),
  ("positions:2026-09-28 comprises clause row 459", "Batch 7C's reading of a clause; row 492's walk half reads clauses the same way."),
  (ITEM26, "Item 26 decided: option 1 with the proof addendum's three points; row 492's walk half rests on it, your load check on rung C's coverage contract."),
  (ITEM30, "Item 30 decided: option 1 of its judgement, the generic declaration at the instance the value fixes; row 157's fix rests on it."),
  (COERC, "Item 16 decided and closed, not yours: walk's choice of a coercion on the value stays, recorded by rung S's callout; keep XXXCoercionStaticRungC's and XXXCoercionStaticNarrowRungC's verdicts."),
  ("positions:2026-09-27 stops a batch record reserves", STOPS),
  ("positions:2026-09-26 rung D's stop", RUN_TO_RUN),
  ("positions:2026-09-28 rungs re-running measurements", GATE_BEFORE),
  ("ledger:478", "Walk's shared symbolic instantiation, with its four probes; the cache key gains the bounds, and you close the row."),
  ("ledger:159", "Walk's refusal of generic pairs the specification allows; the renamed and swapped pairs, whose two expected-failure walk tests batch 6.5's judge wrote for you to promote."),
  ("ledger:157", "Walk dropping a generic declaration declared to return Any; under item 30's decision you close it with a forAnyType case."),
  ("ledger:492", "Walk's half of the Meet Rule example's refusal, at its load check; yours under item 26's decision."),
  ("ledger:491", "Item 26's programs: SkBetweenAssign keeps its walk verdict, BetweenTwoClosed runs once row 492's walk half lands; report both."),
  ("ledger:496", "Walk answers a generic beside a plain declaration both ways today, the plain one only through row 157; report its answers after your change."),
  ("ledger:499", "The compiled path's positional reading; report walk's answers to its two programs."),
  ("ledger:430", "The unstable ambiguity message; list XXXInheritedOverload as unstable in every comparison."),
  ("ledger:395", "Item 16's second point, the tuple bindings the judge chose to convert; keep its tests' verdicts and report."),
  ("ledger:390", "XXXCoercionAnyOverloadRungC stays this row's expected failure under the conversion rule; keep its verdict."),
  ("doc:explorations/compile-ladder/plan-7b/probes/P4.md#The answers", "Walk on declared domains measured by shadow: no corpus output changes, and two load verdicts move; your expectations and your stop."),
  ("doc:explorations/compile-ladder/plan-7b/probes/P4.md#1. The shadow", "The relation the shadow used, and why a generic trait's functional methods keep today's instance; evidence, not your design."),
  ("doc:explorations/reviews/overloading-judgement.md#3.7 The four defects", "Defect 1, walk's order dependence, which you open and close."),
  ("doc:explorations/reviews/conversion-overloading-judgement.md#3. Walk at run time", "How walk chooses, then re-instantiates by promotion from run-time types, and why re-dispatch of a converted call is yours."),
  ("doc:explorations/reviews/conversion-overloading-judgement.md#5. Where it lands, and in what order", "Your four items in the judgement's words, with the shapes O2Z64 and O2Meet."),
  ("doc:explorations/reviews/option-2-soundness.md#3. A plain arm more specific in one position", "O2Meet's shape and the meet it needs; walk must load it and print the meet."),
  ("doc:explorations/reviews/option-2-soundness.md#4. Answer 9's rules", "O2Z64's shape: the converted call dispatches again to the plain declaration."),
  ("doc:explorations/compile-ladder/plan-n/probe-k/PROBE-K.md#The answers", "Walk's inference rule as batch N built it; your comparison hands it the chosen declaration."),
  ("doc:explorations/reviews/batch-7R-conformance.md#Findings@Row 478 belongs", "Why row 478 is yours and where the Range clause goes (rung L)."),
  ("doc:explorations/reviews/batch-3.5-4-conformance.md#Findings that need Pavol@Two of rung C's points", "Item 16's two points as they reached Pavol: the first decided on 2026-09-29, the second row 395, whose tests you keep and report if your change moves them."),
  ("doc:explorations/reviews/batch-7C-review.md#Findings@Row 492's repair is in batch 7b's files", "Why row 492's walk half is yours and what its expected-failure test means."),
  ("doc:explorations/reviews/comprises-type-level-judgement.md#6. The two paths", "Row 492's walk half as item 26's decision requires: the load check consults a clause-reading meet; the device is yours."),
  (ADD + "One replacement premise", "Cover-Meet, the coverage contract your load check shares with rung C: a covering family strictly below both domains, for every overlapping pair."),
  (ADD + "Application to the existing brief", "What the addendum asks of W: runtime selection that implements the ordered candidate family the proof applies to."),
  (ADD + "What coverage checking assumes", "Why dispatch neither repairs broken closure (row 487) nor proves coverage; a case the clauses do not settle stays refused at load."),
  (ADD + "Rung size and the existing fallback", "Your load check considers a covering family, not one arm that handles part of the overlap; and when the fallback reaches your half."),
  ("doc:explorations/reviews/plain-beside-generic-judgement.md#2. The list's deciding claims, checked", "Claim 3: walk's plain answer is row 157, a missing AnyType case, not a rule; the cause your fix removes."),
  ("doc:explorations/reviews/plain-beside-generic-judgement.md#6. Where it lands, and what it costs", "Your row 157 fix, its test, and the catch in bestMatchInternal you leave alone."),
  ("doc:explorations/reviews/plain-beside-generic-ways/captures/both-paths.txt", "The probes on both paths: PbgLone dying on the AnyType visitor under walk; your failing capture."),
  ("doc:explorations/reviews/plain-beside-generic-ways/captures/ret-object.txt", "The same pair returning Object, running the generic declaration on both paths; the answer your test asserts."),
  ("doc:explorations/compile-ladder/rung-generic-runtime/REPORT.md#10. Every measured defect and its home", "Rung G's defects and homes; row 159's walk half, whose two expected-failure tests batch 6.5's judge wrote and you promote."),
  ("doc:Specification/basic/overloading.tex#Overloading Resolution", "Dispatch as the specification states it: the most specific declaration applicable to the values."),
  ("doc:Specification/advanced/overloading.tex#Meet Rule", "The Meet Rule and its example, which walk's load check must accept."),
  ("code:" + OF + "#private SingleFcn bestMatchInternal", "The subtyping pass that instantiates each generic at the arguments; where your comparison changes."),
  ("code:" + OF + "#private SingleFcn bestMatchWithCoercion", "The coercion pass rung K edited; read it, change it only as your items need, and report."),
  ("code:" + OF + "#public synchronized boolean finishInitializingSecondPart", "The load-time check: its excluding-pair rule, the unrelated-parameter refusal of row 492, and the check you lift for O2Z64 and O2Meet."),
  ("code:" + OF + "#static private boolean meetExistsIn", "How the load check looks for a meet today."),
  ("code:" + VALS + "/FGenericFunction.java#protected Simple_fcn getSymbolic()", "The symbolic instantiation row 478 names, and the team's TODO beside it."),
  ("code:" + "ProjectFortress/src/com/sun/fortress/interpreter/evaluator/MakeInferenceSpecific.java" + "#public class MakeInferenceSpecific", "The visitor with no AnyType case; under item 30's decision you add one, a no-op like forTraitType."),
  ("code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java#public Set<FType> meet(FType t2)", "Walk's meet, equality and subtyping only; where the clause-reading meet for row 492 goes."),
  ("code:" + VALS + "/GenericFunctionOrMethod.java#static class GenericComparer", "The cache key that compares static parameters by name alone; where the bounds go."),
  ("code:" + SRC + "/interpreter/evaluator/EvaluatorBase.java#public static Simple_fcn inferAndInstantiateGenericFunction", "Walk's inference of a generic's static arguments, rung K's; the instance your chosen declaration gets."),
  ("Walk's overload check reads one bound for two generic overloads", "Row 478's fact with its probes."),
  ("Under walk, the interpreter converts by coercion at its three kinds of type check", "Walk's coercion, which the converted call's re-dispatch follows."),
  ("Every functional-method name of the library is reserved", "Why a library name in a test can collide; name your test's functions apart."),
  ("The interpreter's overload-ambiguity message names its two declarations", "The ambiguity message's order is not the program's; do not compare it verbatim."),
  ("An XXX*.fss in the interpreter corpus IS a gated expected-failure test", "How your expected failures in ProjectFortress/tests/ gate, and why a renamed one must pass."),
  ("testSystem's four shards are one suite split by sorted index", "A file you add moves the shards; the gate compares their sum."),
  ("Three heaps run the interpreter", "A test can pass at two heaps and die at the third; run yours as the gate runs it."),
  ("ant compileAll deletes a tracked file", "Restore default_repository/caches/global.map after every ant compileAll."),
  ("map:modules-and-phases.md#A.2.2 Subpackages of", "The interpreter's packages and where dispatch lives."),
  ("map:compile-path-walkthrough.md#How it differs from the interpreter's run-time dispatch", "Where walk's dispatch and the checker's choice part."),
  ("map:test-coverage.md#B. Interpreter versus compiler", "What the two corpora cover of dispatch."),
  ("index:overloading", "The notes on file on overloading; open those your change touches."),
]
W_CHECKS = [
  ANSWER9, CONV, "positions:2026-09-28 comprises clause row 459", ITEM26, ITEM30, "positions:2026-09-26 rung D's stop",
  "ledger:478", "ledger:159", "ledger:492", "ledger:491", "ledger:496",
  "doc:explorations/compile-ladder/plan-7b/probes/P4.md#The answers",
  "doc:explorations/reviews/conversion-overloading-judgement.md#3. Walk at run time",
  "doc:explorations/reviews/conversion-overloading-judgement.md#5. Where it lands, and in what order",
  "doc:Specification/basic/overloading.tex#Overloading Resolution",
  "doc:Specification/advanced/overloading.tex#Meet Rule",
  "code:" + OF + "#public synchronized boolean finishInitializingSecondPart",
  "ledger:157",
  "doc:explorations/reviews/comprises-type-level-judgement.md#6. The two paths",
  ADD + "Application to the existing brief", ADD + "Rung size and the existing fallback",
  "doc:explorations/reviews/plain-beside-generic-judgement.md#6. Where it lands, and what it costs",
  "An XXX*.fss in the interpreter corpus IS a gated expected-failure test",
]

L_BRIEFING = [
  (ANSWER9, "The library's refused families repaired by its own devices, with no checker change; the decision this rung builds."),
  ("positions:2026-09-19 answering the open question", LIB_PRACTICE),
  ("positions:2026-09-24 override shape diagonal", "A fork put to Pavol names the library's own way first; list the library's device before any other for each family."),
  ("positions:2026-09-25 preventing failure mode", "List every way the language and the library offer before you choose a device, the library's first."),
  ("positions:2026-09-27 launch of phase 3's batches", "Q2 taken at its default: you choose the seq device per pair and report each choice with the other way."),
  (CONV, "Decision 2 gave each integer type its own MIN, MAX and MINMAX in batch N; read them on your base beside the array MIN and MAX."),
  ("positions:2026-09-24 exclusion route P's fork", "Route A, the rule the library conforms to; every device you add states an exclusion or a meet the rule reads."),
  ("positions:2026-09-19 FlatArrays review's repair", "A line of the model is never changed to suit the checker; no model or vocabulary line is yours."),
  ("positions:2026-09-27 stops a batch record reserves", STOPS),
  ("positions:2026-09-26 rung D's stop", RUN_TO_RUN),
  ("positions:2026-09-28 rungs re-running measurements", GATE_BEFORE),
  ("ledger:461", "BIG MIN and BIG MAX over total comparisons, item 22; under its default (b), in your answers line, you give TotalComparison the StandardMinMax parent, assert both in your test and close the row."),
  ("ledger:478", "Its note: the api's Range lacks the component's excludes clause, which you move into the api."),
  ("ledger:421", "StandardMinMax's MIN and MAX, fixed in batch 7; the neighbour of your markers."),
  ("doc:explorations/reviews/overloading-judgement.md#3.6 The library's refused set, repaired", "Each family's library device as the judgement measured it; the ways you list start here."),
  ("doc:explorations/compile-ladder/plan-7b/probes/P1.md#4. The landed library", "The cond pair rung C's rule refuses, and the one api line that clears it; yours."),
  ("doc:explorations/compile-ladder/plan-7b/probes/P1.md#5. L's devices, measured", "The devices measured in the apis, and why the components need the same markers."),
  ("doc:explorations/compile-ladder/plan-7b/probes/P2.md#The answers", "What the Meet Rule class leaves to batch 8, String's own juxtaposition pair among it; not yours."),
  ("doc:explorations/compile-ladder/rung-exclusion-remainder/REPORT.md#16. Decisions@TotalComparison drops its order", "TotalComparison's shape as landed and the library's device beside it, item 22's two ways."),
  ("doc:explorations/compile-ladder/rung-exclusion-remainder/SKEPTIC.md#5. The precedent search, and a device the rung did not list", "The measured device for item 22's default, with its numbers on a copy before batches 7R, 7C and N; measure it again on your base."),
  ("doc:explorations/reviews/batch-7R-conformance.md#Findings@Row 478 belongs", "Why the Range clause goes into the api, and that rung L may take it."),
  ("doc:Specification/advanced/overloading.tex#Meet Rule", "The rule your devices satisfy: an exclusion, or a declaration on the meet."),
  ("code:Library/FortressLibrary.fsi#(** Potemkin exclusion traits..trait Rank3", "The library's plain exclusion traits where a generic excludes cannot be written; the device for a family told apart by a plain parent."),
  ("code:Library/FortressLibrary.fsi#trait StandardMin[", "StandardMin's header, which your marker for the array MIN sits over."),
  ("code:Library/FortressLibrary.fsi#trait StandardMax[", "StandardMax's header, the same for the array MAX."),
  ("code:Library/FortressLibrary.fsi#trait StandardMinMax[", "StandardMinMax, the library's device for a partial order that also has MIN and MAX; item 22's second way uses it."),
  ("code:Library/FortressLibrary.fsi#trait TotalComparison", "TotalComparison as batch 7's rung H left it; yours under item 22's default: one header line in the api and the component, the five restated members kept."),
  ("code:Library/FortressLibrary.fsi#trait ReadableArray[", "ReadableArray's header and its seq; the header takes the exclusion of the markers."),
  ("code:Library/FortressLibrary.fsi#trait SequentialGenerator[", "SequentialGenerator's seq, one of the seq pairs."),
  ("code:Library/FortressLibrary.fsi#trait FilterGenerator[", "FilterGenerator's seq, one of the seq pairs."),
  ("code:Library/FortressLibrary.fss#object SimpleSeqFilterGenerator[", "A type below FilterGenerator and SequentialGenerator that declares its own seq: the meet, for that pair."),
  ("code:Library/FortressLibrary.fsi#trait PossibleReductionPair", "The api's parent, which disagrees with the component's; you make it say what the component says."),
  ("code:Library/FortressLibrary.fss#trait PossibleReductionPair", "The component's parent, which runs under walk and which P1's repair copies."),
  ("code:Library/FortressLibrary.fss#trait Range[", "The component's Range with its excludes clause and the team's comment on why it matters."),
  ("code:Library/FortressLibrary.fsi#trait Range[", "The api's Range without it; you add the clause."),
  ("code:Library/RangeInternals.fsi#open1Range(x: ZZ32)..open3Range(x: ZZ32", "The numbered names beside openRangeHelper, the library's device where arrows meet."),
  ("code:Library/RangeInternals.fsi#openRangeHelper(_: ()->ZZ32)..openRangeHelper(_: ()->(ZZ32, ZZ32, ZZ32))", "The three declarations told apart only by a thunk's arrow type; you reshape them."),
  ("Measured by the overloading judgement on private library copies", "The families' counts on the nested tower and the devices measured then."),
  ("The hidden layer, classified", "The classes of the api's overloading errors; name every row your devices move by class."),
  ("The compiled checker's exclusion rule is the designers'", "Why the rule stays and the library conforms."),
  ("The one library's number tower is flat", "The number types your markers must not catch."),
  ("The one library's scalar ranges are over ZZ32 alone", "Batch 7R's ranges, which removed CAP's refusals; the ranges your openRangeHelper repair builds."),
  ("Every functional-method name of the library is reserved", "Why a new marker or name can collide with a program's own; choose names the library does not already reserve."),
  ("testSystem's four shards are one suite split by sorted index", "Your new test moves the shards; the gate compares their sum."),
  ("The interpreter's overload-ambiguity message names its two declarations", "The ambiguity message's order is not the program's; do not compare it verbatim."),
  ("The compiled checker reads a comprises clause as the 2012 texts do", "Batch 7C's rule; your markers extend no closed trait unlisted."),
  ("The true distance to the switch-over", "The distance stage your devices move; read it by family."),
  ("map:spec-to-implementation.md#4.2 The tower in", "The library's tower and traits, where your markers sit."),
  ("map:dormant-code.md#1.1 Commented-out declarations in", "The library's commented-out declarations and not-yet notes; a device the team began may be there."),
  ("map:README.md#Touch this@Library/FortressLibrary.fss", "What a library edit moves: walk, the count stage, and the gather's PDF."),
  ("index:overloading", "The notes on file on overloading; open those your families touch."),
]
L_CHECKS = [
  ANSWER9, "positions:2026-09-19 answering the open question", "positions:2026-09-24 override shape diagonal",
  "positions:2026-09-27 launch of phase 3's batches", "positions:2026-09-28 rungs re-running measurements",
  "ledger:461", "ledger:478",
  "doc:explorations/reviews/overloading-judgement.md#3.6 The library's refused set, repaired",
  "doc:explorations/compile-ladder/plan-7b/probes/P1.md#4. The landed library",
  "doc:explorations/compile-ladder/plan-7b/probes/P1.md#5. L's devices, measured",
  "doc:Specification/advanced/overloading.tex#Meet Rule",
  "code:Library/FortressLibrary.fsi#(** Potemkin exclusion traits..trait Rank3",
  "code:Library/FortressLibrary.fss#object SimpleSeqFilterGenerator[",
  "code:Library/FortressLibrary.fss#trait PossibleReductionPair",
  "code:Library/FortressLibrary.fss#trait Range[",
]

BRIEFINGS = {'S': S_BRIEFING, 'C': C_BRIEFING, 'W': W_BRIEFING, 'L': L_BRIEFING}
CHECKS = {'S': S_CHECKS, 'C': C_CHECKS, 'W': W_CHECKS, 'L': L_CHECKS}
LISTS = {rid: ([k for k, _ in BRIEFINGS[rid]], CHECKS[rid]) for rid in 'SCWL'}
REASONS = {rid: [(k, r) for k, r in BRIEFINGS[rid]] for rid in 'SCWL'}

def reason_problems(rid):
    out = []
    for k, r in REASONS[rid]:
        if not r or not r.strip():
            out.append((k, 'no reason'))
        elif '\n' in r or '`' in r or any(ord(c) > 127 for c in r):
            out.append((k, 'a reason is one ASCII line with no backtick'))
        elif not r.endswith('.') or len(r) > 240:
            out.append((k, 'a reason ends with a full stop and is at most 240 characters'))
    return out

if __name__ == '__main__':
    import subprocess, re, sys, os
    root = os.environ.get('FORTRESS_HOME', '/home/user/fortress')
    bad = 0
    for rid, (b, c) in LISTS.items():
        rp = reason_problems(rid)
        print(rid, 'reasons', len(REASONS[rid]), 'for', len(b), 'briefing keys |', 'problems', len(rp))
        for k, why in rp: print('   PROBLEM', why, ':', k[:200])
        if rp: bad += 1
        for name, keys in (('briefing', b), ('checks', c)):
            assert len(set(keys)) == len(keys), (rid, name, 'duplicate')
            badk = [k for k in keys if not k.strip() or k.startswith('-') or re.search(r'["`$\\\n]', k)]
            assert not badk, (rid, name, badk)
            if name == 'checks':
                stray = [k for k in keys if k not in b]
                assert not stray, (rid, 'stray', stray)
            r = subprocess.run(['bash', 'explorations/coordinator/tools/facts-extract.sh', '--check'] + keys, capture_output=True, text=True, cwd=root)
            lines = r.stdout.strip().splitlines()
            probs = [l for l in lines if 'not one' in l or 'not found' in l.lower() or 'no match' in l.lower() or 'nothing' in l.lower()]
            total = [l for l in lines if l.startswith('Total')]
            print(rid, name, 'keys', len(keys), 'exit', r.returncode, '|', total[0] if total else r.stderr.strip()[:200])
            for l in probs: print('   PROBLEM', l[:300])
            if r.returncode or probs:
                bad += 1
                if os.environ.get('VERBOSE'): print(r.stdout)
    print('bad lists', bad)
    sys.exit(1 if bad else 0)
