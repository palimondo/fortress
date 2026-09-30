// Workflow script: one batch of the compile-path ladder climb.
//
// Generalised 2026-09-19 from the script that ran climb batch 1, so that the
// next batch is a MANIFEST CHANGE AND NOTHING ELSE: the coordinator replaces the
// block marked "MANIFEST" below and launches. Batch 1's manifest is kept below
// the "END MANIFEST" line as BATCH_1_EXAMPLE, the worked example, which the
// script does not use.
//
// The changes this revision carries are the six process decisions Pavol took on
// 2026-09-19 (POSITIONS.md, "after climb batch 1 landed"), as
// explorations/coordinator/process-decisions-review-1.md amended them, plus the
// eight free changes of repair-batch-review.md section 10. What each stage does
// now and which review item each change answers is written up in
// explorations/coordinator/climb-batch-workflow.md.
//
// Launch, after the worktrees exist (remote-container.md, "Setting up a batch's
// worktrees"):
//   Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js',
//             args: {base: '<the commit main is at>'}})
//
// Every worker, skeptic, gather, review and gate agent is pinned to Opus, and so
// is a judge's first ruling on a rung or on the merged tree; a second ruling on
// the same rung or tree runs on Fable (Pavol, 2026-09-24, on option (c) of
// climb-batch-3-redesign.md, the escalation; 2026-09-26, Fable named, since the
// session may run on Opus). No backticks anywhere in this file.
//
// Every agent() call goes through callAgent (above "The run."), which runs the
// role again, up to two more times, when its agent comes back with nothing
// (2026-09-27; climb-batch-workflow.md, "An agent that comes back with nothing").
// A usage or rate limit, or a skeptic or judge that comes back with nothing after
// its attempts, stops the run there and decides nothing; resumeFromRunId with the
// same script and args then runs that role again (climb batch 7b's review, finding 1).

export const meta = {
  name: 'fortress-climb-batch',
  description: 'One batch of Fortress compile-ladder rungs in isolated worktrees, each judged by its own skeptic, gathered, reviewed and gated once (suite counts, four-thread atomic runs, ladder regression, the checker count over the interpreter library, and the distance to the switch-over reported beside them) before it lands',
  phases: [
    { title: 'Rung', detail: 'test-first repair in an isolated worktree, committed and pushed to wip/ as it goes; never runs the full gate' },
    { title: 'Skeptic', detail: 'independent judgement with its own walk-vs-compiled differential; one repair round allowed' },
    { title: 'Judge', detail: 'Opus for the first ruling on a rung or on the merged tree, Fable for a second ruling on the same one; only on a stop, a refusal, a blocking review or a red gate: reads the reports and the diff, decides, writes the decision' },
    { title: 'Gather', detail: 'net change of each approved branch applied to main, record folded, one local commit per rung' },
    { title: 'Review', detail: 'the merged diff against the batch rules and the folded record as a whole, once, beside the gate; a finding that touches code goes to the judge and a repair, one settled by tests and records goes to the next batch' },
    { title: 'Gate', detail: 'compileAll, library rebuild, testFast, testSystem, the summary diff, the four-thread atomic runs, the ladder regression, the checker count over the interpreter library, and the distance stage in the background beside them, reported and never red' },
    { title: 'Commit', detail: 'hashes into the ledger notes, the gate tables and the per-site list, push main, fast-forward the container branch, start the microGPT programs under walk in the background, remove the worktrees; no push while a landed rung carries a stop that was met and not lifted' },
  ],
}

const OPUS = 'opus'   // every worker, skeptic, gather, review and gate agent, and a judge's first ruling
const FABLE = 'fable' // a judge's second ruling on the same rung or tree
// A judge's tier: Opus for the first ruling on a rung or on the merged tree,
// Fable for a second ruling on the same one: a refusal ruled after a stop on one
// rung, a red gate ruled after a blocking review on the merged tree. Pavol's
// decisions of 2026-09-24 (the escalation) and 2026-09-26 (Fable named rather
// than the session's model, which may be Opus).
const judgeTier = (priorRuling) => priorRuling ? { model: FABLE } : { model: OPUS }
const BASE = args && args.base
if (!BASE) throw new Error('args.base is required: the commit every wip/ branch was cut from')
const CONTAINER_BRANCH = 'claude/worker-brief-fable-vnnuv8'   // this container's infrastructure branch; kept at main
const MAIN = '/home/user/fortress'

// ===========================================================================
// MANIFEST - the coordinator replaces everything between this line and the
// "END MANIFEST" line, and changes nothing else in this file.
//
// Concurrency, which the manifest does NOT set: at most two agents at once here
// (FACTS.md, "The Workflow harness runs two agents at once on this box"), a
// freed slot going to the next queued agent, FIFO. k is 4: the queue sets the
// wall. Per rung: id, slug, path, branch, expectedMinutes (the scatter's start
// order only), tail (the brief), blurb (one line for the shared prefix's table),
// writesState, expectedMoves, and the checker-count fields testIsStage,
// expectedCheckerCount (a printed prediction, never red) and
// expectedCheckerCrash (compared exactly with the table's #crash field; no
// rung of this batch declares one, so any change of the crash row is red).
// Optional: landsOnlyWith, the ids of the rungs a rung lands only with; the
// script applies it after the scatter, so S, which names C, reaches the gather
// only when C is approved. briefing, the rung's briefing, which the planner
// writes from the record so that the agents learn in context what they were
// never trained on: the keys of explorations/coordinator/tools/facts-extract.sh
// for the POSITIONS.md entries (positions:DATE WORDS), gap-ledger rows
// (ledger:ROW) and earlier judges' rulings and notes (doc:PATH#HEADING) the
// rung rests on; the specification's sections its subject touches (doc: on a
// .tex heading); the library and source code that is the precedent or the site
// (code:PATH#FROM..TO); and the FACTS.md entries, map sections and INDEX lines
// of its area; in reading order, decisions first. Relevance, not size, decides
// what goes in. The rung worker reads it whole as its step 1. And checks, the
// sub-list of briefing that the skeptic, the repair round and the judges read
// as their step 1. No key holds a double quote, backtick, dollar sign or
// backslash, since each is rendered in double quotes. Each list is checked with
// the tool's --check to match exactly one place per key (re-checked on the
// tree the run is cut from). Each briefing key has a one-line reason, why it is
// there and what the rung does with it, rendered at the end of the rung's tail
// (explorations/compile-ladder/plan-7b/manifest/lists7b.py; Pavol,
// 2026-09-28, the process review's measure 5).
//
// Batch 7b's values are CLIMB-BATCH-7.md, sections 3 and 6: the record's
// second run. Each tail is that rung's section of section 3 word for word, with
// the record's code-span backticks dropped (this file carries none), then its
// briefing's reasons; ASCII only. Each section opens with its answers line,
// which the coordinator writes in before the launch. Three values are set at
// launch and nowhere else: LEDGER_FROM (the first free ledger row at the
// launch) and CHECKER_BASE (the #total of the last landed checker-count.txt,
// the one the gate compares against), which the block refuses to load while
// unset, and Q4 (1 for answer 9's rule, as the record settles its Q4; 2 only if
// Pavol adds the domain condition before the launch), which sets rung C's
// predicted count. Manifest order is the ledger numbering
// order: S, C, W, L. The scatter starts the longest expected first: W, C, L, S.
// S and W predict the checker total unchanged, C the base plus the cond pair
// (and the factories under Q4 = 2), L declares no prediction. No rung declares a
// ladder move. The base is <base>, passed at launch as args.base, not written
// here. The first run of the record (H, A and B) was spliced at ff1649cea and
// landed as batch 7; its block is in git.
// ===========================================================================

const LEDGER_FROM = 534   // SET AT LAUNCH: one above the highest row of explorations/fortress-gap-ledger.md at this run's launch
if (!Number.isInteger(LEDGER_FROM)) throw new Error('LEDGER_FROM is not set: the first free ledger row at this run\'s launch')
const CHECKER_BASE = 75   // SET AT LAUNCH: the #total of the last landed checker-count.txt, under explorations/compile-ladder/climb-batch-*/gate/
if (!Number.isInteger(CHECKER_BASE)) throw new Error('CHECKER_BASE is not set: the #total of the last landed checker-count.txt')
const Q4 = 1   // SET AT LAUNCH: 1, answer 9's rule (the record's Q4, settled); 2 only if Pavol adds the positional rule's domain condition before the launch
if (Q4 !== 1 && Q4 !== 2) throw new Error('Q4 is not 1 or 2')

const BATCH = '7b'
const BATCH_RECORD = 'explorations/coordinator/CLIMB-BATCH-7.md'

const S_TAIL = [
"",
"## Your rung: S - the overloading chapters",
"",
"SLUG is rung-spec-overloading. WORKTREE is /home/user/fortress-ovspec, branch wip/rung-spec-overloading.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-7.md, section 3, under \"S. The overloading chapters\"), carried below word for word, and after it your briefing entry by entry, each with why it is there; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record, and the questions its answers line names are in section 1; read them there.",
"",
"**The answers this rung follows.** Q1 = (a), decided by Pavol in his own words on 2026-09-29 (POSITIONS 2026-09-29, the implicit bound); Q3 = (a); Q4 = (1), answer 9's rule; item 14: its default, the sentence left; item 16: decided by Pavol on 2026-09-29, walk's run-time choice of coercions accepted as the interpreter's limit, with one callout written by this rung (POSITIONS 2026-09-29, walk's run-time choice of coercions); item 23 = (a), decided by Pavol on 2026-09-29 (POSITIONS 2026-09-29, batch 7b's items 22 and 23); item 26 = (1), decided by Pavol on 2026-09-29 with the three points of Astra's proof addendum built into this batch's briefs (POSITIONS 2026-09-29, PLAN item 26); item 30 = (1), decided by Pavol on 2026-09-29, its judgement's option 1 (POSITIONS 2026-09-29, PLAN item 30), at the instance the paper's rule gives; the paper's instance rule, decided by Pavol on 2026-09-29 (POSITIONS 2026-09-29, a type parameter that a call's arguments do not fix); the POPL recheck's items 1.1, 1.3, 1.4, 1.5 and 1.7, the recommended defaults while Pavol has not answered (section 1, \"Taken as defaults from the same recheck\"). (Section 1 of the record gives each question and its options. Text marked \"under Q4 = (2)\", \"under item 23 = (a)\" or \"under item 26 = (1)\" applies only while the coordinator has written that answer here; text marked \"until item 23 is answered\" applies only while this line says \"not answered\" for item 23.)",
"",
"**The problem.** The specification says that declarations of one name may not differ in their static parameters: \"it is an error for their static parameters to differ (up to alpha-equivalence), or for one declaration to have static parameters and another to not have them\" (Specification/basic/overloading.tex:100-107), and again \"Overloaded declarations must have static parameters that are identical (up to alpha-equivalence) ... static parameters ... are ignored in the remainder of this chapter\" (Specification/advanced/overloading.tex:95-102). It says static parameters are inferred before a declaration's applicability is checked and before two declarations are compared (basic/overloading.tex:173-176, :292-295). Neither path has enforced the sentence: walk has accepted different lists since May 2007, and the compiled checker applies the 2011 paper's three rules, No Duplicates, Meet and Return Type, to domains read as existentially quantified over their static parameters (Papers/Types/rules.tick:158-180; ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala, lteq and satisfiesReturnTypeRule); the library overloads across different lists throughout (FACTS.md, \"Measured by the overloading judgement on private library copies\", and \"The compiled checker does not enforce the specification's sentence that overloads may not differ in static parameters\"). The sentence is 2009 text that displaced the 1.0 release's section 15.6.1, which itself expected to be replaced once the checker existed; the team's 2012 restart of the specification dropped it (Documentation/Specification/Prose/Language/overloading.tick:100-114). The team's list of future work still carries the question (Specification/appendices/future.tex:236-266). Five passages beside it:",
"- The coercion chapter's resolution says how a call is resolved without saying when a declaration with static parameters applies (Specification/basic/conversions-coercions.tex:472-476, :539-541, and :598-605, as batch 6.5's rung P left them). Pavol's decision on conversions and overloading of 2026-09-28 reads it on declared, quantified domains, the chosen declaration then instantiated as the inference chapter states (batch N's rung T).",
"- Under Q1 = (a): the specification gives an unbounded type parameter the implicit bound Object (Specification/basic/trait-parameters.tex:49-50), while the library is written, and walk and the gate's count read it, under Any; and the rule that a function whose single parameter is a naked type parameter bounded by Any cannot be overloaded (advanced/overloading.tex:114-127) is checked only against a written Any (explorations/reviews/overloading-judgement.md section 10, item 4). Batch N's rung T names Any as the bound its chapter assumes, in its callout, and leaves the sentence to this rung (explorations/coordinator/CLIMB-BATCH-N.md, section 1, \"The specification's implicit bound\"; rung T's section, the callout line): this rung revises it, and the callout's pointer to this rung then holds; read the callout on the base.",
"- What a generic declaration answers when a program runs. The chapter gives two answers for two generic declarations, one instantiation fixed at the call (basic/overloading.tex:100-107 with :136-138) and each declaration's static parameters inferred before applicability and specificity (:173-175, :292-295), and the second pair is what this rung rewrites (row 499). No passage says at which instance a declaration runs when dispatch reaches it and the call's static types chose another, a plain declaration beside a generic one among them (row 496; item 30). Which declaration runs is settled by Pavol's decision 1 of 2026-09-28: the most specific declaration applicable to the values, a generic one applicable when some instance within its bounds fits. At which instance is settled by his decision on the paper's instance rule (POSITIONS 2026-09-29, a type parameter that a call's arguments do not fix).",
"- Under the same decision: the inference chapter batch N's rung T wrote gives a lone type parameter with no narrowest candidate \"the union of the types of those arguments\" (Specification/basic/inference.tex:95-98), which the decision replaces by the bound (row 516).",
"- Under item 16's decision: the coercion chapter's passage \"Notice that coercion is resolved statically\" and its example (Specification/basic/conversions-coercions.tex:598-635). The compiled path follows it. Walk, which has no static types, chooses a coercion on the value, so for the example's f(c), c: C = D, it runs f(B) and answers 4 where the text gives 3 (ProjectFortress/tests/XXXCoercionStaticRungC.fss), and batch 4's rung C's narrow case differs the same way (XXXCoercionStaticNarrowRungC.fss); both are gated expected failures (ledger row 19). The passage carries no callout, where the inference chapter's interpreter callout records the generic half (explorations/reviews/decisions-review/judgement.md section 6, item 7).",
"",
"**The decisions.** Answer 9 (explorations/coordinator/POSITIONS.md, 2026-09-26, answer 9): the sentence goes; the specification is revised to the type group's 2011 model the checker runs, the original kept as superseded text in the S1 form. The checker keeps the paper's three rules with two changes: the return-type rule is checked over every instance, and two generic declarations in the more-specific relation agree on their static parameters position by position (Java's overriding rule; row 398). What the recommendation says the revised text states is explorations/reviews/overloading-judgement.md section 3.4 (the rules, the reduction of exclusion between two quantified domains through instantiation exclusion and the bounds, the positional rule, the three examples, the future-work entry and the decision record's contents); the wording is this rung's. The positional rule is stated as Q4's answer has it: under Q4 = (1), the two declare the same number and kinds of their own static parameters, position by position, and the more specific declaration's return type is a subtype of the other's under that correspondence (the judgement's words); under Q4 = (2), its parameter types are also subtypes of the other's under the correspondence (Java's condition for overriding). Under the POPL recheck's item 1.3, a default listed for Pavol's review: the rule is stated in a callout as a restriction of the compiled implementation, whose code generator hands a call's written static arguments to a dispatched declaration by position (row 398), and not as a rule of the language, since the POPL 2019 paper instantiates a dispatched declaration by substitution from the values and the static return type and renames type parameters freely ([Dispatch], p. 11:17; p. 11:13), so that an override reordering its type parameters is valid there (explorations/reviews/decisions-review/popl-recheck.md section 1.3); the callout says that phase 5 lifts it when the compiled dispatcher instantiates by substitution, and its example, the reordering override, sits in the callout. The decision on conversions and overloading (POSITIONS 2026-09-28, the two decisions of Fable's judgement, decision 1): a conversion makes a call possible and never changes which declaration runs when one already fits; declarations are chosen by the coercion chapter's order, applicability and specificity taken on declared, quantified domains; the chosen declaration is then instantiated. Its text is explorations/reviews/conversion-overloading-judgement.md section 1, \"Stated for the specification\". This rung writes the cross-reference sentence its section 5 names at the coercion chapter's three passages, beside its rewrite of basic/overloading.tex:173-176 and :292-295; it cites what batch N's rung T wrote in the inference chapter (the instantiation step and the numeral default) and does not restate it. Under Q1 = (a) (answered 2026-09-27 and decided in Pavol's own words on 2026-09-29, POSITIONS 2026-09-29, the implicit bound; the judgement's section 10, item 4): the implicit-bound sentence says Any (batch N's rung T left it to this rung, above), with a callout recording the Working Draft's Object and naming the compile path's Object setting (row 412) as the divergence until the switch-over, and, under the POPL recheck's item 1.7, a default, citing the paper's \"By default, each type parameter has an upper bound Any\" (section 3.2, p. 11:9); and the naked-Any rule is stated as the checker applies it, with the library's value factory pair measured against it. Under Q3 = (a) (item 7), with the paper's instance rule: Naden's 2012 run-time instantiation restricted by the return type (Papers/RuntimeInstantiation/2012-6-15 return type instantiation restrictions.txt, RTRinstantionTheory.tex) is named in the decision record as the type group's 2012 draft of the rule the POPL 2019 paper states and proves, which the dispatch sentence now states (below), and as their fuller answer to the case the positional rule closes, built on neither path, as batch 5's rung S recorded the covariant keyword. The form is S1 (POSITIONS 2026-09-26, S1), as batch 5's rung S used it: the normative text edited in place, a \\revision callout at each changed passage (Specification/fortress/fortress.tex:87), an Appendix I entry per change with the original quoted as \"the Working Draft of February 2011\" with its path and line in Specification-1.0-frozen/ (POSITIONS 2026-09-26, the first of the batch-5 answers), and the grounds of each change, with their sources, in a decision record in the rung's own directory. The later Types chapter is cited beside where it covers the topic (POSITIONS 2026-09-26, the lineage note): function types that hold generic and plain declarations together (Documentation/Specification/Prose/Language/types.tick:553-558, :794-801), a static parameter that appears in no parameter type dropped from the quantified type (:764-767), and under Q1 = (a) function types under Object but tuples not (:232-236).",
"",
"**The items this rung leaves or follows.**",
"- Under item 26 = (1) (explorations/reviews/comprises-type-level-judgement.md sections 4 and 5, with the proof addendum Pavol's decision builds in, explorations/reviews/comprises-type-level-proof-addendum.md; the ways in explorations/reviews/comprises-type-level-ways.md): the four passages that read a comprises clause at the level of types (row 491) are restated at the level of values. Covering is defined once beside the intersection definitions (basic/types-vals-vars.tex:583-588): a type covers another when every value of the second is a value of the first, and a trait with a comprises clause is covered by the union of its listed types. P1 (:602-604): any value of both S and T is a value of V, so V covers S intersected with T, with one sentence that a trait may stand between a closed trait and its listed types. P2: the Meet Rule for functions (advanced/overloading.tex:247-274) gains its closed-trait case, two declarations being a valid overloading also when the declarations more specific than both together cover the intersection of their domains; the example's conclusion follows; the method forms (:409, :423) alike; the draft note at :240-245 answered; fact 2 (:455-468) restated for a static type that sits between; one sentence on the type of such a call, the intersection of the minimal candidates' return types, in the basic chapter's resolution section or beside fact 2 (this rung's choice); the proof appendix revised (the next item), where the judgement's sections 5 and 8 gave it a callout only; appendices/future.tex:269-285 marked done. P3 (basic/functions.tex:377-382, :413-415): the concrete declarations together cover the closed trait, a definition for every listed type, with one sentence that this is how the compiled checker checks abstract methods and that top-level abstract function declarations run on neither path. P4 (basic/components/source-code.tex:429): \"all its listed types\", the team's \\note corrected in place with no callout and one sentence in the Appendix I entry. Entry I.1.20 of Appendix I loses its sentence that these passages are not revised (appendices/changes.tex:1314-1319). The coverage case is stated beside answer 9's Meet Rule as an addition to the 2011 paper's form, and the entry says so. The wording is this rung's; the originals are quoted from the frozen copy at the lines the judgement's section 5 gives. The rung writes P2's pieces (the Meet Rule's closed-trait case and its method forms, fact 2's restatement, the typing sentence, the proof appendix's revision and future.tex's done mark) as callouts and Appendix I text of their own, apart from P1, P3, P4 and covering, so that under the record's fallback (section 1, item 26), taken when rung C's half of row 492 needs broader subtype or closure repairs, the gather can leave them out and name P2 in \"Passages not yet revised\" with row 492 and batch 8, while P1, P3, P4 and covering land (section 4).",
"- Under item 26 = (1), the proof appendix, Specification/appendices/overloading-function.tex (\"Proof of Overloading Resolution for Functions\"), revised as the proof addendum says (its sections \"One replacement premise\", \"Replacement lemmas and theorem\" and \"Application to the existing brief\"). What changes, in plain words. The proof's premise from the Meet Rule, a declaration on the exact intersection of two overlapping domains, gains the coverage case (the addendum's Cover-Meet): for two declarations whose domains overlap and neither of which is below the other, visible concrete declarations whose domains are each below both together hold every value of the overlap, for every such pair of the set, the covering declarations' own pairs among them. The existence lemmas stay (lem:subset, lem:dgesge-second, lem:ge). The two uniqueness conclusions for the static call, |\\sigma| <= 1 in lem:le and |\\sigma| = 1 in thm:overloading-subtyping, are replaced by run-time uniqueness alone, |\\delta| = 1 whenever |\\Sigma| is not 0, its proof taking a covering declaration where the old one took the declaration on the intersection: coverage gives a declaration that holds the value, not one whose domain is above the argument's static type, so a static call may have more than one most specific declaration. thm:dynamic-subtype-static is replaced by the refinement step: the declaration that runs has a domain below that of every declaration applicable to the static call, with no single static winner assumed. And a result-type step: by the Return Type Rule, the declaration that runs returns a subtype of every minimal static candidate's return type, so a returned value belongs to the intersection of those return types, which is the call's type (the sentence above, and rung C's typing); the step proves neither that the call terminates nor that nothing else fails at run time. The scope is marked in the appendix's text: declarations whose domain and return types are ground, calls applicable without coercion, under the no-duplicates rule, with concrete implementations, typed bodies and a sound, transitive subtype relation; the lift to generic declarations, inference and coercion keeps its own obligations, and the appendix is not presented as the proof of the whole generic system. The appendix names the assumption the proof rests on: every value of a closed trait belongs to one of its listed types, which the compiled checker does not yet enforce across components, since a type declared in a later component below a generic subtrait of a closed trait escapes its check (row 487, explorations/fortress-gap-ledger.md); the row stays open and is not this batch's (batch 8's, section 1). The form is S1: the proof edited in place with a callout, and an Appendix I entry quoting the original from Specification-1.0-frozen/appendices/overloading-function.tex, which the current file matches line for line. The wording is this rung's. Beside the four passages and \"covers\", it is what fact 2's restatement rests on. Under the POPL recheck's item 1.5, a default: the appendix's Appendix I entry says in one sentence that the POPL 2019 paper keeps a unique static winner as a theorem (Theorem 4.1, p. 11:15), that a call between two closed traits lies outside the paper, which has no closed types (p. 11:3, p. 11:25), and that the revival gives up the unique static winner there on the proof addendum's premises (explorations/reviews/decisions-review/popl-recheck.md section 1.5).",
"- Under item 30 = (1) and the paper's instance rule (explorations/reviews/plain-beside-generic-judgement.md sections 4 and 5, for which declaration runs; POSITIONS 2026-09-29, a type parameter that a call's arguments do not fix, and explorations/reviews/decisions-review/popl-recheck.md section 1.6, for its instance): the dispatch paragraph, basic/overloading.tex:262-276, gains one sentence. A declaration with static parameters is applicable to a dynamic call when some instance within its bounds is, as for a static call; the call dispatches to the most specific applicable declaration, which may be one the static call did not select; that declaration's type parameters are then instantiated as the POPL 2019 paper's dispatcher instantiates them ([Solve-Step], p. 11:19; [R-Method], p. 11:17): each at the intersection of its upper bounds, its declared bound, Any if none, and what the call's static type requires of the declaration's return type, the arguments' run-time types lying below it; so never at Bottom, never at the union of the arguments' types, and at a value's own type only where the value fixes the parameter, as it does where the parameter occurs as a static argument of a trait in a parameter type, whose argument is unique under instantiation exclusion (cross-referenced to the traits chapter); a declaration the static call selected keeps the instantiation inferred there (cross-referenced to the inference chapter batch N's rung T wrote). Where the paper's dispatcher, which solves every call this way, would give a declaration the static call selected a different instance, for a type parameter that neither the call's static type nor an invariant position in a parameter type constrains, the sentence keeps the inferred instance, as item 30's judgement words it, and the decision record names the difference for Pavol's review. A callout in the S1 form (POSITIONS 2026-09-29, a type parameter that a call's arguments do not fix): both implementations take the value's type today where the value does not fix the parameter; walk by necessity, since it has no static types and so no static return type to bound the instance, as with its choice of coercions (item 16); the compiled path until phase 5, since its code generator reads a dispatched arm's static arguments from the value's descriptor (ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:1484, \"Runtime inference for some cases\") and does not pass the call's static return type (:2048, \"Not sure what to do with return type\"); where the value fixes the parameter the two rules agree. The callout cites rung C's expected-failure pair and the ledger row C opens for it, whose number the gather writes in. Its Appendix I entry quotes the dispatch paragraph from the frozen copy and gives the paper's reason: the team had assumed the union of the lower bounds and could not prove it, so the paper's dispatcher always takes the intersection of the upper bounds (section 5.4, p. 11:25). The wording is this rung's. A size parameter that nothing fixes (row 446, PLAN.md item 17), which the paper, having no size parameters, does not reach, is left as it stands and named in \"Passages not yet revised\".",
"- Under item 16's decision (POSITIONS 2026-09-29, walk's run-time choice of coercions; explorations/reviews/decisions-review/judgement.md section 6, item 7, option 1): the passage basic/conversions-coercions.tex:598-635, \"Notice that coercion is resolved statically\" with its example, keeps its text and its example's answer and gains one callout in the S1 form. It says, in this rung's words: the compiled path follows the text; the interpreter, having no static types, chooses a coercion on the value and so answers the example differently, running f(B) for f(c), as it does in batch 4's rung C's narrow case, gated by the expected failures ProjectFortress/tests/XXXCoercionStaticRungC.fss and XXXCoercionStaticNarrowRungC.fss; and the interpreter is made to match after the switch-over, when it takes the coercions the checker inserts. The callout is apart from the cross-reference sentence this rung writes at :598-605 (the decisions, above). Its Appendix I entry sits beside this rung's others, quoting the passage from Specification-1.0-frozen/basic/conversions-coercions.tex:567-604, which the current passage matches line for line, and naming the decision. Item 16 is closed with the two tests as its record; the callout states no more than they gate.",
"- Item 14's sentence, Specification/basic/trait-parameters.tex:339-340, is left as it stands and named on the list.",
"- Until item 23 is answered, the introduction of Appendix I (Specification/appendices/changes.tex:48-49) is left, and each of this rung's entries says in its own text that it does not follow from route A and which decision it follows, as rung A's entry does. Under item 23 = (a), this rung rewords the introduction's paragraph to say that the entries follow the revival's decisions, route A the first of them, each naming its own, and changes no other entry.",
"- The inference chapter batch N's rung T wrote (explorations/reviews/batch-N-review.md, finding 1). Its first callout says the rule it states was built into the compiled type checker with this text (Specification/basic/inference.tex:30-31) and names as not yet revised the passages this rung revises: the overloading chapters' sentences that static parameters are inferred before applicability and comparison, the implicit bound and the naked-Any rule (:38-49). Its Appendix I entry, \"The inference of a call's static arguments\", says that \"the chapter states the rule that the checker builds, and no more\" (Specification/appendices/changes.tex:1608-1610), and its Effect names no departure (:1639-1653). Four gated rows are the checker departing from the chapter: 508, the expected type letting a declaration reached by coercion win over a generic one that fits (ProjectFortress/compiler_tests/XXXInferContextKeepsFit, XXXExpectedTypeFnChoiceRungT); 515, a lone type parameter beside a coerced argument refused (XXXInferUnionCoercedArg); 516, a written bound taken where the chapter gives the union (XXXInferLoneBoundUnion); 518, an instance at a union refused as an argument (XXXInferUnionInstanceArg) (explorations/fortress-gap-ledger.md, rows 508, 515, 516 and 518). Pavol's requirement of 2026-09-24 asks that no discrepancy between the text and the implementation stay unrecorded (explorations/coordinator/POSITIONS.md, 2026-09-24, a requirement on the plan). So this rung rewords the first callout, and the Effect's last sentence (:1650-1653), for the passages it has revised, rewords the entry's rationale so that it no longer says the checker builds no more than the text, and lists the four rows in the entry's Effect as the checker's departures, as batch 7C's rung X listed its checker's departures in its entry (rows 487, 489 and 490; Specification/appendices/changes.tex:1312). Under the paper's instance rule (POSITIONS 2026-09-29, a type parameter that a call's arguments do not fix; explorations/reviews/decisions-review/popl-recheck.md section 1.9), the chapter's rule changes in one sentence: where a lone type parameter has no narrowest candidate and the rule for numerals does not settle the tie, it takes \"the union of the types of those arguments\" (inference.tex:95-98) no longer, but its declared bound, Any if none, under what the expected type requires of the return type where the call has one, the arguments' types lying below it and none of them converted. Row 516 then changes: both implementations take a written trait bound, which the text now gives, and the departure is the unbounded case, where the text gives Any, the checker takes the union and walk the arguments' common supertype; row 515 stays a departure (the text now instantiates g0(w, r, z) at Any, z converted, and the checker refuses the call), and so does row 518 (an instance at a union arises only from the checker's own union). The two tests that pinned the union are rungs C's and W's, which turn them into tests of the bound (their sections). The sentence's grounds go into the decision record as they stand: the paper states the rule for its run-time dispatcher and gives no static inference algorithm (section 5.4, p. 11:25), asking of static inference only that it never give Bottom (pp. 11:16-17), and its one static example types O.m(3, true) at the union of Int and Boolean (p. 11:21); so the bound in the static rule is Pavol's decision applying the paper's run-time rule at static inference too, which the paper allows and does not require. There is no Working Draft text to quote, the chapter being the revival's: the change goes into the entry's Change and Rationale, citing the decision and the paper. The chapter's \"not described\" item on a static parameter that neither an argument nor the expected type fixes, and its callout on the checker's Bottom binding (inference.tex:191-196, :211-217), are left for batch 8's checker rung, which builds the bound there (section 1, \"What the batch leaves out\"); the entry's Effect names them as the next change. It also adds to the interpreter's callout (inference.tex:149-160) that walk binds the narrowest named common supertype of the arguments' run-time types within the bounds where no argument's type is narrowest, which is the bound where the bound is that supertype, as Number is for a ZZ64 and an RR64, and not for an unbounded parameter, which the chapter now gives Any (row 516; the text point batch N's judge left for the next rung that edits the chapter, explorations/compile-ladder/climb-batch-N/JUDGE-review.md section 1, restated for the bound). The rule the chapter states is not changed but for the one sentence above.",
"",
"**What it writes.** First, before any edit, the list: every passage of Specification/ outside library/apis/ that states the sentence, its consequence that static parameters are ignored, inference of static parameters before applicability or comparison, the coercion chapter's resolution, or, under Q1 = (a), the implicit bound or the naked-Any rule; and every passage the items above name; each with its file:line, what the decisions make of it, and whether it is revised now or left, with the decision, item or source that settles it. The scan covers at least the passages above, Specification/appendices/future.tex:259-266 and :288, and the calculi of Appendix A (Core Fortress with Overloading). Then:",
"- In basic/overloading.tex and advanced/overloading.tex: the sentence and its echo replaced by the model the decisions name, and the two \"inferred ... before\" passages rewritten so that inference instantiates the chosen declaration and does not precede the comparison.",
"- In basic/conversions-coercions.tex: the cross-reference sentence at the three passages, in the words of the conversion judgement's section 1 where they fit the chapter, with a callout at each; and under item 16's decision, the callout at :598-635 the item above describes, the passage and its example unchanged.",
"- The examples, in the specification's own form, \"Not allowed\" beside the allowed repair (Specification/basic/traits.tex:286-292 is one): the paper's pair that the return-type rule refuses, a generic declaration beside a plain one with which declaration a call gets, and an override that reorders its static parameters (under the POPL recheck's item 1.3, in the positional rule's callout, as what the compiled implementation refuses). Each is the shape of a probe on file (explorations/reviews/overload-static-params-ways/: GenPlainRTR, GenPlainSub, PermuteReturn), so that rung C's tests check the same shapes. Under item 30 = (1), the generic-beside-plain example gets both directions: GenPlainSub's shape, where the plain declaration is the more specific, and the judgement's, grab[\\X\\](t: Tag[\\X\\]): Marker[\\X\\] beside grab(a: Any): Any, where a call whose argument is declared Any and holds a Tag[\\Red\\] gets the generic declaration at X = Red, the value fixing X, so that the paper's instance rule gives the same instance. Under Q4 = (2), a fourth, the shape of the team's ProjectFortress/tests/XXXGenericOverload2.fss, as \"Not allowed\".",
"- In appendices/future.tex: the relaxation marked done where it is listed, with Jan's array1 pair answered by the library's own factory (the witness typecase of array1 in Library/FortressLibrary.fss, read on the base) and the exclusion question answered by the paper's reduction.",
"- Under item 26 = (1), in appendices/overloading-function.tex: the revision the item above describes, its scope and row 487's assumption stated in the appendix itself, with its callout and its Appendix I entry.",
"- In Appendix I (Specification/appendices/changes.tex): one entry per change in the form of batch 5's rung S, under item 16's decision the coercion callout's among them, inserted as new subsections after the last revision subsection on the base, immediately before \"Passages not yet revised\", where every rung since batch 7's rung A has put its entries; the passages it leaves added to \"Passages not yet revised\", each with its item or row.",
"- In basic/inference.tex and its Appendix I entry, \"The inference of a call's static arguments\": the first callout, the entry's rationale and Effect, and the interpreter's callout, as the item above says; of the chapter's rule, only the union sentence, under the paper's instance rule, with the entry's Change and Rationale.",
"- Under the POPL recheck's item 1.1, a default: the Rationale of Appendix I's entry \"Instantiation exclusion\" (appendices/changes.tex, route A's first entry) cites the POPL 2019 paper's ancestor rule, [Anc-Same-Trait] (Figure 4, p. 11:11), which the paper credits to Steele and Chase in 2012 (p. 11:24), beside the 2011 paper and the 2012 Types chapter; one citation, the entry otherwise unchanged.",
"- Under the POPL recheck's item 1.4, a default: this rung's entry for the overloading chapters says in one sentence that the POPL 2019 paper's soundness proof excludes a type parameter named in another's upper bound (restriction 2, p. 11:11) and closed types (p. 11:3, p. 11:25), so that the library's SUM, BIG MAX and Integral families rest on the 2011 rules as the checker implements them, not on the 2019 proof.",
"- The decision record, explorations/compile-ladder/rung-spec-overloading/decision-record.md: the sentence's date and author, the 1.0 section it displaced and that section's own expectation of replacement, walk since 2007, the paper, the restart, the way back (enforcing the sentence) with its price (179 library api pairs refused at the least, explorations/reviews/mie-probes/scope-call-site-dispatch.md), under Q3 = (a) Naden's design, with one sentence naming his instance bounded by the static return type as the 2012 draft of the paper's instance rule, which the dispatch sentence states and neither path builds yet (phase 5); the paper's rule and its grounds, with the difference the dispatch item above leaves for Pavol's review and the static reading of the inference sentence; under the POPL recheck's items 1.3 and 1.4, the positional rule's standing as an implementation restriction and the sentence on the paper's exclusions (restriction 2 and closed types); and the passages left, with their items.",
"- The front matter's paragraph (Specification/fortress/preamble.tex) only if it names a passage this rung revises.",
"- The citations of the two chapters' lines, and of the inference chapter's, that its edits move in the messages and comments of ProjectFortress/tests/, compiler_tests/ and library_tests/ (batch 6.5's rung G's dispatch tests cite basic/overloading.tex:100-107 and :262-276; ten test files cite inference.tex, at :15-18 and :60-98), re-anchored in its own commit by the map of unchanged lines, no assertion changed (explorations/compile-ladder/climb-batch-6/JUDGE-review.md, finding 1). Not the six expected-failure tests rungs C and W may rename or rewrite, ProjectFortress/tests/XXXComprisesMeetWalk.fss, ProjectFortress/compiler_tests/XXXComprisesMeetCompiled.fss, ProjectFortress/tests/XXXDispatchRenamedArmWalkRungG.fss, XXXDispatchSwappedArmWalkRungG.fss, and under the paper's instance rule ProjectFortress/compiler_tests/XXXInferLoneBoundUnion.fss (C's) and ProjectFortress/tests/XXXInferLoneUnionWalk.fss (W's): the rung lists their citations with the new lines, and the gather re-anchors them after the rename. Where a message of another test states the union sentence as the chapter's rule (ProjectFortress/compiler_tests/XXXInferUnionCoercedArg.fss, \"T the union with z converted\"), the rung rewords it to the bound with the re-anchoring, no assertion changed; the assertions of XXXInferUnionCoercedArg and XXXInferUnionInstanceArg hold under the bound as under the union.",
"Each changed example is written in its file's convention; an example generated from SpecData/examples/ is reported, not edited.",
"",
"**How it is checked.** No test can go red for a prose edit. The specification is built as batch 5's rung S and batch 6's rung T built it, with FORTRESS_HOME set to the worktree: ./ant genSource, then ./ant tex, in Specification/fortress/ (Specification/fortress/README:5-14; the build's history and fallbacks are in explorations/coordinator/CLIMB-BATCH-5.md section 3, S, \"How it is checked\"). Required: both targets on the base and after the edit, their logs under tmp/rung-spec-overloading/; pdftotext of the two PDFs diffed, showing only the revised passages, the callouts, the appendix entries and page shifts; git diff --stat showing only the listed .tex files and the re-anchored test messages. The rung does not commit Specification/fortress.pdf: rung L changes the .fsi files Part IV is rendered from, so the commit stage rebuilds the PDF once on the landed tree (section 4).",
"",
"**Files it may touch.** Under Specification/, not Specification-1.0-frozen/: basic/overloading.tex, advanced/overloading.tex, basic/conversions-coercions.tex (the three passages, and under item 16's decision the callout at :598-635), appendices/future.tex, appendices/changes.tex (its entries at its place, the passages it leaves in \"Passages not yet revised\", and under item 23 = (a) the introduction's paragraph), fortress/preamble.tex (only as above), under Q1 = (a) basic/trait-parameters.tex (the implicit bound only), under item 26 = (1) basic/types-vals-vars.tex, basic/functions.tex, basic/components/source-code.tex and appendices/overloading-function.tex (row 491's passages and the proof appendix's revision) and entry I.1.20's sentence in appendices/changes.tex, basic/inference.tex (its first callout and its interpreter's callout, and of its rule, under the paper's instance rule, the union sentence alone) and its entry in appendices/changes.tex, \"The inference of a call's static arguments\" (the Change, the rationale and the Effect), under the POPL recheck's item 1.1 the Rationale of the entry \"Instantiation exclusion\" in appendices/changes.tex (one citation), and whatever else its list finds; the messages and comments of tests whose citations its edits move, not the six above; its own directory. Not: Specification/fortress.pdf (the commit stage's); the comprises text of basic/traits.tex (batch 7C's); trait-parameters.tex:339-340 (item 14); no source or library file, and no test's assertion.",
"",
"**Java or Scala.** Neither.",
"",
"**The checker count.** Unchanged by this rung: the stage reads the compiled checker and Library/, and this rung touches neither.",
"",
"**Stops.** Any edit under Specification-1.0-frozen/. Normative text for a rule neither path will run once rung C lands: the checker step the judgement's option 2 describes (a domain exclusion concluded because the only way two domains could meet contradicts a bound), which answer 9 declined; Naden's 2012 notes as a rule of their own, beside the paper's instance rule that the dispatch sentence states in their place; under Q4 = (1), the domain condition; normative text for a size parameter that nothing fixes (row 446, item 17). The paper's instance rule is the one exception Pavol's decision makes (POSITIONS 2026-09-29, a type parameter that a call's arguments do not fix): the dispatch sentence and the inference sentence state it though neither path runs it where the value or the arguments do not fix the parameter, each with the callout and the gated expected failures that record the departure. Text on the checker's Bottom binding or the inference chapter's \"not described\" item on a parameter that nothing fixes, which batch 8's checker rung writes. New text for a passage of item 14 or 23 while this section's answers line says it is not answered. Under item 26 = (1), a sentence that states the coverage case's soundness without its premises, or presents the revised proof appendix as the proof of the whole generic system: the proof holds for ground declarations without coercion and where closed families are closed, which row 487 leaves unenforced, and no soundness claim is written unconditionally while that premise is recorded as unenforced. A passage whose new text neither the decisions nor the two judgements' texts settle: the rung reports it and does not choose. The build changing a tracked file.",
"",
"**For the skeptic.** There is no program to run both ways. The checks: the list against the specification (every passage it should hold is on it, and nothing else is edited); every quoted original against git show <base>:<path> and against the frozen copy's line; the two builds and the pdftotext diff; each rule the text states against the paper (Papers/Types/rules.tick, overloading-check.tick) and against rung C's section of this record, since the gather checks it against the landed checker; the coercion chapter's sentence against the conversion judgement's section 1; under item 16's decision, the coercion callout against the decision (POSITIONS 2026-09-29, walk's run-time choice of coercions) and against the two expected failures it cites, run under walk on the base, the passage and its example unchanged against the frozen copy's lines, and its Appendix I entry; under item 30 = (1), the dispatch sentence against the item 30 judgement's section 5 for which declaration runs, and under the paper's instance rule against the decision's words, the paper's [Solve-Step] and [R-Method] as the extract gives them (research/extracts/ParkPOPL2019-extract.md section 4.2) and the recheck's section 1.6 for the instance, its callout against both paths as landed (walk's instance on rung C's pair's program and the compiled pair's failure, each run on the base), and the difference it leaves for Pavol's review named in the decision record; the inference chapter's new sentence against the recheck's section 1.9, and the decision record's account of its static reading against the paper's pages 11:25 and 11:21 as the extract gives them; the recheck's defaults against its sections 1.1, 1.3, 1.4, 1.5 and 1.7; under item 26 = (1), the proof appendix against the proof addendum's sections \"One replacement premise\" and \"Replacement lemmas and theorem\" (the existence lemmas kept, both static uniqueness conclusions gone, run-time uniqueness proved by a covering declaration, the refinement and result-type steps present, the scope and row 487's assumption marked), and P2's pieces separable from P1, P3, P4 and covering; each example's verdict against its probe's capture on file and against what rung C's tests assert; the passages left against the answers line; each re-anchored citation against the unchanged lines; the inference chapter's entry against the four rows it lists, their gated tests and the ledger, and every sentence of the revised callouts against the checker and walk as landed.",
"",
"**What comes back to Pavol.** The revised pages, as the pdftotext diff; the Appendix I entries; the list, with what was left and why, the passages of items 14, 23, 26 and 30 among them; under the paper's instance rule, the dispatch sentence with its callout, the inference chapter's new sentence, the difference the dispatch item leaves for his review, and the recheck's five defaults as written.",
"",
"**What it closes.** Under item 26 = (1), row 491 (fixed: the four passages restated and entry I.1.20's sentence removed; its code half is row 492, rungs C's and W's); else no row. Notes appended: row 398, that the specification states the positional rule; row 478, that the text now makes its four probe sets legal, so its home is rung W's test; under item 26 = (1), row 487, that the proof appendix names it as the open assumption the coverage case rests on; under item 30 = (1), row 496, that the text now gives the run-time answer, the declaration and, under the paper's instance rule, its instance, so its home is 2, gated by rung C's tests, and row 499, that the text gives the more specific declaration, so under Q4 = (1) its home is 2 as well; under Q1 = (a), row 412, that the specification's bound is now Any and the compile path's Object setting is the divergence; under item 16's decision, row 19, that the coercion chapter's callout now records walk's choice on the value, gated by its two expected failures; rows 508, 515, 516 and 518, that the inference chapter's entry lists them as the checker's departures, and row 516, that the chapter now gives the bound where it gave the union, both paths taking a written trait bound, the unbounded case the departure on both paths (the checker's union, walk's common supertype), gated by rungs C's and W's new expected failures, and that the interpreter's callout names walk's supertype.",
"",
"**Your briefing, entry by entry.** Step 1's command prints these entries in this order. Each line names an entry, then says why it is there and what you do with it; read the line before the entry and act on it.",
"- positions:2026-09-26 answer 9: The decision this rung writes into the text: the sentence goes, the 2011 model with the positional rule, the original kept; cite it in every callout and entry.",
"- positions:2026-09-28 two decisions of Fable's judgement: The rule for conversions and overloading; your cross-reference sentence in the coercion chapter states its first step, and batch N's inference chapter its second.",
"- positions:2026-09-24 requirement on the plan: Why the specification changes with the implementation and keeps the original; the reason each of your entries exists.",
"- positions:2026-09-26 S1: The form of every change: text in place, a revision callout, an Appendix I entry quoting the original, reasons in a decision record; follow it for each passage.",
"- positions:2026-09-26 first of the batch-5 answers: Quote each original as the Working Draft of February 2011, with its path and line in Specification-1.0-frozen/.",
"- positions:2026-09-26 lineage note: Cite the later Types chapter and the restart's overloading chapter beside the specification where they cover a topic.",
"- positions:2026-09-23 fork weighed: The implementers' later word weighs more than the 2009 text where they conflict; the grounds for dropping the sentence, for the decision record.",
"- positions:2026-09-26 second batch-5 answer: Every static argument except an operator argument counts in the exclusion rule; state the reduction of two quantified domains with it.",
"- positions:2026-09-26 third batch-5 answer: The precedent for Q3: the covariant keyword named in a callout and the decision record as a design neither path implements; name Naden's instantiation the same way.",
"- positions:2026-09-27 numerics plans: Q1's answer, the bound Any, and batch N's inference chapter, which your text cites for instantiation and does not restate.",
"- positions:2026-09-29 implicit bound: Q1 decided in Pavol's own words: the bound is Any; your sentence says it, with a callout quoting the Working Draft's Object and naming the compile path's Object setting, row 412, as the divergence until the switch-over.",
"- positions:2026-09-27 launch of phase 3's batches: Q2 and Q3 taken at their defaults and listed for his review; you follow Q3's default.",
"- positions:2026-09-28 comprises clause row 459: Batch 7C's value reading of a comprises clause, which item 26's decision carries into the four passages and the Meet Rule's closed-trait case.",
"- positions:2026-09-29 PLAN item 26: Item 26 decided: option 1 with the proof addendum's three points; your four passages, covering, the Meet Rule's case and the proof appendix's revision rest on it.",
"- positions:2026-09-29 PLAN item 30: Item 30 decided: option 1 of its judgement, the generic declaration runs; which declaration your dispatch sentence and example give rests on it, its instance on the next entry.",
"- positions:2026-09-29 type parameter arguments do not fix: The paper's instance rule: each type parameter at its declared bound under the call's static return type; your dispatch sentence, its callout and the inference chapter's bound in place of the union follow it.",
"- positions:2026-09-29 walk's run-time choice of coercions: Item 16 decided: walk's choice of a coercion on the value is the interpreter's limit; your one callout at the coercion chapter's resolved-statically passage says so, cites its two tests and names the switch-over.",
"- positions:2026-09-29 batch 7b's items 22 and 23: Item 23 decided, option (a): you reword Appendix I's introduction so that its entries follow the revival's decisions, route A the first of them, each naming its own, and change no other entry.",
"- positions:2026-09-19 answering the open question: The library's own practice is the standard; find its device for the same kind of problem before any other way.",
"- positions:2026-09-27 stops a batch record reserves: Every stop reserved for Pavol is reversible: finish, list it in stopsMet with liftedBy citing this entry, and land.",
"- ledger:19: Walk's coercion, chosen on the value, and the two expected failures where that differs from the text's static choice; your callout cites them, and you append that the text now records the difference.",
"- ledger:398: The permuted override the positional rule refuses; append the note that the specification now states the rule.",
"- ledger:412: The compile path's Object bound; you revise the implicit bound under Q1, so append the note that the text now says Any.",
"- ledger:478: Walk reading one bound for two generic overloads; your text makes its four probe sets legal, so append that its home is now rung W's test.",
"- ledger:491: The four passages that read a comprises clause at the level of types, item 26; under its decision you restate them at the level of values and close the row.",
"- ledger:492: Both paths refuse the Meet Rule's own example, which your chapter keeps as valid; rungs C and W repair it, and you do not reword it.",
"- ledger:487: The closure the coverage proof rests on, unenforced across components; name it in the proof appendix as its open assumption, not this batch's, and append that note to the row.",
"- ledger:496: A generic declaration beside a plain one at run time, item 30; your dispatch sentence gives the declaration and the instance, and you note the row moves to home 2.",
"- ledger:499: The positional reading of generic arms at run time; the passages it cites are those you rewrite, so say which answer your text gives and which it leaves.",
"- ledger:516: The lone type parameter the chapter gave the union; your sentence gives the bound, both paths take a written trait bound, and the unbounded case is the departure you list.",
"- doc:explorations/reviews/overloading-judgement.md#3.4 What the revised specification says: What the revised text states, rule by rule; your wording follows it and adds nothing it does not name.",
"- doc:explorations/reviews/overloading-judgement.md#3.5 What the checker enforces: The two rules rung C builds; your text states exactly these, so check each sentence against it.",
"- doc:explorations/reviews/overloading-judgement.md#8. Where this differs from the workers and from the S2 judgement: Why row 398 is the positional rule's and not the sentence's; the decision record's account of the permuted override.",
"- doc:explorations/reviews/conversion-overloading-judgement.md#1. The rule: The resolution text for the coercion chapter, unchanged in substance; your sentence renders its applicability clause and points to the inference chapter.",
"- doc:explorations/reviews/conversion-overloading-judgement.md#5. Where it lands, and in what order: The three coercion-chapter passages your sentence goes beside, and what batch N's rung T states instead of you.",
"- doc:explorations/reviews/overload-static-params-ways.md#2.2 The probes: The probe shapes GenPlainRTR, GenPlainSub and PermuteReturn that your three examples are written from.",
"- doc:explorations/reviews/overload-static-params-ways.md#7. The history in the commits: The sentence's date and authorship and the 1.0 section it displaced, for the decision record.",
"- doc:explorations/compile-ladder/plan-7b/probes/P1.md#The answers: What rung C's rules refuse on the library, and the domain condition Q4 asks about; state the positional rule as Q4's answer in your section says.",
"- doc:explorations/compile-ladder/rung-generic-runtime/REPORT.md#9. The dispatch change's reach and its remainder: Item 30's and row 499's evidence: which passages give which run-time answer; your list names them.",
"- doc:explorations/compile-ladder/rung-spec-comprises/decision-record.md#4. Left, with the reason: Row 491's passages as batch 7C's rung X left them, and the model for how you leave a passage you do not revise.",
"- doc:explorations/reviews/comprises-type-level-judgement.md#4. The recommendation: Item 26's option, which Pavol took on 2026-09-29: the four passages at the level of values and the Meet Rule's closed-trait case, with the reasons.",
"- doc:explorations/reviews/comprises-type-level-judgement.md#5. The specification change, in the S1 form: What the four passages, covering and fact 2 must state under item 26's decision; the proof appendix is revised as the addendum says, not only given a callout; the wording is yours.",
"- doc:explorations/reviews/comprises-type-level-judgement.md#7. Where it lands, and what it costs: Your grown file list, and the fallback that leaves P2 to batch 8, now taken only if rung C's half needs broader subtype or closure repairs; write P2's pieces apart.",
"- doc:explorations/reviews/comprises-type-level-proof-addendum.md#Source and scope: The proof's scope, ground declarations applicable without coercion; mark it in the appendix, and never present the revision as the proof of the whole generic system.",
"- doc:explorations/reviews/comprises-type-level-proof-addendum.md#One replacement premise: Cover-Meet, the coverage case of the Meet Rule the proof now assumes; state it in the appendix in plain words beside the exact-meet case.",
"- doc:explorations/reviews/comprises-type-level-proof-addendum.md#Replacement lemmas and theorem: The appendix's revision step by step: existence kept, static uniqueness replaced by run-time uniqueness, the refinement and result-type steps that give the call's type.",
"- doc:explorations/reviews/comprises-type-level-proof-addendum.md#Application to the existing brief: What the addendum asks of each rung; its S line is yours, and its C and W lines are what your text states they build.",
"- doc:explorations/reviews/comprises-type-level-proof-addendum.md#What coverage checking assumes: Why row 487 is the proof's open assumption, a closure the checker does not enforce across components; name it in the appendix, never as repaired.",
"- doc:explorations/reviews/plain-beside-generic-judgement.md#4. The decision: Item 30's option 1, which Pavol took on 2026-09-29: the generic declaration runs; its rule for an instance the value does not fix is replaced by the paper's instance rule.",
"- doc:explorations/reviews/decisions-review/popl-recheck.md#1. The verdicts the paper bears on: The recheck against the POPL 2019 paper: 1.6 and 1.9 are your dispatch and inference sentences, 1.1, 1.3, 1.4, 1.5 and 1.7 your five defaults; follow its citations, with the wording yours.",
"- doc:research/extracts/ParkPOPL2019-extract.md#4.2 The dynamic choice: The paper's dispatcher in brief, its solving step and why it takes the intersection of the upper bounds; the source your dispatch sentence and its Appendix I entry cite.",
"- doc:explorations/reviews/plain-beside-generic-judgement.md#5. The specification change, in the S1 form: The dispatch sentence, its two cross-references and the example's second direction under item 30's decision; the wording is yours.",
"- doc:explorations/reviews/batch-7C-review.md#Findings@Item 26 belongs before batch 7b: Why item 26 bears on your chapter: the Meet Rule's example is in it.",
"- doc:explorations/reviews/comprises-type-level-ways.md#For batch 7b's record: The ways note's points for this batch: the coverage case beside answer 9's Meet Rule, stated as an addition to the paper's form.",
"- doc:explorations/reviews/batch-5-conformance.md#Findings that need Pavol@One sentence of the revised specification is broader: Item 14's sentence, which you leave as it stands until he answers.",
"- doc:Specification/basic/overloading.tex#Overloading and Multiple Dispatch: The basic chapter whole, which you revise; read every passage on static parameters and dispatch before you choose where the model goes.",
"- doc:Specification/advanced/overloading.tex#Overloaded Functional Declarations: The advanced chapter whole, which you revise: the sentence's echo, the naked-Any rule, the rules and the Meet Rule's example.",
"- doc:Specification/appendices/overloading-function.tex#Proof of Overloading Resolution for Functions: The proof appendix whole, which you revise under item 26's decision: its lemmas and theorems by label, the original you quote from the frozen copy.",
"- doc:Specification/basic/conversions-coercions.tex#Coercion Resolution: The coercion chapter's resolution, where your cross-reference sentence goes at its three passages and item 16's callout at its passage on static resolution.",
"- doc:Specification/basic/trait-parameters.tex#Type Parameters: The implicit bound, which you revise under Q1: batch N's rung T names Any in its chapter's callout and leaves the sentence to you.",
"- doc:Specification/basic/inference.tex#Type Inference: Batch N's inference chapter, whole: reword its first callout, add walk's named supertype to its interpreter's callout, replace its union sentence by the bound, and leave the rest of its rule and its Bottom callout.",
"- doc:Specification/appendices/changes.tex#The inference of a call's static arguments: Its Appendix I entry: record the bound in its Change and Rationale, reword its claim to state no more than the checker builds, and list rows 508, 515, 516 and 518 in its Effect.",
"- doc:Specification/appendices/changes.tex#Instantiation exclusion: Route A's entry, whose Rationale gains one citation under the recheck's item 1.1, the paper's ancestor rule beside the 2011 paper and the Types chapter; nothing else of it changes.",
"- doc:explorations/reviews/batch-N-review.md#Findings@chapter says it states no more: Why the inference chapter is yours: four gated rows contradict its claim, their tests named here, and batch 7C's rung X listed its checker's departures the same way.",
"- doc:Specification/appendices/future.tex#Functions and Overloading: The future-work entries on overloading: mark the relaxation done, and answer Jan's pair and the exclusion question.",
"- doc:Specification/appendices/changes.tex#Initializing an array from a function: An entry that does not follow from route A and says so; the model for your entries' first sentence, and under item 23's decision, (a), you reword the introduction to say the entries follow the revival's decisions, each naming its own.",
"- doc:Specification/appendices/changes.tex#Passages not yet revised: The subsection your entries go before; add the passages you leave, each with its item.",
"- doc:Documentation/Specification/Prose/Language/overloading.tick#Principles of Overloading: The team's 2012 restart of the chapter, which dropped the sentence; cite it beside the passage.",
"- doc:Papers/Types/rules.tick#Overloading Rules: The paper's three rules as it states them; your text states them the same way.",
"- doc:explorations/compile-ladder/rung-spec-route-a/decision-record.md#3.9 The form: How batch 5's rung S applied the S1 form; your callouts and entries take it.",
"- doc:explorations/compile-ladder/climb-batch-6/JUDGE-review.md#Finding 1: The rule for test citations your edits move: re-anchor them by the map of unchanged lines, no assertion changed.",
"- The compiled checker does not enforce the specification's sentence that overloads may not differ: What each path does with the sentence today; the ground of your decision record.",
"- Measured by the overloading judgement on private library copies: The library's own overloads across different lists; the price of the way back, for the decision record.",
"- The checker's return-type rule lets the more specific declaration choose its own instantiation: Row 398's mechanism; why the positional rule is needed.",
"- A generic arm of a template dispatcher is called at the dispatcher's own static parameters: What batch 6.5's rung G landed at run time; the reading row 499 describes.",
"- The specification reads a comprises clause as the later Types chapter does: Batch 7C's text, whose reading your item 26 passages carry on; edit only the sentence of entry I.1.20 the default names.",
"- The specification never wrote static-argument inference: Why instantiation belongs to the inference chapter batch N writes, not to yours.",
"- Specification-1.0-frozen/ is byte for byte: The frozen copy is the Working Draft of February 2011: quote originals from it, and never edit it (a stop).",
"- The team's latest word on types: The later Types chapter's standing, cited beside the specification.",
"- Citing Specification/library/apis/*.tex as an independent standard is circular: The generated apis render the library; never cite them as the standard for a rule.",
"- map:spec-to-implementation.md#Chapter 9, Functions; Chapter 15, Overloading: The map's row for the overloading chapters and what implements each part.",
"- map:spec-to-implementation.md#Chapter 17, Conversions and Coercions: The map's row for the coercion chapter your sentence joins.",
"- map:README.md#Touch this@Specification/ (the standard): What a specification edit moves, the PDF and the test citations, and what guards it.",
"- index:overloading: The notes on file on overloading; open those your passages touch.",
"",
].join('\n')

const C_TAIL = [
"",
"## Your rung: C - the return-type rule and the positional rule",
"",
"SLUG is rung-return-type-rule. WORKTREE is /home/user/fortress-rtr, branch wip/rung-return-type-rule.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-7.md, section 3, under \"C. The return-type rule and the positional rule\"), carried below word for word, and after it your briefing entry by entry, each with why it is there; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record, and the questions its answers line names are in section 1; read them there.",
"",
"**The answers this rung follows.** Q4 = (1), answer 9's rule; item 26 = (1), decided by Pavol on 2026-09-29 with the three points of Astra's proof addendum built into this batch's briefs (POSITIONS 2026-09-29, PLAN item 26); item 30 = (1), decided by Pavol on 2026-09-29, its judgement's option 1 (POSITIONS 2026-09-29, PLAN item 30), at the instance the paper's rule gives; the paper's instance rule, decided by Pavol on 2026-09-29 (POSITIONS 2026-09-29, a type parameter that a call's arguments do not fix); the POPL recheck's item 1.4, the recommended default while Pavol has not answered. (Section 1 of the record gives each question and its options. Text marked \"under Q4 = (2)\", \"under item 26 = (1)\" or \"under item 30 = (1)\" applies only while the coordinator has written that answer here.)",
"",
"**The problem.** Two defects of the compiled checker's overloading rules, both measured.",
"- The return-type rule solves the match of two declarations' domains once and checks that one instance (ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala, satisfiesReturnTypeRule, :81-117), where the paper requires it of every applicable instance (Papers/Types/rules.tick:174-180; the theorem at Papers/Types/overloading-check.tick:166-172). So the paper's own counterexample, a generic declaration returning its type parameter beside a plain declaration on a subtype returning that subtype, type-checks, and the JVM verifier then refuses the class, \"Bad return type\"; walk refuses the pair when it loads (explorations/reviews/overload-static-params-ways.md section 2.2, probe GenPlainRTR, and section 2.3, defect 2).",
"- An override whose return type reorders its own static parameters type-checks, and the compiled run dies with ClassCastException, because a call that writes its static arguments hands them by position to whichever declaration dispatch reaches (row 398; FACTS.md, \"The checker's return-type rule lets the more specific declaration choose its own instantiation\"; probes SubOvSwapTRun, explorations/compile-ladder/rung-nat-checker/probes/compile-probes.txt:29-33, and PermuteReturn); walk refuses the binding. The specification refuses the pair (Specification/advanced/overloading.tex:95-103, :158-170), and the paper accepts it, because it has no written static arguments (explorations/reviews/overloading-judgement.md section 8, first item).",
"Beside them:",
"- Row 492: the checker refuses the specification's own Meet Rule example, f(S), f(T) and f(V) over S comprises {U, V} and T comprises {V, W}, \"Invalid overloading of f\", at validOverloading in ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala (:418), because nothing reads the meet of two closed traits from their clauses. It is gated as the expected failure ProjectFortress/compiler_tests/XXXComprisesMeetCompiled.test. Walk's half is rung W's (PLAN.md, phase 3, batch 7b's line; explorations/reviews/batch-7C-review.md, finding 2).",
"- Row 499: since batch 6.5's rung G the compiled dispatcher tests a generic declaration at the call's type arguments, by position (FACTS.md, \"A generic arm of a template dispatcher is called at the dispatcher's own static parameters\"), and two programs the checker accepts, SkPosBox and SkPosFixed, now answer with the less specific declaration (explorations/compile-ladder/rung-generic-runtime/probes/skeptic/dispatch-pos.txt). Both declarations of each pair return String (SkPosBox.fss:7-8, SkPosFixed.fss:11-12), so the positional rule as answer 9 words it accepts them, and only the domain condition refuses them (section 1, Q4). Under item 30 = (1) the specification gives the more specific declaration, whose parameter the value fixes at an invariant position (Box[\\U\\], Fixed[\\Y\\]), so that the paper's instance rule and the value's type agree, and under Q4 = (1) the two programs' compiled answers contradict the text: a defect of the template dispatcher, gated here and repaired in phase 5.",
"- Not this rung's repair, and its expected failures this rung's: code generation fails for two generic declarations on a bare type variable, with a duplicate class name or unreadable serialized data (defect 3; probes GenBoundedFix, GenBoundedFixU); a dispatcher that is not a template, a generic declaration beside a plain one, dies on rung G's two programs, on a ZZ32 spelled two ways (row 494's remainder) and on a cast to the arm's return type spelled with its own parameter (row 496; explorations/reviews/plain-beside-generic-judgement.md section 6). A generic dotted method keeps rung G's dispatch defects too (row 495, gated since rung G).",
"- Under the paper's instance rule (POSITIONS 2026-09-29, a type parameter that a call's arguments do not fix; explorations/reviews/decisions-review/popl-recheck.md sections 1.2, 1.6 and 1.9), three pieces of evidence the text will now call for, none of them a repair of this rung's. First, the instance of a generic declaration reached only at run time whose type parameter the value does not fix: the text gives the parameter's declared bound under what the call's static type requires of the return type, and the compiled path takes the value's type, since its code generator reads a dispatched arm's static arguments from the value's descriptor (ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:1484, \"Runtime inference for some cases\") and does not pass the call's static return type (:2048, \"Not sure what to do with return type\"); where the value fixes the parameter the two agree, as in every program of rows 496 and 499. The recheck's shape (its section 1.6): a generic declaration returning Box[\\T\\], with T the whole type of one of its parameters, reached only at run time from a call that the static types sent to a plain declaration returning Any, whose argument holds a ZZ32: the text gives Box[\\Any\\], the value's type Box[\\ZZ32\\]. The specification refuses id[\\T\\](x: T) beside id(x: Any) under the bound Any, by the naked-Any rule (Specification/advanced/overloading.tex:114-127) and by No Duplicates, so the generic declaration takes a second parameter that the static call cannot match and the value can, or a written bound (with X extends Number the text gives Box[\\Number\\]); the shape is the rung's. Second, the paper's own valid overload set that domain subtyping alone cannot show valid (POPL 2019, p. 11:13): m[\\P\\](x: ArrayList[\\P\\]), m[\\Q extends T\\](y: List[\\Q\\]) and m[\\R extends T\\](z: ArrayList[\\R\\]), ArrayList extending List, both invariant, which the paper accepts through its existential reduction (p. 11:14) and the revival's checker, whose reduction forces equalities through instantiation exclusion only, may refuse (the recheck's section 1.2). Third, the compiled test of a lone type parameter, ProjectFortress/compiler_tests/XXXInferLoneBoundUnion, which asserts that pick0(w, r) and the bounded pick(w, r) are both instances at the union (row 516): the text now gives the written bound, BoxT[\\Number\\] for pick, which the checker already takes, and Any for the unbounded pick0, where the checker takes the union (its first attempt's join of the lower bounds, ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala:527, and the coercion attempt's candidates, Functionals.scala:334-343, by reading).",
"",
"**The decisions.** Answer 9 (explorations/coordinator/POSITIONS.md, 2026-09-26, answer 9): the checker keeps the paper's three rules with two changes, the return-type rule checked over every instance, and two generic declarations in the more-specific relation agreeing on their static parameters position by position, which closes row 398. The recommendation's description is explorations/reviews/overloading-judgement.md section 3.5; its account of one way to build the first change (the less specific declaration's parameters kept quantified except where the domains force an equality, as rung N already keeps a size) is one way among those the rung lists, not the brief, and probe P1 measured that way working (below). The positional rule's condition is Q4's answer: under Q4 = (1) the return type's alone, as the judgement words it; under Q4 = (2) the parameter types too, Java's condition for overriding. Not the checker step of the judgement's option 2 (an exclusion concluded from a bound), which answer 9 declined. Defect 3 gets a ledger row and an expected-failure compiler test, and its fix stays on phase 5's code-generation list (judgement section 3.7; the conversion judgement's sections 5 and 7, which leave it there with no new reach). Row 492's checker half and the typing of a call that sits between two closed traits, under item 26 = (1): the five paragraphs after this one. Under item 30 = (1) (its judgement's section 6): row 496's two crashes get expected-failure compiled tests here, their repair staying on phase 5's code-generation list; and the checker's dynamic-applicability annotation, isDynamicallyApplicable in ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala, which reads the other answer and which nothing reads, is left as it is and named in the report and in a note on row 496. Under the paper's instance rule (POSITIONS 2026-09-29, a type parameter that a call's arguments do not fix): the first piece of evidence above gets one expected-failure pair in the two-file form, its repair on phase 5's list, where the compiled dispatcher receives the call's static return type; the second gets a test, plain if the checker accepts the set and an expected failure pinned by its refusal if it refuses it, the refusal a ledger row this rung opens (the recheck's section 1.2), and no checker change, since the paper's existential reduction is a reduction beyond the one answer 9 took, and a rule beyond the paper's three and the positional rule is a stop; the third is turned into a plain test of the written bound, and the unbounded case gets its own expected failure, since the text now settles it and the rule of 2026-09-19 gives a deferred defect the text settles an XXX test (POSITIONS 2026-09-19, the six process decisions), for batch 8's checker rung to flip. Under the POPL recheck's item 1.4, a default: the decision record says in one sentence that the paper's soundness proof excludes a type parameter named in another's upper bound (restriction 2, p. 11:11) and closed types (p. 11:3, p. 11:25), so the library's SUM, BIG MAX and Integral families, and item 26's coverage case, rest on the 2011 rules as this checker implements them and on the proof addendum, not on the 2019 proof.",
"",
"**Row 492's checker half, under item 26 = (1).** It is this rung's by PLAN.md's routing and a requirement of Pavol's decision, so that rung S's closed-trait case of the Meet Rule states a rule the checker runs (explorations/reviews/comprises-type-level-judgement.md section 6; the proof addendum's review of this brief, explorations/reviews/comprises-type-level-proof-addendum.md, \"Application to the existing brief\" and \"Review of the 7b briefing, at the same base\"). What the checker must establish before it accepts two overlapping declarations whose domains are neither below the other, in plain words (the addendum's Cover-Meet): visible concrete declarations whose domains are each strictly below both domains, and so applicable to every value they hold, together hold every value of the overlap, every value a program could make and not only the values a test makes; the same holds for every such pair of the family, the covering declarations' own pairs among them; an overlap that is empty, because the two domains exclude, needs no covering declaration. The judgement's device can serve it: in the meet search of validOverloading, an intersection whose conjuncts have comprises clauses is expanded by them, a pair that excludes dropped, and the result compared with the declared domains, so that the intersection of S comprises {U, V} and T comprises {V, W}, with U excludes W, is covered by V. The expansion is a finite argument from the declared clauses, not a list of observed objects: it substitutes a trait's static arguments into its clause correctly, proves each covering domain below both competitors, drops only the exclusions it proves, and covers the whole remaining overlap; a case it cannot settle is a refusal, never an acceptance. Its recursion is bounded by cycle detection, not by an assumed depth of the clauses, and the rung watches for the stack overflow Steele met in the subtyping version (the lines he commented out in TypeAnalyzer.scala, 59fdeff62). The device is the rung's, listed among the ways.",
"",
"**The coverage check stays local to overload checking.** It answers whether an overload family is valid, and justifies the typing of a call that sits between two closed traits (below), and nothing else: a coverage result never becomes an ordinary subtyping or assignment fact. The normalizer's existing rule is the expansion's one-clause case: normConjunct in ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala (:645-655 on 3ec367f4d) shrinks a closed conjunct by its clause when another conjunct excludes one of its listed types, which the judgement measured working on the compiled path (MeetViaExclusion, compiled PASS; its control MeetViaExclusionNoV, refused; explorations/reviews/comprises-type-level-judgement/probes/). That normalizer is shared: subtype, meet and equivalent normalize through it (:85-86, :78-79, :314-315), so on MeetViaExclusion's shape ordinary subtyping already reaches V, and the checker's line between coverage and subtyping is already mixed (the addendum, \"The normalizer boundary is already mixed\"). The rung reuses the clause and exclusion helpers as it needs, and does not broaden the shared normalizer, subtype, meet or equivalent: every general subtype, assignment and equivalence verdict stays as it is in this rung, and repairing the normalizer's own consistency is separate work. SkBetweenAssign's refusal alone cannot show that no such verdict moved, since a change can reach an explicitly written intersection or union that program does not use; so the rung's diff leaves those functions, and their callers outside the overloading check, as they are, and a change there is the fallback's condition (below), its assignment and equivalence consequences reported, not made.",
"",
"**The call that sits between two closed traits, and coercion.** A call whose argument's static type sits between two closed traits (BetweenTwoClosed's g: G[\\ZZ32\\], explorations/compile-ladder/rung-spec-comprises/probes/between/BetweenTwoClosed.fss; and the ways note's OwnClauseBetween, explorations/reviews/comprises-type-level-ways.md, \"For batch 7b's record\") has several minimal unconverted candidates, where the checker today takes the first of a sort. Rung I's ambiguity check (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala, :688-752 on 3ec367f4d, from the comment \"Ensure that the head is the most specific\", built by batch N) accepts them and types the call as the intersection of their return types, as item 26's decision states. That type must reach the call's expression type and every expected-type check made against it, not only reorder the candidate list, and it must not depend on the order the declarations are written in. The Return Type Rule is a premise of that typing, not something the intersection repairs: the declaration that runs has a domain below every minimal candidate's (the addendum's refinement step), and its return type is below each of theirs only because the family keeps the Return Type Rule (its result-type corollary); a family whose covering declaration's return type is not below the return type of each declaration it covers is refused on that rule, whatever its coverage. A tie that involves a coercion stays under batch N's ambiguity rule as it landed: coverage never chooses between two conversions, which may give different values; the check's numeral tie, its tie of candidates with the same parameter types and its signalled ambiguity for an unresolved conversion tie keep their own rules and tests (InferNumeralTie, XXXInferAmbiguousCoercion, XXXInferSigmaTie); once those rules have fixed a conversion and its result type, the converted call is typed as any call without coercion (the addendum, \"Coercion is a separate choice\"). Batch N's rung I leaves such a call at today's typing, the head of the sort, and gates it with a compiled guard, ProjectFortress/compiler_tests/InferBetweenTie, item 26's judgement's MeetViaExclusion with a trait G[\\X\\] between S and T, whose call must run f(V)'s body (explorations/coordinator/CLIMB-BATCH-N.md, section 3, rung I, the test of an unconverted tie); that guard stays green under this rung's typing. The assignment v: V = g stays a static error: explorations/compile-ladder/rung-spec-comprises/probes/skeptic/SkBetweenAssign.fss keeps its refusal, \"Right-hand side has type G[\\ZZ32\\], but declared type is V\".",
"",
"**Astra's boundary on the intersection typing.** In Astra's words, as the coordinator gave them for this rung with the paper's instance rule: Astra's proof justifies the return-type intersection for ground declarations, including the more-specific declarations that may run. It does not establish the corresponding rule for generic overloads requiring runtime instantiation. In that case, one runtime instantiation must satisfy all static return promises simultaneously; separate instantiations satisfying each promise are insufficient. Do not generalize the new typing rule on the strength of the appendix proof. If supporting the intended cases requires that broader argument, use the existing fallback (the paragraph so named, below). A generic argument type already instantiated, such as G[\\ZZ32\\] in BetweenTwoClosed, stays within the ground case (the addendum, \"Source and scope\": \"an intermediate argument type such as G[\\ZZ32\\] is ground too\"). The paper's instance rule is where the difference shows: a generic declaration reached at run time is instantiated under the call's static type, which for such a call is the intersection, so one instance must meet both promises at once.",
"",
"**Row 487, the assumption the proof rests on.** The coverage argument holds only where closed families are closed: every value of a closed trait belongs to one of its listed types. The compiled checker does not yet enforce that across components: a type declared in a later component below a generic subtrait of a closed trait escapes TypeHierarchyChecker.everyKnownSubtypeListed, which sees only the extenders in the trait table it has (row 487, explorations/fortress-gap-ledger.md; the addendum, \"What coverage checking assumes\"). A local example that passes does not discharge it. The row stays open and is batch 8's (section 1): this rung does not repair it, does not edit TypeHierarchyChecker.scala, and claims no more than its tests show.",
"",
"**The record's fallback** (section 1, item 26). If this half needs broader repairs to meet the guarantee, a change to the checker's shared subtyping, meet, equivalence or normalizer, general generic-instantiation work, the intersection typing extended to generic overloads that need run-time instantiation (Astra's boundary, above), or closure enforced across components, the rung does not make them: it keeps XXXComprisesMeetCompiled as the expected failure and today's typing of the call that sits between, gates the addendum's positive program as an expected failure (the test, below), reports what it would have needed and why, and row 492's checker half, the typing and rung S's Meet Rule case go to batch 8 together (section 4). The proof alone is no reason to take it (the addendum, \"Rung size and the existing fallback\").",
"",
"**The evidence on file.** Probe P1 (explorations/compile-ladder/plan-7b/probes/P1.md), measured with a shadow of the two overloading files (P1/shadow.patch) on the library of batch 7's first run (81f0151be), before batches 7R, 7C, 6.5, N and 6.5b:",
"- The judgement's construction of the return-type rule and the positional rule refuse GenPlainRTR and the three permuted overrides, keep GenPlainSub printing circle, generic, circle, and leave the compiler's prelude compiling. The paper's theorem as the team coded it, commented out in OverloadingOracle.scala, refuses the prelude's own nest overloads in every compiled program, so it cannot be this rung's rule.",
"- On the library, the return-type rule over every instance newly refuses NoReductionPair's and SomeReductionPair's cond against Condition's, 3 pairs, because the api's PossibleReductionPair extends Condition[\\SomeReductionPair[\\R\\]\\] and the component's Condition[\\PossibleReductionPair[\\R\\]\\]; one api line, rung L's, clears both (section 4). The positional rule with the return-type condition newly refuses nothing: its three refusals, Col's and Row's subarray and SimpleMappedIndexed's map, are pairs today's return-type rule already refuses (batch 8's one-line slips), and it agrees on the other 1,598 pairs. With the domain condition it also refuses XXXGenericOverload2's shape and the value-form factories array1, array2 and array3, 5 pairs, for which no repair was measured.",
"- The count stage, with AnyIntegral's clause cleared as batch 7C's rule now clears it: 87 to 89 with the rules, 87 with the cond line; 91 and 89 under the domain condition. The distance stage: 943 with the rules against the gate's 940, 936 with the four repair lines.",
"The tree has moved since: batch 7R removed CAP's refusals, batch 7C lets the FortressLibrary api reach its overloading check on the count stage (10 to 75), batch N's rung I edited the checker's inference and its ambiguity check, and batch 6.5b's rung E its size refusal. The numbers above are predictions; this rung's own tables decide. The compiler tests that declare a generic overload, 43 files listed in explorations/reviews/mie-probes/scope/compiler-tests.txt, and batch 6.5's rung G's dispatch tests (DispatchRenamedArmRungG, DispatchSwappedArmRungG, DispatchZZ32ArmRungG, whose arms agree position by position by reading, and XXXDispatchMethodArmRungG) are the lists to run after the edit, their before the last landed gate's verdicts.",
"",
"**The test, first.** Each new test is written first, as a clean minimal program of the core problem its shape below names, not the probe's own file, and named by its topic with no rung letter, its messages in plain words; each that pins a defect is seen failing through the harness on the unchanged tree before the edit. In ProjectFortress/compiler_tests/: an expected-failure compile test on GenPlainRTR's shape and one on SubOvSwapTRun's shape, each an XXX-named .test file driving compile and pinned by compile_err_contains on the refusal the rung's rule reports; today each compiles, so the harness reports the wrong failure (FACTS.md, \"An XXX compile test pinned by compile_err_contains whose program compiles is reported as a wrong failure, not a missing one\"), and that run is its failure before the edit. A plain link and run pair on GenPlainSub's shape (a generic declaration beside a plain one, the compiled run printing circle, generic, circle) and on a pair of generic declarations that agree position by position, which must compile and run before and after. Defect 3's expected failure on GenBoundedFixU's shape, asserting what the specification says (it compiles, links and prints its answer), which today dies at run time with \"Unable to read serialized data\": two .test files over one component, a plain one driving link and an XXX one driving run (home 2; FACTS.md, \"The XXX expected-failure mechanism in compiler_tests/ and library_tests/ can express a compile-stage failure only, and a run-time defect needs two .test files\"). Row 492: XXXComprisesMeetCompiled.test's expected failure is its failure on the base; when the rung repairs the checker's half, it renames the pair without the prefix, the program unchanged and its .test file asserting that it compiles and runs and prints f(g) = 3. Under item 26 = (1): MeetViaExclusionNoV's shape as an expected-failure compile test pinned by \"Invalid overloading of f\", so that the control stays refused; and BetweenTwoClosed's shape with g typed G[\\ZZ32\\], compiled and run, printing the value of f(g) under the intersection typing, seen failing on the base, where the set is refused. And the proof addendum's acceptance pair, as written (explorations/reviews/comprises-type-level-proof-addendum.md, \"Concrete acceptance pair for rung C\"; no generic declaration and no coercion in either), each program's lines the addendum's and each .test file naming its component: CoverageReturnGood.fss as a plain test, its .test file driving compile, link and run with run_out_contains=PASS, the call choose(m) typed so that both left: LeftResult = result and right: RightResult = result hold (neither a return type chosen by sort order nor Any does), seen failing on the base, where the family is refused; the same program with its two broad declarations, choose(s: S) and choose(t: T), written in the other order, as a second plain test in a component named apart, so that the typing is shown not to depend on declaration order; if code generation stops either run, it takes the two-file form above instead, a plain link test that records the checker's verdict and an XXX run test that records the run's failure (home 2), the checker's result and the run's reported apart. CoverageReturnBad.fss as an expected-failure compile test, an XXX-named .test file over the component as written, pinned by compile_err_contains on the Return Type Rule's refusal of the covering declaration choose(v: V): LeftResult against choose(t: T): RightResult (the rule's message, OverloadingChecker.scala:531-533 on 3ec367f4d), not on \"Invalid overloading\": its covering declaration covers the overlap and its body keeps its own return type, so only the Return Type Rule refuses it, and coverage alone must not admit it; its run on the base, whatever refusals it shows there, quoted in the report. Under the record's fallback (the paragraph so named, above), CoverageReturnGood and its twin are gated as expected-failure compile tests pinned by today's refusal, for batch 8 to flip, and the rung says so. Under Q4 = (2): an expected-failure compile test on XXXGenericOverload2's shape and one on SkPosBox's and SkPosFixed's, each pinned by the positional rule's refusal. Under item 30 = (1): row 496's two programs, PlainBesideZZ32's shape (explorations/compile-ladder/rung-generic-runtime/probes/PlainBesideZZ32.fss) and PbgStatic's (explorations/reviews/plain-beside-generic-ways/probes/PbgStatic.fss, which asserts its two exact-type calls before the Any call dies), each in the two-file form above, a plain link and an XXX run asserting the generic declaration's answer (home 2); and, under Q4 = (1) as well, row 499's two programs, SkPosBox and SkPosFixed, in the same form, asserting box and fixed. Under the paper's instance rule (POSITIONS 2026-09-29, a type parameter that a call's arguments do not fix), three more, named by the rung:",
"- The shape where the paper's instance and the value's type differ (the problem's first piece of evidence, the recheck's section 1.6), in the two-file form: a plain link test, and an XXX run test asserting the instance the text gives (Box[\\Any\\], or the written bound), observed by a typecase on the result or a later dispatch on it, and seen failing on the base, whether the run answers the value's type or dies of row 496's crashes first (home 2, phase 5). Where the value fixes the parameter the program asserts nothing new: rows 496's and 499's pairs already cover that case.",
"- The paper's ArrayList/List set (POPL 2019, p. 11:13), with trait names of the program's own, since the library declares List and ArrayList, and a call on an ArrayList instance whose argument is below T, which the set's third declaration must answer: a plain test driving compile, link and run if the checker accepts the set on the base, else an XXX compile test pinned by compile_err_contains on its refusal, the program unchanged (the recheck's section 1.2). Either way it is run on the base and after.",
"- ProjectFortress/compiler_tests/XXXInferLoneBoundUnion rewritten and renamed by its new topic, the written bound, without the prefix, its .test file driving compile, link and run with run_out_contains=PASS: it asserts that pick[\\T extends Number\\](w, r) for a ZZ64 and an RR64 is a BoxT[\\Number\\], the written bound the text now gives and the checker already takes (row 516), its message saying so in plain words; the assertion that pinned the union goes. Beside it, one new expected failure for the unbounded case: pick0[\\T\\](w, r) passed where no expected type fixes T, as an argument of another generic call beside a BoxT[\\Any\\] (for instance same(pick0(w, r), a) with a: BoxT[\\Any\\] and same[\\T\\](x: BoxT[\\T\\], y: BoxT[\\T\\])), which the text accepts at Any and the checker refuses at the union today; an XXX compile test pinned by compile_err_contains on today's refusal, for batch 8's checker rung to flip. A variable declared BoxT[\\Any\\] would not test it, since that expected type fixes T already (inference.tex, the expected type). The pair lands only as a pair, and both are run on the base.",
"",
"**The measurements.** The checker count and the distance stage: the before is the last landed gate's tables and per-site list (the intro's rule; POSITIONS 2026-09-28, on rungs re-running measurements), the after the stages run once on this rung's tree, every newly refused library declaration named. After the edit only, their before the last landed gate's: the 85 files of explorations/compile-ladder/baseline-2026-09-19/pass-list.txt under the subset driver, phase and stdout, against the gate's ladder stage (explorations/compile-ladder/climb-batch-6.5b/gate/ladder/: all 85 at pass, with the baseline's output); the 43 generic-overload compiler tests, rung G's dispatch tests, rung N's and rung Z's sized tests (NatInferredChecker, NatWrittenChecker, NatMethodChecker, NatExportChecker, the NatRt* tests and the expected failures beside them), under item 26 = (1) rung I's tie tests (InferBetweenTie, InferNumeralTie, XXXInferAmbiguousCoercion, XXXInferSigmaTie), and under the paper's instance rule batch N's inference tests beside the new ones (XXXInferUnionCoercedArg, XXXInferUnionInstanceArg, XXXInferResultOnlyAny, XXXInferResultOnlyCoerced), the checker's verdict and the run's apart. Row 491's two programs, compiled, before and after.",
"",
"**Files it may touch.** ProjectFortress/src/com/sun/fortress/scala_src/ (the checker files the fixes need, each named in the report: OverloadingOracle.scala and OverloadingChecker.scala by P1's measurement; under item 26 = (1) scala_src/types/TypeAnalyzer.scala only for a coverage helper that the overloading check alone calls, beside the clause and exclusion helpers it reuses, with subtype, meet, equivalent, normConjunct and the normalizer unchanged, and scala_src/typechecker/impls/Functionals.scala for the typing at rung I's ambiguity check); new files under ProjectFortress/compiler_tests/, the rename of XXXComprisesMeetCompiled if row 492 is repaired, and under the paper's instance rule the rewrite and rename of XXXInferLoneBoundUnion (.fss and .test); its own directory. Stops: ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java (the checker-count tool keeps a copy checked against its checksum, explorations/coordinator/tools/checker-count/run.sh, and an edit makes the stage's #shadow row stale, which is red); Library/, ProjectFortress/LibraryBuiltin/, interpreter/ and Specification/.",
"",
"**Java or Scala.** Scala. ant compileAll, then the library-order cache rebuild before any compiled test.",
"",
"**The checker count.** Predicted CHECKER_BASE plus 2 by P1: the cond pairs, which rung L's api line removes on the merged tree; plus 4 under Q4 = (2), the value-form factories' two api pairs among them, which L repairs. Row 492's repair leaves it unchanged by reading, since the library declares no such diamond (the item 26 judgement, section 4). The before is the last landed gate's table; the rung runs the stage once after the edit, into tmp/rung-return-type-rule/, and declares the total it measured; a change of the crash row is declared.",
"",
"**What must stay green, or keep its verdict.** Every compiler test, rung G's among them; a verdict that changes is reported with its reason and is a stop unless it is one of the rung's own tests, XXXComprisesMeetCompiled, renamed with row 492 closed, or XXXInferLoneBoundUnion, rewritten to the bound under the paper's instance rule.",
"",
"**Stops.** The stop files above. A library declaration newly refused other than the cond pair and, under Q4 = (2), the value-form factories, whose repairs are rung L's. A test whose verdict changes other than by this rung's intent (its own tests, row 492's and XXXInferLoneBoundUnion's). A checker change for the paper's ArrayList/List set or for the instance rule: the first is a reduction beyond answer 9's, the second phase 5's and batch 8's. Under item 26 = (1): SkBetweenAssign's compiled verdict changing, or BetweenTwoClosed's other than as the intersection typing gives; CoverageReturnBad accepted, or CoverageReturnGood's verdict differing between its two declaration orders; a verdict of rung I's tie tests changing; an edit to TypeHierarchyChecker.scala, or a change to the verdicts of the checker's shared subtyping, meet, equivalence or normalizer, which is the fallback's condition, reported with its consequences and not made; the intersection typing extended to a generic overload that needs run-time instantiation, on the strength of the appendix proof, which is the fallback's condition too (Astra's boundary). A stack overflow in the meet search. A ladder file moving down. A walk edit. A rule beyond the paper's three and the positional rule, such as option 2's step; under Q4 = (1), the domain condition. Not a stop: an output difference that the untouched tree already shows from run to run, with the test's verdict unchanged; it is a ledger row (POSITIONS 2026-09-26, rung D's stop).",
"",
"**For the skeptic.** The differential is walk against the compiled run on the probe shapes: GenPlainRTR and the reordering override are refused by walk at load or binding and now by the checker; GenPlainSub still compiles and prints circle, generic, circle, as walk will once rung W lands; a generic override that keeps its list (the library's map[\\R\\], ivmap[\\R\\], replica[\\U\\]) and rung G's renamed and swapped arms are still accepted. Each newly refused library declaration against P1's list. The positional rule against its statement in rung S's section and against Q4's answer. Row 492's repair against the specification's example and against row 491's two programs. Under item 26 = (1): the coverage check against the addendum's Cover-Meet (every overlapping pair of incomparable domains, each covering domain strictly below both, the whole overlap covered, an unsettled case refused, the recursion bounded by cycle detection) and against MeetViaExclusionNoV; the diff, showing subtype, meet, equivalent, normConjunct and the normalizer unchanged and no caller of the coverage query outside the overloading check; the intersection typing reaching the call's type and the expected-type checks, in both declaration orders; CoverageReturnBad refused on the Return Type Rule; a tie that involves a coercion still under batch N's rule, rung I's tie tests keeping their verdicts; row 487 named as the open assumption, not claimed repaired; Astra's boundary kept: the intersection typing applied to ground declarations and to generic argument types already instantiated, such as G[\\ZZ32\\], and not generalized to generic overloads that need run-time instantiation, or else the fallback taken. Under the paper's instance rule: the expected-failure pair's program against the recheck's section 1.6, its asserted instance the one the text gives and not the value's type, and its failure on the base; the ArrayList/List set against the paper's p. 11:13 and its verdict on the base; XXXInferLoneBoundUnion's rewrite asserting only the written bound, which the checker already takes, and the unbounded expected failure refused today at the union and asserting the bound, placed where no expected type fixes the parameter; no checker source changed for any of the three. The prelude compiling in library order.",
"",
"**What comes back to Pavol.** The two refusals' messages; any library declaration newly refused; any compiled test or ladder file that moved; row 492's outcome, with the acceptance pair's and, if the rung met the fallback's condition, what broader repair it would have needed; under Q4 = (1), row 499's two programs, still accepted, with their expected failures, and what the checker on this rung's tree, rung I's ambiguity check in its base, does with the written instantiation g = f[\\A, B\\] of ProjectFortress/tests/XXXGenericOverload2.fss, the two declarations instantiated by position into domains neither of which is below the other: evidence for the domain-condition question of section 1, reported and not repaired. Under the paper's instance rule: the pair's failure on the compiled path; whether the checker accepts the paper's ArrayList/List set; the lone-parameter tests' verdicts.",
"",
"**What it closes.** Row 398 (fixed). Rows it opens: defect 2, the return-type rule checking one solved instance (home 1, the rung's test); defect 3, code generation for two generic declarations on a bare type variable (home 2, the two .test files; no row holds it at 6016fac3f, as the conversion judgement's section 7 asked the coordinator to check). Row 492, fixed with rung W's half when both land; if one lands alone, a note, and the other half's expected failure stays. A note on row 492's wording: the checker already finds a meet through a clause when an exclusion prunes it (MeetViaExclusion); walk does not; the example is the shape neither reached. Under item 26 = (1), row 491 closes with rung S's text. Under Q4 = (2), row 499 (fixed); under Q4 = (1), a note on row 499 that the positional rule as the judgement words it accepts both its programs, so the row stays open, in home 2 under item 30 = (1) with the two expected failures. Under item 30 = (1), row 496 moves from home 3 to home 2, gated by its two expected failures, with the note on the unread annotation. Under the paper's instance rule: a row it opens, the compiled dispatcher instantiating a generic declaration reached only at run time at the value's type where the text gives the bound under the call's static return type, which it does not receive (home 2, the pair; phase 5), which rung S's callout cites; a row it opens if the checker refuses the paper's ArrayList/List set (home 2, its expected failure), else a note on the plain test; a note on row 516, that XXXInferLoneBoundUnion now tests the written bound under its new name and the new expected failure pins the unbounded case on the compiled path, for batch 8.",
"",
"**Your briefing, entry by entry.** Step 1's command prints these entries in this order. Each line names an entry, then says why it is there and what you do with it; read the line before the entry and act on it.",
"- positions:2026-09-26 answer 9: The two changes this rung builds, the return-type rule over every instance and the positional rule, and no third.",
"- positions:2026-09-28 two decisions of Fable's judgement: Batch N's rule for conversions, which your rules must not contradict, and your one item from it: defect 3's expected-failure test.",
"- positions:2026-09-24 exclusion route P's fork: Route A: the checker keeps instantiation exclusion; your rules read exclusion through it and change nothing of it.",
"- positions:2026-09-26 second batch-5 answer: Every static argument except an operator argument counts; your rules treat a size as they treat a type parameter.",
"- positions:2026-09-26 answer 12: Decision 3 in overload sets, a size the call cannot fix refused at the call; your rules keep that refusal.",
"- positions:2026-09-28 comprises clause row 459: Batch 7C's checker reading of a clause; row 492's coverage check sits beside it, local to overload checking.",
"- positions:2026-09-29 PLAN item 26: Item 26 decided: option 1 with the proof addendum's three points; row 492's checker half, the typing of the call between and the acceptance pair rest on it.",
"- positions:2026-09-29 PLAN item 30: Item 30 decided: option 1 of its judgement, the generic declaration runs; row 496's expected-failure pairs rest on it.",
"- positions:2026-09-29 type parameter arguments do not fix: The paper's instance rule: your expected-failure pair where the paper's instance and the value's type differ, the ArrayList/List set and the lone-parameter tests rest on it; no checker change for it.",
"- positions:2026-09-21 library route: No declaration goes into the compiler's prelude; a library declaration your rules refuse is repaired in the library, by rung L.",
"- positions:2026-09-26 answer 11: The count is reported and never red on its own; declare the total you measure.",
"- positions:2026-09-27 stops a batch record reserves: Every stop reserved for Pavol is reversible: finish, list it in stopsMet with liftedBy citing this entry, and land.",
"- positions:2026-09-26 rung D's stop: An output the untouched tree already varies from run to run, its verdict unchanged, is a ledger row and not a stop.",
"- positions:2026-09-28 rungs re-running measurements: The rule for your count and distance tables: the last landed gate's tables are your before, not a run of the stage on your unchanged base; run only the after, into tmp/.",
"- ledger:398: The permuted override you refuse; closed by your test.",
"- ledger:492: Both paths refuse the Meet Rule's example; the checker's half, at validOverloading, is yours under item 26's decision, by a coverage check local to overload checking.",
"- ledger:491: The passages and programs of item 26; under its decision BetweenTwoClosed is typed by the intersection rule and SkBetweenAssign stays refused.",
"- ledger:487: The closure the coverage argument assumes, unenforced across components; not yours to repair: leave TypeHierarchyChecker.scala alone and claim no more than your tests show.",
"- ledger:499: Rung G's positional dispatch; under Q4 = (1), answer 9's rule, both pairs return String and stay accepted, so you write its two expected failures (box, fixed) and move the row to home 2.",
"- ledger:495: Generic dotted methods keep rung G's dispatch defects; legal programs your rules must keep accepting.",
"- ledger:496: A generic beside a plain declaration at run time; under item 30's decision you write its two expected-failure pairs, the repair staying in phase 5.",
"- ledger:494: The ZZ32 spelled two ways at run time, one of row 496's two crashes; the remainder your expected failure pins.",
"- ledger:516: The lone type parameter: you turn its compiled test into a test of the written bound, and pin the unbounded case, the union where the text now gives Any, as a new expected failure.",
"- doc:explorations/reviews/overloading-judgement.md#3.5 What the checker enforces: The recommendation's account of the two rules; one way to build the first, among the ways you list.",
"- doc:explorations/reviews/overloading-judgement.md#3.7 The four defects: Defects 2 and 3, their homes and tests; you open both rows.",
"- doc:explorations/reviews/overloading-judgement.md#8. Where this differs from the workers and from the S2 judgement: Why the paper accepts the permuted override and the positional rule refuses it.",
"- doc:explorations/compile-ladder/plan-7b/probes/P1.md#The answers: What your two rules refuse on the landed library, measured by shadow: the cond pairs, and nothing else under Q4 = (1).",
"- doc:explorations/compile-ladder/plan-7b/probes/P1.md#2. The shadow: The shadow's three return-type verdicts and the positional check; evidence of one working way, not your design.",
"- doc:explorations/compile-ladder/plan-7b/probes/P1.md#3. The probe shapes, on the compiled path: Why the paper's theorem as the team coded it cannot be your rule: it refuses the prelude's own nest overloads.",
"- doc:explorations/compile-ladder/plan-7b/probes/P1.md#4. The landed library: The cond pairs, the positional rule's three refusals that today's rule already makes, and the domain condition's five factory pairs.",
"- doc:explorations/reviews/overload-static-params-ways.md#2.2 The probes: The probe shapes and captures your tests restate.",
"- doc:explorations/reviews/overload-static-params-ways.md#2.3 Defects found (not the question, but on its path): Defects 1 to 4 as measured; 2 and 3 are yours to open.",
"- doc:explorations/reviews/conversion-overloading-judgement.md#7. The findings that stand under every way: Defect 3 stays on phase 5's list, and your test is its gated home.",
"- doc:explorations/reviews/option-2-soundness.md#4. Answer 9's rules: How the conversion rule reads answer 9's rules; your rules keep its measured shapes type-safe.",
"- doc:explorations/compile-ladder/rung-generic-runtime/REPORT.md#9. The dispatch change's reach and its remainder: What rung G's dispatcher reads by position; the programs row 499 names.",
"- doc:explorations/reviews/batch-7C-review.md#Findings@Row 492's repair is in batch 7b's files: Why row 492's checker half is yours and what its expected-failure test means.",
"- doc:explorations/reviews/comprises-type-level-judgement.md#2. What was checked, and what was measured: The measurement that the checker already finds a meet through a clause, and the call that sits between; the ground of your row 492 work.",
"- doc:explorations/reviews/comprises-type-level-judgement.md#6. The two paths: Row 492's repair and the in-between call's typing, as item 26's decision requires of you, read with the proof addendum; the device is yours.",
"- doc:explorations/reviews/comprises-type-level-proof-addendum.md#Source and scope: The proof's scope, ground declarations applicable without coercion; your typing is sound inside it, and coercion ties stay under batch N's rule.",
"- doc:explorations/reviews/comprises-type-level-proof-addendum.md#One replacement premise: Cover-Meet, what your coverage check establishes before it accepts an overlap: every incomparable overlapping pair covered by declarations strictly below both.",
"- doc:explorations/reviews/comprises-type-level-proof-addendum.md#Replacement lemmas and theorem: Why the call between is typed by the intersection of its candidates' return types, and why the Return Type Rule is its premise, not something it repairs.",
"- doc:explorations/reviews/comprises-type-level-proof-addendum.md#Application to the existing brief: What the addendum asks of C: Cover-Meet with applicability and strict refinement, coercion ties apart, the Return Type Rule a premise; your checks.",
"- doc:explorations/reviews/comprises-type-level-proof-addendum.md#Review of the 7b briefing, at the same base: The normalizer boundary, what the coverage search assumes, coercion and the fallback: keep the check local, bound it by cycle detection, refuse what it cannot settle.",
"- doc:explorations/reviews/comprises-type-level-proof-addendum.md#Concrete acceptance pair for rung C: Astra's two programs, your tests as written: the good one in both declaration orders, the bad one refused on the Return Type Rule.",
"- doc:explorations/reviews/comprises-type-level-ways.md#For batch 7b's record: OwnClauseBetween, the shape with two minimal candidates your repair meets.",
"- doc:explorations/reviews/plain-beside-generic-judgement.md#6. Where it lands, and what it costs: Row 496's two expected-failure pairs and the unread annotation, under item 30's decision.",
"- doc:explorations/reviews/decisions-review/popl-recheck.md#1.2 Answer 9: The paper's ArrayList/List set and its existential reduction; your test of it, plain or an expected failure as the checker answers on the base, and no checker change.",
"- doc:explorations/reviews/decisions-review/popl-recheck.md#1.6 Item 30: Where the paper's instance and the value's type differ, the Box shape your expected-failure pair asserts, and where they agree.",
"- doc:explorations/reviews/decisions-review/popl-recheck.md#1.9 Row 516: The union replaced by the bound; your rewrite of the lone-parameter test and its unbounded expected failure, for batch 8's checker rung to flip.",
"- doc:ProjectFortress/compiler_tests/XXXInferLoneBoundUnion.fss: The compiled test that pins the union; you rewrite it to the written bound and rename it, and move the unbounded case into an expected failure of its own.",
"- doc:explorations/compile-ladder/rung-spec-comprises/probes/between/MeetExample.txt: Both paths' refusal of the Meet Rule's example; what row 492's test shows failing on the base.",
"- doc:Specification/advanced/overloading.tex#Overloaded Functional Declarations: The rules the checker enforces, in the specification's words; the Meet Rule's example is in it.",
"- doc:Papers/Types/rules.tick#Overloading Rules: The paper's three rules, the standard your return-type rule is checked against.",
"- doc:Papers/Types/overloading-check.tick#Mechanically Checking the Rules: The paper's special arrow and theorem for the return-type rule over every instance.",
"- code:ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala#def satisfiesReturnTypeRule(f: Functional..def excludes(f: Functional: Today's return-type rule, one solved instance, and the team's commented-out paper versions below it; where your first rule goes.",
"- code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala#private def validOverloading(first..private def meetRule(first: The pairwise check whose refusal row 492 meets, and the meet rule beside it.",
"- code:ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala#protected def normConjunct: The normalizer's one-clause case of your coverage expansion, team code shared by subtype, meet and equivalent: reuse its helpers, never widen it.",
"- code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala#val top = candidates.filter..private def signalAmbiguity(: Rung I's ambiguity check, where you type the call between by the intersection; its numeral tie, same-types tie and coercion ambiguity keep their own rules.",
"- The compiled checker does not enforce the specification's sentence that overloads may not differ: What the checker does with differing static parameters today.",
"- The checker's return-type rule lets the more specific declaration choose its own instantiation: Row 398's mechanism, which your positional rule closes.",
"- The return-type rule now reads a size as it reads a type parameter: How rung N keeps a size quantified; the precedent your first rule generalises.",
"- The compiled type checker checks nat and int static parameters: Sizes in the checker; your rules must keep every sized test's verdict.",
"- The compiled checker refuses a call whose most specific arm has a size the call cannot fix: Batch 6's rung R's refusal; keep it.",
"- The hidden layer, classified: The classes of the api's overloading errors; name every row your rules move by class.",
"- The compiled checker reads a comprises clause as the 2012 texts do: Batch 7C's rule beside row 492's repair.",
"- A generic arm of a template dispatcher is called at the dispatcher's own static parameters: Rung G's run-time reading, which answers row 499's two programs against the text; the defect your expected failures pin for phase 5.",
"- The XXX expected-failure mechanism in compiler_tests/ and library_tests/: How your expected failures are written: a compile-stage failure alone, and a run-time defect in two test files.",
"- A thrown CompilerError takes a third path through the test harness: The check stream a checker crash takes, if one of your tests meets it.",
"- An XXX compile test pinned by compile_err_contains whose program compiles is reported as a wrong failure: What your two refusal tests report on the base; that run is their failure before the edit.",
"- ant compileAll deletes a tracked file: Restore default_repository/caches/global.map after every ant compileAll.",
"- The true distance to the switch-over: The distance stage your rules move; read it by class.",
"- map:compile-path-walkthrough.md#How it differs from the interpreter's run-time dispatch: Where the checker's choice and walk's dispatch part; your rules act on the checker's side.",
"- map:modules-and-phases.md#B.7 Overloading: The overloading phase and its files.",
"- map:README.md#Touch this@scala_src/typechecker/: What a checker edit moves and what guards it.",
"- index:overloading: The notes on file on overloading; open those your rules touch.",
"",
].join('\n')

const W_TAIL = [
"",
"## Your rung: W - walk's choice of declaration",
"",
"SLUG is rung-walk-dispatch. WORKTREE is /home/user/fortress-dispatch, branch wip/rung-walk-dispatch.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-7.md, section 3, under \"W. Walk's choice of declaration\"), carried below word for word, and after it your briefing entry by entry, each with why it is there; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record, and the questions its answers line names are in section 1; read them there.",
"",
"**The answers this rung follows.** Q4 = (1), answer 9's rule; item 16: decided by Pavol on 2026-09-29 and closed, walk's run-time choice of coercions accepted as the interpreter's limit, recorded by rung S's callout and gated by XXXCoercionStaticRungC and XXXCoercionStaticNarrowRungC (POSITIONS 2026-09-29, walk's run-time choice of coercions), not carried by this rung; its second point, row 395, as the decisions below say; item 26 = (1), decided by Pavol on 2026-09-29 with the three points of Astra's proof addendum built into this batch's briefs (POSITIONS 2026-09-29, PLAN item 26); item 30 = (1), decided by Pavol on 2026-09-29, its judgement's option 1 (POSITIONS 2026-09-29, PLAN item 30), at the instance the paper's rule gives; the paper's instance rule, decided by Pavol on 2026-09-29 (POSITIONS 2026-09-29, a type parameter that a call's arguments do not fix), which asks of this rung only its test of a lone type parameter (the decisions, below). (Section 1 of the record gives each question and its options. Text marked \"under Q4 = (2)\", \"under item 26 = (1)\" or \"under item 30 = (1)\" applies only while the coordinator has written that answer here.)",
"",
"**The problem.** Under walk, the choice between a generic declaration and a plain one depends on the order they were written. bestMatchInternal (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java) instantiates each generic declaration at the arguments' types (through EvaluatorBase.inferAndInstantiateGenericFunction) and keeps a candidate only when its domain is strictly more specific than the best so far, so an instance whose domain equals a plain declaration's loses to whichever came first. The probe GenPlainSub, describe[\\T extends Shape\\](x: T) beside describe(x: Circle), prints generic three times under walk where the compiled run prints circle, generic, circle, and walk prints the compiled answer when the plain declaration is written first (explorations/reviews/overload-static-params-ways.md sections 2.2 and 2.3, defect 1; capture GenPlainSub.txt). This is the reading of a generic declaration as its instances, which the Types paper rejects (Papers/Types/introduction.tick:171-251). Batch N's rung K edited bestMatchWithCoercion in the same file and re-instantiates the chosen generic declaration by answer 8's promotion before it is applied; read the file on the base. Beside it, measured and routed here:",
"- The load-time check (finishInitializingSecondPart) refuses sets the checker accepts. Two are the shapes of the conversion decision: op[\\T extends Number\\](a: T, b: T) beside op(a: ZZ64, b: ZZ64) (explorations/reviews/option-2-soundness/O2Z64.fss, refused under walk today, captures/O2Z64.walk-*.txt), and the same generic beside op(ZZ32, Any) with its meet op(ZZ32, Number) (O2Meet.fss). The third is the Meet Rule's own example, which walk flags as \"unrelated ... no excluding pair\" before it looks for a meet (row 492; its expected failure ProjectFortress/tests/XXXComprisesMeetWalk.fss).",
"- Row 478: walk caches a generic declaration's symbolic static arguments keyed by its name and its static parameter list, compared by name alone (FGenericFunction.getSymbolic, GenericFunctionOrMethod.GenericComparer, and GenericConstructor), so two overloads whose static parameters share a name read one another's bound, and whether the set loads depends on the parameter's name and the declarations' order (the row's four probes, explorations/compile-ladder/rung-ranges-zz32/probes/rangeoperators/Bound*.fss with their captures).",
"- Row 157: walk silently drops a generic declaration declared to return Any. EvaluatorBase.java runs MakeInferenceSpecific on the declared return type when it instantiates a generic declaration (:465-467); the visitor has cases for TraitType, VarType, ArrayType, ArrowType, MatrixType and TupleType and a defaultCase that raises a bug (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/MakeInferenceSpecific.java:51-53, :66-122); bestMatchInternal catches every FortressException as \"No match, means no dice\". So PbgLone, the generic peek[\\X\\](t: Tag[\\X\\]): Any alone, dies under walk with \"Missing visitor for class com.sun.fortress.nodes.AnyType\", and beside a plain declaration the generic one is dropped: that is walk's one \"plain\" answer for rung G's PlainBesideZZ32, while PbgRetObject, the same pair returning Object, runs the generic declaration on both paths (explorations/reviews/plain-beside-generic-ways/captures/both-paths.txt, ret-object.txt; explorations/reviews/plain-beside-generic-judgement.md section 2, claim 3).",
"- Row 159: walk refuses two generic declarations unless some parameter pair excludes, so it refuses the renamed and swapped arms that rung G's compiled tests declare (ProjectFortress/compiler_tests/DispatchRenamedArmRungG.fss, DispatchSwappedArmRungG.fss), which the specification allows and the compiled run answers since rung G (explorations/compile-ladder/rung-generic-runtime/REPORT.md section 10). Their gated walk tests are written: batch 6.5's judge added ProjectFortress/tests/XXXDispatchRenamedArmWalkRungG.fss and XXXDispatchSwappedArmWalkRungG.fss, expected failures that assert the compiled answers, each seen failing under the harness beside a control whose two arms share one parameter name (explorations/compile-ladder/climb-batch-6.5/judge-repair/walk-dispatch-xxx.txt); this rung promotes them (PLAN.md's parked line on row 159).",
"",
"**The decisions.** Answer 9 (explorations/coordinator/POSITIONS.md, 2026-09-26, answer 9): \"Walk dispatches by declared domains, which ends its dependence on declaration order.\" The recommendation: walk compares a generic declaration with another on their declared, quantified domains, not on the instance made from the arguments, in bestMatchInternal and its load check (explorations/reviews/overloading-judgement.md section 3.5, last item; section 3.7, defect 1); walk keeps its load-time check. The decision on conversions and overloading (POSITIONS 2026-09-28, the two decisions of Fable's judgement, decision 1; explorations/reviews/conversion-overloading-judgement.md sections 3 and 5): walk compares on declared domains; hands the chosen generic declaration to rung K's inference, which instantiates it by the promotion from the arguments' run-time types (where a static type is wider than its value, the compiled path runs the same generic body at another instance, row 509); dispatches the converted call again, so that O2Z64's op(z, w) reaches op(ZZ64, ZZ64); and lifts the load check for the sets the checker accepts, O2Z64's and O2Meet's. For pairs of two generic declarations the load check stays as it is, because read on declared domains without the domain condition it accepts the team's ProjectFortress/tests/XXXGenericOverload2.fss (\"Should not compile\"), whose verdict would flip (probe P4). Under Q4 = (2) the rung may instead read such pairs by the positional rule with the domain condition, if the library still loads under walk on its base and its tests keep every verdict; else it keeps today's check and says why. Row 478: the cache key gains the bounds (the row's note; explorations/reviews/batch-7R-conformance.md finding 6); the excludes clause of Range that the row's note puts into the api is rung L's. Row 159's pairs: their two expected-failure walk tests are promoted here if the change makes walk accept the pairs. Row 492's walk half is this rung's by PLAN.md's routing, and under item 26 = (1) a requirement of Pavol's decision (explorations/reviews/comprises-type-level-judgement.md section 6; the proof addendum, explorations/reviews/comprises-type-level-proof-addendum.md, \"Application to the existing brief\" and \"Rung size and the existing fallback\"): in the load check, a pair of single parameters that are neither subtypes nor exclusive is not \"unrelated\" when declarations in the set cover their meet, the meet read through the comprises clauses (FType.meet and FTypeTuple.meet in ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/, today equality and subtyping only). The load check keeps rung C's coverage contract: the covering declarations each have a domain strictly below both, and together they hold every value of the overlap, so the check looks for a covering family, not for one declaration that handles part of the overlap; every such pair of the set is checked, the covering declarations' own pairs among them; a case the clauses do not settle stays refused. Row 492's half adds no dispatch rule: walk chooses by the values' run-time types, which are object types, and the covering declaration is the most specific. Walk's runtime selection implements the ordered candidate family the proof applies to: of the declarations applicable to the values, ordered by their declared domains, equivalent domains taken as one, it runs the one whose domain is below every other's, and where the set has such a declaration, which the load check's coverage and closed clauses guarantee, the answer does not depend on the order the declarations were written in; that is what this rung's comparison on declared domains builds for defect 1, since bestMatchInternal today compares a generic declaration's instance, not its declared domain. Dispatch neither repairs a closure the checker leaves unenforced nor proves coverage: a value outside every listed type of a closed trait (row 487, a type declared in another component) is the case the proof does not cover, and this rung does not repair it. SkBetweenAssign (explorations/compile-ladder/rung-spec-comprises/probes/skeptic/SkBetweenAssign.fss) keeps its walk verdict (it runs today); BetweenTwoClosed, which walk refuses today by row 492's own mechanism, runs after the repair, since every value of its G is a V, and that change is reported with its cause, not a stop. Under the record's fallback (section 1, item 26), taken when rung C's half needs broader subtype or closure repairs, this half lands on its own if its tests pass, by the rule for one half (section 4); if it is this half that needs more than the load check's clause-reading meet (walk's subtyping changed beyond it, or closure enforced at load), the rung keeps XXXComprisesMeetWalk.fss as the expected failure and says why. Item 16 is decided and closed (POSITIONS 2026-09-29, walk's run-time choice of coercions; PLAN R7): walk's choice of a coercion on the value, where the text resolves it on the static type, is accepted as the interpreter's limit, recorded by rung S's callout and gated by ProjectFortress/tests/XXXCoercionStaticRungC.fss and XXXCoercionStaticNarrowRungC.fss, and walk is made to match after the switch-over, not in this rung; the rung keeps both tests' verdicts. Its second point, the tuple bindings batch 4's rung C's judge chose to convert (row 395), stays as landed: the rung keeps its tests' verdicts and reports whether its change moves them. Item 30 = (1) (explorations/reviews/plain-beside-generic-judgement.md sections 4 and 6), with the paper's instance rule (POSITIONS 2026-09-29, a type parameter that a call's arguments do not fix): walk runs the most specific declaration applicable to the values, which its choice on declared domains gives, instantiated from the values' run-time types as rung K's inference instantiates it. Where the value fixes the parameter at an invariant position, as in every shape of this rung, that is the instance the text gives; elsewhere it is the value's type, where the text gives the parameter's bound under the call's static return type, and walk, having no static types, has no static return type to bound it: that is walk's limit, which rung S's callout records, as it records walk's choice of coercions (item 16). The rule asks nothing more of this rung: row 157's fix stays walk's best, and no test of this rung asserts an instance the value does not fix. And a forAnyType case in MakeInferenceSpecific.java, a no-op like forTraitType since Any holds no type variable to make specific, lets walk instantiate a generic declaration declared to return Any, which closes row 157, about 5 Java lines. The catch in bestMatchInternal is not touched: narrowing it is unmeasured and the measured shape does not need it. After the rung, walk runs the generic declaration for both of rung G's PlainBesideZZ32 and PlainBesideRet (explorations/compile-ladder/rung-generic-runtime/probes/), by reading, and the rung reports both before and after. Instantiation still happens for the declaration chosen. Under the paper's instance rule, one test changes here, because it sits in ProjectFortress/tests/, among this rung's paths, and runs only under walk: ProjectFortress/tests/XXXInferLoneUnionWalk.fss asserts that an unbounded lone type parameter at a ZZ64 and an RR64 is not instantiated at Number, citing the union sentence rung S replaces (row 516); it is rewritten as a plain test of the written bound, which walk already takes (the arguments' common supertype within the bound, Number for pickU[\\T extends Number\\](l, r)), and the unbounded case keeps an expected failure of its own, asserting the BoxU[\\Any\\] the text now gives where walk binds Number (the rule of 2026-09-19 for a deferred defect the text settles; POSITIONS 2026-09-19, the six process decisions), for the later walk rung that takes walk's lone-parameter candidates to the bound. No interpreter source changes for it. If this rung does not land, XXXInferLoneUnionWalk.fss keeps its verdict, its assertion holding under the bound as under the union, and only its message is stale; the gather rewords its message (section 4). Not this rung's: how walk infers a generic declaration's static arguments (rung K's, batch N), walk's erasure of an unwritten static argument to Bottom (row 424, a later walk rung), and whether walk follows decision 3 for an unused unknown size (waits for E3).",
"",
"**The evidence on file.** Probe P4 (explorations/compile-ladder/plan-7b/probes/P4.md), a logging shadow of OverloadedFunction that computes the choice on declared domains beside today's at every call and the load verdict beside today's at every set, measured on the library and interpreter of batch 7's first run over the 422 interpreter tests, the 62 demos and the two microGPT checks: no call in the corpus chooses a different declaration but the defect's own shape; every output the same as probe K's stock passes (402 the same, 3 the same once masked, 17 unstable between K's two passes); two load verdicts change, XXXGenericOverload2 (accepted on declared domains) and one pair of XXXGenericOverload3 (whose file stays refused at load); both microGPT checks 40 of 40, every value identical. A generic trait's functional methods are instantiated from their self argument and compared as today (P4 section 1). The tree has moved since, by batch N's rung K in this file and by the numeral switch; this rung's tests and the gate's suites decide. Probe K's measurement of walk's inference rule (explorations/compile-ladder/plan-n/probe-k/PROBE-K.md). The conversion judgement's shapes and their captures (explorations/reviews/option-2-soundness/).",
"",
"**The test, first.** New files in ProjectFortress/tests/, in the form of ProjectFortress/tests/roundBug.fss (a component exporting Executable whose run() asserts), each written first as a clean minimal program of the core problem its shape below names, not the probe's own file, named by its topic with no rung letter, its messages in plain words, and each that pins a defect seen failing through the harness on the unchanged tree before the edit:",
"- GenPlainSub's shape twice, the plain declaration written first and written second, each asserting circle, generic, circle (defect 1).",
"- O2Z64's and O2Meet's shapes, asserting the answers the conversion judgement gives (op plain64 for op(z, w) in O2Z64; the meet declaration for op(z, w) in O2Meet), refused at load on the base.",
"- Row 478's refused probe, BoundBoundedFirstSameName's shape, asserting the answers its three siblings print (integer pair, string pair, triple).",
"- Row 159's renamed and swapped pairs: batch 6.5's two expected-failure walk tests, ProjectFortress/tests/XXXDispatchRenamedArmWalkRungG.fss and XXXDispatchSwappedArmWalkRungG.fss, which assert the compiled answers and fail on the base, as expected failures. If this rung's change makes walk accept the pairs, each is renamed by its topic, without the prefix and the rung letter (DispatchRenamedArmWalk.fss, DispatchSwappedArmWalk.fss), its component with it, no assertion changed; else both stay, with the reason.",
"- Under item 30 = (1), row 157: PbgRetObject's shape with Any kept (the scope note's MieDispatchAny peek, explorations/reviews/mie-probes/scope-call-site-dispatch.md section 2), asserting the generic declaration's answer, and PbgLone's shape, the generic declaration alone, asserting that it runs (explorations/reviews/plain-beside-generic-ways/probes/).",
"- Under the paper's instance rule, row 516's walk half: XXXInferLoneUnionWalk.fss rewritten and renamed by its new topic, the written bound, without the prefix, its component with it, asserting that pickU[\\T extends Number\\](l, r) for a ZZ64 and an RR64 is a BoxU[\\Number\\], the written bound, its message saying so in plain words; it passes on the base, and its assertion that pinned the union goes. Beside it, one new expected failure, pickU[\\T\\](l, r) unbounded asserting BoxU[\\Any\\], seen failing on the base, where walk answers BoxU[\\Number\\].",
"Row 492's walk half: ProjectFortress/tests/XXXComprisesMeetWalk.fss is its failure on the base; when the rung repairs it, the file is renamed without the prefix, no assertion changed, and asserts f(g) = 3. Under item 26 = (1), MeetViaExclusion's shape (explorations/reviews/comprises-type-level-judgement/probes/MeetViaExclusion.fss) as a gated walk test, refused at load today and PASS after. A file in that directory needs no .test file (FACTS.md, \"An XXX*.fss in the interpreter corpus IS a gated expected-failure test\").",
"",
"**Files it may touch.** ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java, FGenericFunction.java, GenericFunctionOrMethod.java and GenericConstructor.java beside it, under item 30 = (1) ProjectFortress/src/com/sun/fortress/interpreter/evaluator/MakeInferenceSpecific.java, under item 26 = (1) interpreter/evaluator/types/FType.java and FTypeTuple.java, and what else under ProjectFortress/src/com/sun/fortress/interpreter/ the change needs, each named, except interpreter/glue/prim/; bestMatchWithCoercion and EvaluatorBase.inferAndInstantiateGenericFunction, rung K's, only as the four items need, each change reported; the new tests; the rename of XXXComprisesMeetWalk.fss if row 492 is repaired, and of XXXDispatchRenamedArmWalkRungG.fss and XXXDispatchSwappedArmWalkRungG.fss if row 159's pairs are fixed; under the paper's instance rule, the rewrite and rename of XXXInferLoneUnionWalk.fss; its own directory.",
"",
"**Java or Scala.** Java. ant compileAll before the test can pass, and default_repository/caches/global.map restored after it (FACTS.md, \"ant compileAll deletes a tracked file\"). The interpreter's caches are wiped before every run.",
"",
"**The checker count.** Unchanged and not run: the stage reads neither the interpreter nor the tests (the script's stage-blind rule).",
"",
"**What must stay green, or keep its verdict.** Every interpreter test's verdict, XXXGenericOverload2, XXXGenericOverload3, XXXCoercionStaticRungC and XXXCoercionStaticNarrowRungC (item 16's record), XXXCoercionAnyOverloadRungC and row 395's tests among them, except the rung's own, row 492's renamed test, row 159's two promoted tests and XXXInferLoneUnionWalk.fss, rewritten to the bound; the library loads under walk.",
"",
"**Stops.** A test whose verdict changes other than by this rung's intent. A generic declaration's inference changed beyond what the comparison on declared domains, rung K's hand-over and, under item 30 = (1), row 157's AnyType case need. An overload set of the library or of a test that walk loads today and refuses after; one it refuses today and loads after, other than O2Z64's, O2Meet's, row 478's, row 159's and row 492's shapes. SkBetweenAssign's walk verdict changing. A library, test or specification edit beyond the new tests, the renames and the lone-parameter test's rewrite. An interpreter change for the paper's instance rule. Not a stop: an output difference that the untouched tree already shows from run to run, with the test's verdict unchanged; it is a ledger row (POSITIONS 2026-09-26, rung D's stop).",
"",
"**For the skeptic.** The differential is walk against the compiled run on GenPlainSub's shape in both orders, on O2Z64 and O2Meet, on row 478's four probes, on row 159's pairs, under item 30 = (1) on PbgLone, PbgRetObject and rung G's two programs, under item 26 = (1) on MeetViaExclusion and the addendum's CoverageReturnGood in both declaration orders, and on the library's own generic-beside-plain sets; under item 26 = (1), the load check's coverage against rung C's contract (a covering family, every pair of the set, an unsettled case refused) and the runtime selection against the ordered candidate family; the load-time verdicts before and after; under the paper's instance rule, the lone-parameter test's rewrite asserting only the written bound, passing on the base, and the unbounded expected failure failing on the base at Number, with no interpreter source changed for either. The compiled path runs its own prelude, so a program that answers differently there because its prelude lacks a declaration is not a finding.",
"",
"**What comes back to Pavol.** The load-time verdicts that moved; row 395's tests, item 16's second point, with whether this rung moved them; PlainBesideZZ32's and PlainBesideRet's answers before and after, for item 30; row 492's walk outcome and row 491's two programs; the lone-parameter tests' verdicts.",
"",
"**What it closes.** Row it opens and closes: defect 1, walk's order-dependent choice between a generic and a plain declaration (home 1, the new test). Row 478 (fixed). Row 159, for the renamed and swapped pairs (fixed, its two tests promoted; or a note, the two tests kept as its home 2). Under item 30 = (1), row 157 (fixed, home 1). Row 492 with rung C's half, as C's section says. Under the paper's instance rule, a note on row 516, that XXXInferLoneUnionWalk.fss now tests the written bound under its new name and the new expected failure pins walk's unbounded case.",
"",
"**Your briefing, entry by entry.** Step 1's command prints these entries in this order. Each line names an entry, then says why it is there and what you do with it; read the line before the entry and act on it.",
"- positions:2026-09-26 answer 9: Walk dispatches by declared domains, which ends its order dependence; the change this rung builds.",
"- positions:2026-09-28 two decisions of Fable's judgement: Your four items: compare on declared domains, hand the chosen generic to rung K's inference, dispatch the converted call again, and lift the load check for the sets the checker accepts.",
"- positions:2026-09-27 numerics plans: Walk does at dispatch what the checker does; batch N's rung K built the inference you hand the chosen declaration to.",
"- positions:2026-09-28 comprises clause row 459: Batch 7C's reading of a clause; row 492's walk half reads clauses the same way.",
"- positions:2026-09-29 PLAN item 26: Item 26 decided: option 1 with the proof addendum's three points; row 492's walk half rests on it, your load check on rung C's coverage contract.",
"- positions:2026-09-29 PLAN item 30: Item 30 decided: option 1 of its judgement, the generic declaration runs; row 157's fix rests on it.",
"- positions:2026-09-29 type parameter arguments do not fix: The paper's instance rule: walk keeps the value's type where the value does not fix a parameter, its limit, recorded by rung S; you change no interpreter code for it, only the lone-parameter test.",
"- positions:2026-09-29 walk's run-time choice of coercions: Item 16 decided and closed, not yours: walk's choice of a coercion on the value stays, recorded by rung S's callout; keep XXXCoercionStaticRungC's and XXXCoercionStaticNarrowRungC's verdicts.",
"- positions:2026-09-27 stops a batch record reserves: Every stop reserved for Pavol is reversible: finish, list it in stopsMet with liftedBy citing this entry, and land.",
"- positions:2026-09-26 rung D's stop: An output the untouched tree already varies from run to run, its verdict unchanged, is a ledger row and not a stop.",
"- positions:2026-09-28 rungs re-running measurements: The landed gate's verdicts and tables are your before; your edit touches no path the count or distance stages read, so you run neither.",
"- ledger:478: Walk's shared symbolic instantiation, with its four probes; the cache key gains the bounds, and you close the row.",
"- ledger:159: Walk's refusal of generic pairs the specification allows; the renamed and swapped pairs, whose two expected-failure walk tests batch 6.5's judge wrote for you to promote.",
"- ledger:157: Walk dropping a generic declaration declared to return Any; under item 30's decision you close it with a forAnyType case, walk's best under the paper's instance rule.",
"- ledger:516: The lone type parameter: you turn walk's test into a test of the written bound, and pin walk's unbounded case, Number where the text now gives Any, as a new expected failure.",
"- ledger:492: Walk's half of the Meet Rule example's refusal, at its load check; yours under item 26's decision.",
"- ledger:491: Item 26's programs: SkBetweenAssign keeps its walk verdict, BetweenTwoClosed runs once row 492's walk half lands; report both.",
"- ledger:496: Walk answers a generic beside a plain declaration both ways today, the plain one only through row 157; report its answers after your change.",
"- ledger:499: The compiled path's positional reading; report walk's answers to its two programs.",
"- ledger:430: The ambiguity message that varies from run to run; an output of XXXInheritedOverload that differs between your runs, its verdict unchanged, is this row, not your change.",
"- ledger:395: Item 16's second point, the tuple bindings the judge chose to convert; keep its tests' verdicts and report.",
"- ledger:390: XXXCoercionAnyOverloadRungC stays this row's expected failure under the conversion rule; keep its verdict.",
"- doc:explorations/compile-ladder/plan-7b/probes/P4.md#The answers: Walk on declared domains measured by shadow: no corpus output changes, and two load verdicts move; your expectations and your stop.",
"- doc:explorations/compile-ladder/plan-7b/probes/P4.md#1. The shadow: The relation the shadow used, and why a generic trait's functional methods keep today's instance; evidence, not your design.",
"- doc:explorations/reviews/overloading-judgement.md#3.7 The four defects: Defect 1, walk's order dependence, which you open and close.",
"- doc:explorations/reviews/conversion-overloading-judgement.md#3. Walk at run time: How walk chooses, then re-instantiates by promotion from run-time types, and why re-dispatch of a converted call is yours.",
"- doc:explorations/reviews/conversion-overloading-judgement.md#5. Where it lands, and in what order: Your four items in the judgement's words, with the shapes O2Z64 and O2Meet.",
"- doc:explorations/reviews/option-2-soundness.md#3. A plain arm more specific in one position: O2Meet's shape and the meet it needs; walk must load it and print the meet.",
"- doc:explorations/reviews/option-2-soundness.md#4. Answer 9's rules: O2Z64's shape: the converted call dispatches again to the plain declaration.",
"- doc:explorations/compile-ladder/plan-n/probe-k/PROBE-K.md#The answers: Walk's inference rule as batch N built it; your comparison hands it the chosen declaration.",
"- doc:explorations/reviews/batch-7R-conformance.md#Findings@Row 478 belongs: Why row 478 is yours and where the Range clause goes (rung L).",
"- doc:explorations/reviews/batch-3.5-4-conformance.md#Findings that need Pavol@Two of rung C's points: Item 16's two points as they reached Pavol: the first decided on 2026-09-29, the second row 395, whose tests you keep and report if your change moves them.",
"- doc:explorations/reviews/batch-7C-review.md#Findings@Row 492's repair is in batch 7b's files: Why row 492's walk half is yours and what its expected-failure test means.",
"- doc:explorations/reviews/comprises-type-level-judgement.md#6. The two paths: Row 492's walk half as item 26's decision requires: the load check consults a clause-reading meet; the device is yours.",
"- doc:explorations/reviews/comprises-type-level-proof-addendum.md#One replacement premise: Cover-Meet, the coverage contract your load check shares with rung C: a covering family strictly below both domains, for every overlapping pair.",
"- doc:explorations/reviews/comprises-type-level-proof-addendum.md#Application to the existing brief: What the addendum asks of W: runtime selection that implements the ordered candidate family the proof applies to.",
"- doc:explorations/reviews/comprises-type-level-proof-addendum.md#What coverage checking assumes: Why dispatch neither repairs broken closure (row 487) nor proves coverage; a case the clauses do not settle stays refused at load.",
"- doc:explorations/reviews/comprises-type-level-proof-addendum.md#Rung size and the existing fallback: Your load check considers a covering family, not one arm that handles part of the overlap; and when the fallback reaches your half.",
"- doc:explorations/reviews/plain-beside-generic-judgement.md#2. The list's deciding claims, checked: Claim 3: walk's plain answer is row 157, a missing AnyType case, not a rule; the cause your fix removes.",
"- doc:explorations/reviews/plain-beside-generic-judgement.md#6. Where it lands, and what it costs: Your row 157 fix, its test, and the catch in bestMatchInternal you leave alone.",
"- doc:explorations/reviews/decisions-review/popl-recheck.md#1.6 Item 30: Why walk cannot apply the paper's instance rule, having no static types, and why row 157's fix stands as walk's best.",
"- doc:explorations/reviews/decisions-review/popl-recheck.md#1.9 Row 516: The union replaced by the bound; your rewrite of walk's lone-parameter test and its unbounded expected failure.",
"- doc:ProjectFortress/tests/XXXInferLoneUnionWalk.fss: Walk's test that pins the union; you rewrite it to the written bound and rename it, and move the unbounded case into an expected failure of its own.",
"- doc:explorations/reviews/plain-beside-generic-ways/captures/both-paths.txt: The probes on both paths: PbgLone dying on the AnyType visitor under walk; what your test shows failing on the base.",
"- doc:explorations/reviews/plain-beside-generic-ways/captures/ret-object.txt: The same pair returning Object, running the generic declaration on both paths; the answer your test asserts.",
"- doc:explorations/compile-ladder/rung-generic-runtime/REPORT.md#10. Every measured defect and its home: Rung G's defects and homes; row 159's walk half, whose two expected-failure tests batch 6.5's judge wrote and you promote.",
"- doc:Specification/basic/overloading.tex#Overloading Resolution: Dispatch as the specification states it: the most specific declaration applicable to the values.",
"- doc:Specification/advanced/overloading.tex#Meet Rule: The Meet Rule and its example, which walk's load check must accept.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java#private SingleFcn bestMatchInternal: The subtyping pass that instantiates each generic at the arguments; where your comparison changes.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java#private SingleFcn bestMatchWithCoercion: The coercion pass rung K edited; read it, change it only as your items need, and report.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java#public synchronized boolean finishInitializingSecondPart: The load-time check: its excluding-pair rule, the unrelated-parameter refusal of row 492, and the check you lift for O2Z64 and O2Meet.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java#static private boolean meetExistsIn: How the load check looks for a meet today.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FGenericFunction.java#protected Simple_fcn getSymbolic(): The symbolic instantiation row 478 names, and the team's TODO beside it.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/MakeInferenceSpecific.java#public class MakeInferenceSpecific: The visitor with no AnyType case; under item 30's decision you add one, a no-op like forTraitType.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java#public Set<FType> meet(FType t2): Walk's meet, equality and subtyping only; where the clause-reading meet for row 492 goes.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/GenericFunctionOrMethod.java#static class GenericComparer: The cache key that compares static parameters by name alone; where the bounds go.",
"- code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java#public static Simple_fcn inferAndInstantiateGenericFunction: Walk's inference of a generic's static arguments, rung K's; the instance your chosen declaration gets.",
"- Walk's overload check reads one bound for two generic overloads: Row 478's fact with its probes.",
"- Under walk, the interpreter converts by coercion at its three kinds of type check: Walk's coercion, which the converted call's re-dispatch follows.",
"- Every functional-method name of the library is reserved: Why a library name in a test can collide; name your test's functions apart.",
"- The interpreter's overload-ambiguity message names its two declarations: The ambiguity message's order is not the program's; do not compare it verbatim.",
"- An XXX*.fss in the interpreter corpus IS a gated expected-failure test: How your expected failures in ProjectFortress/tests/ gate, and why a renamed one must pass.",
"- testSystem's four shards are one suite split by sorted index: A file you add moves the shards; the gate compares their sum.",
"- Three heaps run the interpreter: A test can pass at two heaps and die at the third; run yours as the gate runs it.",
"- ant compileAll deletes a tracked file: Restore default_repository/caches/global.map after every ant compileAll.",
"- map:modules-and-phases.md#A.2.2 Subpackages of: The interpreter's packages and where dispatch lives.",
"- map:compile-path-walkthrough.md#How it differs from the interpreter's run-time dispatch: Where walk's dispatch and the checker's choice part.",
"- map:test-coverage.md#B. Interpreter versus compiler: What the two corpora cover of dispatch.",
"- index:overloading: The notes on file on overloading; open those your change touches.",
"",
].join('\n')

const L_TAIL = [
"",
"## Your rung: L - the overload families",
"",
"SLUG is rung-overload-families. WORKTREE is /home/user/fortress-families, branch wip/rung-overload-families.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-7.md, section 3, under \"L. The overload families\"), carried below word for word, and after it your briefing entry by entry, each with why it is there; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record, and the questions its answers line names are in section 1; read them there.",
"",
"**The answers this rung follows.** Q2 = (a); Q4 = (1), answer 9's rule; item 22 = (b), decided by Pavol on 2026-09-29 (POSITIONS 2026-09-29, batch 7b's items 22 and 23). (Under Q2 = (a) the rung chooses the seq family's device per pair and reports each choice as a decision; under Q2 = (b) the coordinator writes Pavol's device here. Text marked \"under Q4 = (2)\" or \"under item 22 = (b)\" applies only while the coordinator has written that answer here.)",
"",
"**The problem.** The compiled checker refuses these overload families of the one library. The counts are the last landed gate's tables, batch 6.5b's (explorations/compile-ladder/climb-batch-6.5b/gate/), which read as batch 7C's for these families: the count stage's table, byte-identical to 7C's, its FortressLibrary row's 66 errors named in explorations/compile-ladder/rung-comprises-checker/probes/lists-for-pavol.txt (item 3), and the distance stage's per-site list, explorations/compile-ladder/climb-batch-6.5b/gate/distance-sites.tsv, whose rows for these families are batch 6.5's and 7C's but for FortressLibrary's line numbers, counted by family with awk; its total, 624, moved from 7C's 626 at sites outside them (batch N's gate 627; explorations/reviews/batch-6.5b-review.md, finding 8). They are the rung's before as they stand:",
"- The array MIN and MAX, 4 and 4 on the count stage, 6 and 6 on the distance stage: the scalar-extension block's opr MIN[\\T extends Number, I\\](x: Array[\\T,I\\], y: T), its mirror and MAX's pair (Library/FortressLibrary.fsi:2609-2612) against StandardMin's and StandardMax's functional methods (:189, :200): two open traits. Batch N's rung M, the library rung for row 484, declared MIN, MAX and MINMAX on each integer type (2770550c3; POSITIONS 2026-09-28, the two decisions of Fable's judgement, decision 2); read them beside these.",
"- String's juxtaposition against MultiplicativeRing[\\T\\]'s, 3 on the count stage, 3 on the distance stage in the class the sentence refused: String's declarations (FortressLibrary.fsi:2413-2415); nothing declares String exclusive of AnyMultiplicativeRing. String's own pair, (Any, String) against (String, Any), is the Meet Rule's and batch 8's (probe P2).",
"- openRangeHelper, 3 on the count stage, 6 on the distance stage (Library/RangeInternals.fsi:580-584 and the component): three declarations told apart only by the arrow type of a thunk, which the language itself calls ambiguous, since a function value can have several arrow types (Specification/basic/types-vals-vars.tex:400-403; Documentation/Specification/Prose/Language/types.tick:518-519).",
"- seq, 5 on the count stage, 14 on the distance stage: the functional methods seq(self) of ReadableArray, FilterGenerator and SequentialGenerator (FortressLibrary.fsi:1353, :2095, :842), open traits under Generator, so another component could declare a type extending two of them.",
"- CAP's 12 went with batch 7R's ranges over ZZ32 (the lists above, item 3).",
"Two api headers that say something other than their components, which this rung makes agree:",
"- PossibleReductionPair[\\R\\] extends Condition[\\SomeReductionPair[\\R\\]\\] in the api (FortressLibrary.fsi:1828) and Condition[\\PossibleReductionPair[\\R\\]\\] in the component (FortressLibrary.fss:3017). Rung C's return-type rule over every instance refuses NoReductionPair's and SomeReductionPair's cond under the api's parent, 3 pairs, and one api line saying what the component says clears them; narrowing the two cond declarations instead breaks the component (probe P1, section 4).",
"- Range excludes { Number, String } in the component, with the team's comment \"Important or the strided factories can't overload!\" (FortressLibrary.fss:3734-3735), and nothing in the api (FortressLibrary.fsi:2108). The export check counts the difference, and the compiled checker, which reads the api, needs the clause once the one library is its prelude (row 478's note; explorations/reviews/batch-7R-conformance.md finding 6).",
"Under Q4 = (2), a fifth family: the value-form factories, array1[\\T, nat s0\\]() beside array1[\\T, nat s0\\](v: T) and the same for array2 and array3 (FortressLibrary.fsi:1572-1573, :1682-1683, and the component's three), which the positional rule's domain condition refuses (probe P1, section 4); no repair was measured, and the probe the record's section 6 names measures one before the launch. Under item 22 = (b), TotalComparison's header (below).",
"Under walk these families run today; the gap is the checker's. Not this rung's: CMP and MINMAX, the comparisons' (batch 7's rung H); the Meet Rule pairs FORWARD_CMP, IN, map, ivmap, generate, lift, SQCAP, copy and String's own juxtaposition (batch 8, a library rung by probe P2); the return-type slips of Col's and Row's subarray and SimpleMappedIndexed's map, which rung C's positional rule refuses a second time (batch 8's one-line slips, P1 section 6); fill (batch 7's rung A).",
"",
"**The decisions.** Answer 9 (explorations/coordinator/POSITIONS.md, 2026-09-26, answer 9): \"The library's refused families are repaired by its own devices (125 to 113 measured on a copy).\" No checker change: the judgement's option 2, a checker step that concludes exclusion from a bound, was declined with answer 9 (explorations/reviews/overloading-judgement.md section 3.5, fourth item). The standard is the library's own practice (POSITIONS 2026-09-19), and a fork put to Pavol names the library's own way first (POSITIONS 2026-09-24, after the diagonal). Under Q2 = (a), the seq family's device, exclusion or a declaration on the meet, is chosen per pair with the count in hand and reported as a decision with the other way (the judgement's section 10, item 6). The cond line and the Range clause: the component is what runs under walk, and the api is made to say it (P1's measurement; row 478's note). Item 22: until it is answered, TotalComparison stays as batch 7's rung H landed it, extends { Comparison } with its five members restated. Under item 22 = (b), the rung writes trait TotalComparison extends { Comparison, StandardMinMax[\\TotalComparison\\] } in the api and the component, the five restated members kept, as rung H's skeptic measured it on a copy (explorations/compile-ladder/rung-exclusion-remainder/SKEPTIC.md section 5), and row 461 closes. Under Q4 = (2), the value-form factories' repair is this rung's, by a library device the probe measured first; a line of the microGPT programs or their vocabulary that the repair would change is shown to Pavol as a diff first (POSITIONS 2026-09-19).",
"",
"**What the library already does in the same families.** Evidence, not the brief; the rung lists every way the language and the library offer before it chooses, the library's own first. Plain parent traits that exclude each other where a where-clause excludes cannot be written: Rank1, Rank2, Rank3, \"Potemkin exclusion traits\" (FortressLibrary.fsi:1153-1158), and AnyMaybe. An excludes clause against an algebraic marker, for the same reason, an array operator against an algebraic trait's method: Vector and Matrix exclude { AnyMultiplicativeRing } (:1550, :1668). A type below two of the seq traits: SimpleSeqFilterGenerator extends FilterGenerator and SequentialGenerator and declares its own seq (FortressLibrary.fss:3568). Names where arrows meet: the numbered open1Range, open2Range, open3Range beside openRangeHelper (RangeInternals.fsi:586-590). A choice by typecase on a witness: array1's factory (the specification's own example, Specification/appendices/future.tex:241-245; probe TypecaseWitness runs on both paths). The object witness is refused by the checker without option 2's step (NullaryObjWitness). For a partial order that also has MIN and MAX: StandardMinMax[\\X\\] beside the order, as RR64 and QQ declare it (FortressLibrary.fsi:291, :388), and since batch 6.5b's rung V RR32 (ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:47-48) (item 22). Measured: the judgement's devices for CAP, the array MIN and MAX and juxtaposition (explorations/reviews/overloading-judgement/variants/overload-devices.py, without its StandardMinMax edit, which batch 7's rung B landed) take the count stage from 87 to 64 on the library of batch 7's first run with the clause cleared: CAP 12 to 0, the array MIN and MAX 4 and 4 to 0, juxtaposition 4 to 1 (String's own pair). Written in the apis only, they leave errors in the components, whose own trait declarations do not carry the markers, so the rung writes them in both files (probe P1, section 5). openRangeHelper and seq were not measured. Walk's side: the probe DifferMIEPotemkin runs the CAP shape with plain exclusion traits on both paths (explorations/reviews/overload-static-params-ways.md section 2.2).",
"",
"**The test, first.** The manifest sets testIsStage: the failure before the edit is the last landed gate's count and distance tables with the families' rows (the intro's rule; POSITIONS 2026-09-28, on rungs re-running measurements), and the test is the same stages run once on this rung's tree after the edit, into tmp/rung-overload-families/, each family's rows named in the report. Beside them, a new interpreter test in ProjectFortress/tests/, named by its topic, its messages in plain words, in the form of ProjectFortress/tests/roundBug.fss, written before the edit and passing before and after, each value today's: each repaired family called under walk (the array MIN and MAX against a scalar, String juxtaposition, openRange in one, two and three dimensions, seq on an array and on a filter generator), a call that reaches the cond of SomeReductionPair and NoReductionPair through the library's reductions where the rung finds one, and a range beside a String where the strided factories overload. Under item 22 = (b), the test also asserts BIG MIN and BIG MAX over total comparisons as they answered before batch 7 (LessThan, GreaterThan; row 461's probes), which fails on the base.",
"",
"**Files it may touch.** Library/RangeInternals.fsi and .fss, and Library/FortressLibrary.fsi and .fss, only for the declarations section 4 names as rung L's and the new declarations the devices add; the new test; its own directory.",
"",
"**Java or Scala.** None. If a family cannot be repaired without a Java or Scala change, that family is a stop.",
"",
"**The checker count.** Not predicted: P1's devices were measured on the library of batch 7's first run, and batches 7R, 7C, N and 6.5b changed the base under them. The before is the last landed gate's table; the rung runs the after once and declares the total it measured. On the merged tree the cond line removes rung C's two new errors. Under item 22 = (b), TotalComparison's new parent is measured the same way on this rung's tree; what rung C's return-type rule reads at its inherited MIN and MAX shows only on the merged tree, by reading nothing, since rung B's fix removed the six row-421 errors rung H's skeptic saw there and the restated members match the inherited ones.",
"",
"**What must stay green, or keep its verdict.** Every interpreter test's verdict; the new test; ArrayScalarExtension.fss and ArrayOperatorsBesideLibrary.fss; RangeTest.fss; rangeOperators.fss; Generator2Test.fss.",
"",
"**Stops.** A team test line changed. A declaration section 4 names as another rung's, or one that batch N's row-484 rung declared. A checker or walk edit. A family whose only repair is a checker change. TotalComparison changed other than as item 22 = (b) states, or while this section's answers line does not say (b). The value-form factories changed under Q4 = (1). A line of C4's model, vocabulary, data or check, or of the APL program. A test whose verdict changes other than by this rung's intent. Not a stop: an output difference that the untouched tree already shows from run to run, with the test's verdict unchanged; it is a ledger row (POSITIONS 2026-09-26, rung D's stop).",
"",
"**For the skeptic.** Each family's rows before and after, in the count stage and in the distance stage, the after re-run and the before read from the landed gate; each device against the library's precedent it names and against the other ways the rung listed; that no device states something false of the library's types (an exclusion between two traits some library type extends together); the two api lines against their components; under Q2 = (a) each seq pair's device with its reason; the new test's values against the base.",
"",
"**What comes back to Pavol.** Each family's device, with the way not taken; under Q2 = (a) the seq pairs' devices; the two api lines; the counts; under item 22 = (b), BIG MIN and BIG MAX over total comparisons restored.",
"",
"**What it closes.** Rows it opens: openRangeHelper's three declarations ambiguous by the language's own rule on arrow types (library defect; fixed in the rung, home 1); the api's PossibleReductionPair naming a parent other than its component's (library defect; fixed in the rung, its gated home the count stage on the merged tree, where rung C's rule reads it, as row 421's was in batch 7). A note appended to row 478, that the api's Range now carries its component's clause. Under item 22 = (b), row 461 (fixed).",
"",
"**Your briefing, entry by entry.** Step 1's command prints these entries in this order. Each line names an entry, then says why it is there and what you do with it; read the line before the entry and act on it.",
"- positions:2026-09-26 answer 9: The library's refused families repaired by its own devices, with no checker change; the decision this rung builds.",
"- positions:2026-09-19 answering the open question: The library's own practice is the standard; find its device for the same kind of problem before any other way.",
"- positions:2026-09-24 override shape diagonal: A fork put to Pavol names the library's own way first; list the library's device before any other for each family.",
"- positions:2026-09-25 preventing failure mode: List every way the language and the library offer before you choose a device, the library's first.",
"- positions:2026-09-27 launch of phase 3's batches: Q2 taken at its default: you choose the seq device per pair and report each choice with the other way.",
"- positions:2026-09-29 batch 7b's items 22 and 23: Item 22 decided, option (b), on the recommendation: you write TotalComparison's StandardMinMax parent in the api and the component, the five restated members kept, and close row 461.",
"- positions:2026-09-28 two decisions of Fable's judgement: Decision 2 gave each integer type its own MIN, MAX and MINMAX in batch N; read them on your base beside the array MIN and MAX.",
"- positions:2026-09-24 exclusion route P's fork: Route A, the rule the library conforms to; every device you add states an exclusion or a meet the rule reads.",
"- positions:2026-09-19 FlatArrays review's repair: A line of the model is never changed to suit the checker; no model or vocabulary line is yours.",
"- positions:2026-09-27 stops a batch record reserves: Every stop reserved for Pavol is reversible: finish, list it in stopsMet with liftedBy citing this entry, and land.",
"- positions:2026-09-26 rung D's stop: An output the untouched tree already varies from run to run, its verdict unchanged, is a ledger row and not a stop.",
"- positions:2026-09-28 rungs re-running measurements: The rule for your count and distance tables: the last landed gate's tables are your before, not a run of the stage on your unchanged base; run only the after, into tmp/.",
"- ledger:461: BIG MIN and BIG MAX over total comparisons, item 22; under its decision, (b), in your answers line, you give TotalComparison the StandardMinMax parent, assert both in your test and close the row.",
"- ledger:478: Its note: the api's Range lacks the component's excludes clause, which you move into the api.",
"- ledger:421: StandardMinMax's MIN and MAX, fixed in batch 7; the neighbour of your markers.",
"- doc:explorations/reviews/overloading-judgement.md#3.6 The library's refused set, repaired: Each family's library device as the judgement measured it; the ways you list start here.",
"- doc:explorations/compile-ladder/plan-7b/probes/P1.md#4. The landed library: The cond pair rung C's rule refuses, and the one api line that clears it; yours.",
"- doc:explorations/compile-ladder/plan-7b/probes/P1.md#5. L's devices, measured: The devices measured in the apis, and why the components need the same markers.",
"- doc:explorations/compile-ladder/plan-7b/probes/P2.md#The answers: What the Meet Rule class leaves to batch 8, String's own juxtaposition pair among it; not yours.",
"- doc:explorations/compile-ladder/rung-exclusion-remainder/REPORT.md#16. Decisions@TotalComparison drops its order: TotalComparison's shape as landed and the library's device beside it, item 22's two ways.",
"- doc:explorations/compile-ladder/rung-exclusion-remainder/SKEPTIC.md#5. The precedent search, and a device the rung did not list: The measured device for item 22's decision, (b), with its numbers on a copy before batches 7R, 7C and N; measure it again on your base.",
"- doc:explorations/reviews/batch-7R-conformance.md#Findings@Row 478 belongs: Why the Range clause goes into the api, and that rung L may take it.",
"- doc:Specification/advanced/overloading.tex#Meet Rule: The rule your devices satisfy: an exclusion, or a declaration on the meet.",
"- code:Library/FortressLibrary.fsi#(** Potemkin exclusion traits..trait Rank3: The library's plain exclusion traits where a generic excludes cannot be written; the device for a family told apart by a plain parent.",
"- code:Library/FortressLibrary.fsi#trait StandardMin[: StandardMin's header, which your marker for the array MIN sits over.",
"- code:Library/FortressLibrary.fsi#trait StandardMax[: StandardMax's header, the same for the array MAX.",
"- code:Library/FortressLibrary.fsi#trait StandardMinMax[: StandardMinMax, the library's device for a partial order that also has MIN and MAX, as RR64, RR32 and QQ declare it; item 22's second way uses it.",
"- code:Library/FortressLibrary.fsi#trait TotalComparison: TotalComparison as batch 7's rung H left it; yours under item 22's decision, (b): one header line in the api and the component, the five restated members kept.",
"- code:Library/FortressLibrary.fsi#trait ReadableArray[: ReadableArray's header and its seq; the header takes the exclusion of the markers.",
"- code:Library/FortressLibrary.fsi#trait SequentialGenerator[: SequentialGenerator's seq, one of the seq pairs.",
"- code:Library/FortressLibrary.fsi#trait FilterGenerator[: FilterGenerator's seq, one of the seq pairs.",
"- code:Library/FortressLibrary.fss#object SimpleSeqFilterGenerator[: A type below FilterGenerator and SequentialGenerator that declares its own seq: the meet, for that pair.",
"- code:Library/FortressLibrary.fsi#trait PossibleReductionPair: The api's parent, which disagrees with the component's; you make it say what the component says.",
"- code:Library/FortressLibrary.fss#trait PossibleReductionPair: The component's parent, which runs under walk and which P1's repair copies.",
"- code:Library/FortressLibrary.fss#trait Range[: The component's Range with its excludes clause and the team's comment on why it matters.",
"- code:Library/FortressLibrary.fsi#trait Range[: The api's Range without it; you add the clause.",
"- code:Library/RangeInternals.fsi#open1Range(x: ZZ32)..open3Range(x: ZZ32: The numbered names beside openRangeHelper, the library's device where arrows meet.",
"- code:Library/RangeInternals.fsi#openRangeHelper(_: ()->ZZ32)..openRangeHelper(_: ()->(ZZ32, ZZ32, ZZ32)): The three declarations told apart only by a thunk's arrow type; you reshape them.",
"- Measured by the overloading judgement on private library copies: The families' counts on the nested tower and the devices measured then.",
"- The hidden layer, classified: The classes of the api's overloading errors; name every row your devices move by class.",
"- The compiled checker's exclusion rule is the designers': Why the rule stays and the library conforms.",
"- The one library's number tower is flat: The number types your markers must not catch.",
"- The one library's scalar ranges are over ZZ32 alone: Batch 7R's ranges, which removed CAP's refusals; the ranges your openRangeHelper repair builds.",
"- Every functional-method name of the library is reserved: Why a new marker or name can collide with a program's own; choose names the library does not already reserve.",
"- testSystem's four shards are one suite split by sorted index: Your new test moves the shards; the gate compares their sum.",
"- The interpreter's overload-ambiguity message names its two declarations: The ambiguity message's order is not the program's; do not compare it verbatim.",
"- The compiled checker reads a comprises clause as the 2012 texts do: Batch 7C's rule; your markers extend no closed trait unlisted.",
"- The true distance to the switch-over: The distance stage your devices move; read it by family.",
"- map:spec-to-implementation.md#4.2 The tower in: The library's tower and traits, where your markers sit.",
"- map:dormant-code.md#1.1 Commented-out declarations in: The library's commented-out declarations and not-yet notes; a device the team began may be there.",
"- map:README.md#Touch this@Library/FortressLibrary.fss: What a library edit moves: walk, the count stage, and the commit stage's PDF.",
"- index:overloading: The notes on file on overloading; open those your families touch.",
"",
].join('\n')

const S_ENTRY = { id: 'S', slug: 'rung-spec-overloading', path: '/home/user/fortress-ovspec', branch: 'wip/rung-spec-overloading', tail: S_TAIL, expectedMinutes: 120, writesState: false, testIsStage: false, expectedCheckerCount: CHECKER_BASE, landsOnlyWith: ['C'],
    blurb: "the specification's two overloading chapters revised to the 2011 model the checker runs (answer 9): the sentence forbidding overloads that differ in static parameters goes, the paper's three rules and the positional rule are stated (the latter, under the POPL recheck's item 1.3 as a default, in a callout as a restriction of the compiled implementation), the coercion chapter gains one cross-reference sentence (the conversion decision of 2026-09-28) and one callout recording walk's run-time choice of coercions (item 16, decided 2026-09-29), the implicit bound becomes Any (Q1, decided 2026-09-29), the originals kept in the S1 form; under item 26's decision, four passages restated at the level of values with the Meet Rule's closed-trait case and the proof appendix revised to run-time uniqueness, its scope and row 487's closure assumption marked; under item 30's decision and the paper's instance rule (decided 2026-09-29), one sentence on the declaration a dispatch reaches and its instance, each type parameter at its declared bound under the call's static return type, with a callout that both implementations take the value's type today, and the inference chapter's union sentence for a lone type parameter replaced by the bound; under item 23's decision, Appendix I's introduction names the decision each entry follows; batch N's inference chapter's callouts and Appendix I entry reworded, the entry listing the checker's four gated departures (rows 508, 515, 516 and 518); item 14's passage left while unanswered; an original-tree edit, Specification-1.0-frozen/ untouched, the PDF left to the commit stage. No source file and no test assertion.",
    briefing: [
      "positions:2026-09-26 answer 9", "positions:2026-09-28 two decisions of Fable's judgement", "positions:2026-09-24 requirement on the plan",
      "positions:2026-09-26 S1", "positions:2026-09-26 first of the batch-5 answers", "positions:2026-09-26 lineage note",
      "positions:2026-09-23 fork weighed", "positions:2026-09-26 second batch-5 answer", "positions:2026-09-26 third batch-5 answer",
      "positions:2026-09-27 numerics plans", "positions:2026-09-29 implicit bound", "positions:2026-09-27 launch of phase 3's batches",
      "positions:2026-09-28 comprises clause row 459", "positions:2026-09-29 PLAN item 26", "positions:2026-09-29 PLAN item 30",
      "positions:2026-09-29 type parameter arguments do not fix", "positions:2026-09-29 walk's run-time choice of coercions",
      "positions:2026-09-29 batch 7b's items 22 and 23", "positions:2026-09-19 answering the open question",
      "positions:2026-09-27 stops a batch record reserves", "ledger:19", "ledger:398", "ledger:412", "ledger:478", "ledger:491", "ledger:492",
      "ledger:487", "ledger:496", "ledger:499", "ledger:516", "doc:explorations/reviews/overloading-judgement.md#3.4 What the revised specification says",
      "doc:explorations/reviews/overloading-judgement.md#3.5 What the checker enforces",
      "doc:explorations/reviews/overloading-judgement.md#8. Where this differs from the workers and from the S2 judgement",
      "doc:explorations/reviews/conversion-overloading-judgement.md#1. The rule",
      "doc:explorations/reviews/conversion-overloading-judgement.md#5. Where it lands, and in what order",
      "doc:explorations/reviews/overload-static-params-ways.md#2.2 The probes",
      "doc:explorations/reviews/overload-static-params-ways.md#7. The history in the commits",
      "doc:explorations/compile-ladder/plan-7b/probes/P1.md#The answers",
      "doc:explorations/compile-ladder/rung-generic-runtime/REPORT.md#9. The dispatch change's reach and its remainder",
      "doc:explorations/compile-ladder/rung-spec-comprises/decision-record.md#4. Left, with the reason",
      "doc:explorations/reviews/comprises-type-level-judgement.md#4. The recommendation",
      "doc:explorations/reviews/comprises-type-level-judgement.md#5. The specification change, in the S1 form",
      "doc:explorations/reviews/comprises-type-level-judgement.md#7. Where it lands, and what it costs",
      "doc:explorations/reviews/comprises-type-level-proof-addendum.md#Source and scope",
      "doc:explorations/reviews/comprises-type-level-proof-addendum.md#One replacement premise",
      "doc:explorations/reviews/comprises-type-level-proof-addendum.md#Replacement lemmas and theorem",
      "doc:explorations/reviews/comprises-type-level-proof-addendum.md#Application to the existing brief",
      "doc:explorations/reviews/comprises-type-level-proof-addendum.md#What coverage checking assumes",
      "doc:explorations/reviews/plain-beside-generic-judgement.md#4. The decision",
      "doc:explorations/reviews/decisions-review/popl-recheck.md#1. The verdicts the paper bears on",
      "doc:research/extracts/ParkPOPL2019-extract.md#4.2 The dynamic choice",
      "doc:explorations/reviews/plain-beside-generic-judgement.md#5. The specification change, in the S1 form",
      "doc:explorations/reviews/batch-7C-review.md#Findings@Item 26 belongs before batch 7b",
      "doc:explorations/reviews/comprises-type-level-ways.md#For batch 7b's record",
      "doc:explorations/reviews/batch-5-conformance.md#Findings that need Pavol@One sentence of the revised specification is broader",
      "doc:Specification/basic/overloading.tex#Overloading and Multiple Dispatch",
      "doc:Specification/advanced/overloading.tex#Overloaded Functional Declarations",
      "doc:Specification/appendices/overloading-function.tex#Proof of Overloading Resolution for Functions",
      "doc:Specification/basic/conversions-coercions.tex#Coercion Resolution", "doc:Specification/basic/trait-parameters.tex#Type Parameters",
      "doc:Specification/basic/inference.tex#Type Inference", "doc:Specification/appendices/changes.tex#The inference of a call's static arguments",
      "doc:Specification/appendices/changes.tex#Instantiation exclusion",
      "doc:explorations/reviews/batch-N-review.md#Findings@chapter says it states no more",
      "doc:Specification/appendices/future.tex#Functions and Overloading",
      "doc:Specification/appendices/changes.tex#Initializing an array from a function",
      "doc:Specification/appendices/changes.tex#Passages not yet revised",
      "doc:Documentation/Specification/Prose/Language/overloading.tick#Principles of Overloading", "doc:Papers/Types/rules.tick#Overloading Rules",
      "doc:explorations/compile-ladder/rung-spec-route-a/decision-record.md#3.9 The form",
      "doc:explorations/compile-ladder/climb-batch-6/JUDGE-review.md#Finding 1",
      "The compiled checker does not enforce the specification's sentence that overloads may not differ",
      "Measured by the overloading judgement on private library copies",
      "The checker's return-type rule lets the more specific declaration choose its own instantiation",
      "A generic arm of a template dispatcher is called at the dispatcher's own static parameters",
      "The specification reads a comprises clause as the later Types chapter does", "The specification never wrote static-argument inference",
      "Specification-1.0-frozen/ is byte for byte", "The team's latest word on types",
      "Citing Specification/library/apis/*.tex as an independent standard is circular",
      "map:spec-to-implementation.md#Chapter 9, Functions; Chapter 15, Overloading", "map:spec-to-implementation.md#Chapter 17, Conversions and Coercions",
      "map:README.md#Touch this@Specification/ (the standard)", "index:overloading"],
    checks: [
      "positions:2026-09-26 answer 9", "positions:2026-09-28 two decisions of Fable's judgement", "positions:2026-09-26 S1",
      "positions:2026-09-26 first of the batch-5 answers", "positions:2026-09-26 lineage note", "positions:2026-09-28 comprises clause row 459",
      "positions:2026-09-29 PLAN item 26", "positions:2026-09-29 PLAN item 30", "positions:2026-09-29 type parameter arguments do not fix",
      "positions:2026-09-29 implicit bound", "positions:2026-09-29 walk's run-time choice of coercions", "positions:2026-09-29 batch 7b's items 22 and 23",
      "ledger:491", "ledger:496", "ledger:499", "ledger:487", "ledger:516",
      "doc:explorations/reviews/decisions-review/popl-recheck.md#1. The verdicts the paper bears on",
      "doc:explorations/reviews/overloading-judgement.md#3.4 What the revised specification says",
      "doc:explorations/reviews/overloading-judgement.md#3.5 What the checker enforces",
      "doc:explorations/reviews/conversion-overloading-judgement.md#1. The rule", "doc:explorations/compile-ladder/plan-7b/probes/P1.md#The answers",
      "doc:explorations/compile-ladder/rung-generic-runtime/REPORT.md#9. The dispatch change's reach and its remainder",
      "doc:explorations/compile-ladder/rung-spec-comprises/decision-record.md#4. Left, with the reason",
      "doc:Specification/basic/conversions-coercions.tex#Coercion Resolution",
      "doc:Specification/appendices/changes.tex#The inference of a call's static arguments",
      "doc:explorations/reviews/batch-N-review.md#Findings@chapter says it states no more", "doc:Papers/Types/rules.tick#Overloading Rules",
      "doc:explorations/compile-ladder/rung-spec-route-a/decision-record.md#3.9 The form",
      "doc:explorations/reviews/comprises-type-level-judgement.md#5. The specification change, in the S1 form",
      "doc:explorations/reviews/comprises-type-level-proof-addendum.md#Replacement lemmas and theorem",
      "doc:explorations/reviews/comprises-type-level-proof-addendum.md#Application to the existing brief",
      "doc:explorations/reviews/plain-beside-generic-judgement.md#5. The specification change, in the S1 form",
      "Specification-1.0-frozen/ is byte for byte"],
    expectedMoves: [] }

const C_ENTRY = { id: 'C', slug: 'rung-return-type-rule', path: '/home/user/fortress-rtr', branch: 'wip/rung-return-type-rule', tail: C_TAIL, expectedMinutes: 200, writesState: false, testIsStage: false, expectedCheckerCount: CHECKER_BASE + (Q4 === 2 ? 4 : 2),
    blurb: "the compiled checker's return-type rule checked over every instance, and the positional rule for generic declarations in the more-specific relation (answer 9; row 398 and defect 2), with the checker's half of row 492 (the meet of two closed traits read through their clauses, in a coverage check local to overload checking) and the typing of a call that sits between them, the proof addendum's acceptance pair, expected-failure compile tests, defect 3's and row 496's expected failures, and under the paper's instance rule one expected-failure pair where the paper's instance and the value's type differ, the paper's ArrayList/List set as a test, and the compiled lone-parameter test turned to the written bound beside an expected failure for the unbounded case; Scala under scala_src/.",
    briefing: [
      "positions:2026-09-26 answer 9", "positions:2026-09-28 two decisions of Fable's judgement", "positions:2026-09-24 exclusion route P's fork",
      "positions:2026-09-26 second batch-5 answer", "positions:2026-09-26 answer 12", "positions:2026-09-28 comprises clause row 459",
      "positions:2026-09-29 PLAN item 26", "positions:2026-09-29 PLAN item 30", "positions:2026-09-29 type parameter arguments do not fix",
      "positions:2026-09-21 library route", "positions:2026-09-26 answer 11", "positions:2026-09-27 stops a batch record reserves",
      "positions:2026-09-26 rung D's stop", "positions:2026-09-28 rungs re-running measurements", "ledger:398", "ledger:492", "ledger:491", "ledger:487",
      "ledger:499", "ledger:495", "ledger:496", "ledger:494", "ledger:516",
      "doc:explorations/reviews/overloading-judgement.md#3.5 What the checker enforces",
      "doc:explorations/reviews/overloading-judgement.md#3.7 The four defects",
      "doc:explorations/reviews/overloading-judgement.md#8. Where this differs from the workers and from the S2 judgement",
      "doc:explorations/compile-ladder/plan-7b/probes/P1.md#The answers", "doc:explorations/compile-ladder/plan-7b/probes/P1.md#2. The shadow",
      "doc:explorations/compile-ladder/plan-7b/probes/P1.md#3. The probe shapes, on the compiled path",
      "doc:explorations/compile-ladder/plan-7b/probes/P1.md#4. The landed library",
      "doc:explorations/reviews/overload-static-params-ways.md#2.2 The probes",
      "doc:explorations/reviews/overload-static-params-ways.md#2.3 Defects found (not the question, but on its path)",
      "doc:explorations/reviews/conversion-overloading-judgement.md#7. The findings that stand under every way",
      "doc:explorations/reviews/option-2-soundness.md#4. Answer 9's rules",
      "doc:explorations/compile-ladder/rung-generic-runtime/REPORT.md#9. The dispatch change's reach and its remainder",
      "doc:explorations/reviews/batch-7C-review.md#Findings@Row 492's repair is in batch 7b's files",
      "doc:explorations/reviews/comprises-type-level-judgement.md#2. What was checked, and what was measured",
      "doc:explorations/reviews/comprises-type-level-judgement.md#6. The two paths",
      "doc:explorations/reviews/comprises-type-level-proof-addendum.md#Source and scope",
      "doc:explorations/reviews/comprises-type-level-proof-addendum.md#One replacement premise",
      "doc:explorations/reviews/comprises-type-level-proof-addendum.md#Replacement lemmas and theorem",
      "doc:explorations/reviews/comprises-type-level-proof-addendum.md#Application to the existing brief",
      "doc:explorations/reviews/comprises-type-level-proof-addendum.md#Review of the 7b briefing, at the same base",
      "doc:explorations/reviews/comprises-type-level-proof-addendum.md#Concrete acceptance pair for rung C",
      "doc:explorations/reviews/comprises-type-level-ways.md#For batch 7b's record",
      "doc:explorations/reviews/plain-beside-generic-judgement.md#6. Where it lands, and what it costs",
      "doc:explorations/reviews/decisions-review/popl-recheck.md#1.2 Answer 9", "doc:explorations/reviews/decisions-review/popl-recheck.md#1.6 Item 30",
      "doc:explorations/reviews/decisions-review/popl-recheck.md#1.9 Row 516", "doc:ProjectFortress/compiler_tests/XXXInferLoneBoundUnion.fss",
      "doc:explorations/compile-ladder/rung-spec-comprises/probes/between/MeetExample.txt",
      "doc:Specification/advanced/overloading.tex#Overloaded Functional Declarations", "doc:Papers/Types/rules.tick#Overloading Rules",
      "doc:Papers/Types/overloading-check.tick#Mechanically Checking the Rules",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala#def satisfiesReturnTypeRule(f: Functional..def excludes(f: Functional",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala#private def validOverloading(first..private def meetRule(first",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala#protected def normConjunct",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala#val top = candidates.filter..private def signalAmbiguity(",
      "The compiled checker does not enforce the specification's sentence that overloads may not differ",
      "The checker's return-type rule lets the more specific declaration choose its own instantiation",
      "The return-type rule now reads a size as it reads a type parameter", "The compiled type checker checks nat and int static parameters",
      "The compiled checker refuses a call whose most specific arm has a size the call cannot fix", "The hidden layer, classified",
      "The compiled checker reads a comprises clause as the 2012 texts do",
      "A generic arm of a template dispatcher is called at the dispatcher's own static parameters",
      "The XXX expected-failure mechanism in compiler_tests/ and library_tests/", "A thrown CompilerError takes a third path through the test harness",
      "An XXX compile test pinned by compile_err_contains whose program compiles is reported as a wrong failure", "ant compileAll deletes a tracked file",
      "The true distance to the switch-over", "map:compile-path-walkthrough.md#How it differs from the interpreter's run-time dispatch",
      "map:modules-and-phases.md#B.7 Overloading", "map:README.md#Touch this@scala_src/typechecker/", "index:overloading"],
    checks: [
      "positions:2026-09-26 answer 9", "positions:2026-09-28 two decisions of Fable's judgement", "positions:2026-09-24 exclusion route P's fork",
      "positions:2026-09-28 comprises clause row 459", "positions:2026-09-29 PLAN item 26", "positions:2026-09-29 PLAN item 30",
      "positions:2026-09-28 rungs re-running measurements", "ledger:398", "ledger:492", "ledger:491", "ledger:487", "ledger:499",
      "doc:explorations/reviews/overloading-judgement.md#3.5 What the checker enforces",
      "doc:explorations/compile-ladder/plan-7b/probes/P1.md#The answers", "doc:explorations/compile-ladder/plan-7b/probes/P1.md#4. The landed library",
      "doc:Papers/Types/rules.tick#Overloading Rules", "doc:Papers/Types/overloading-check.tick#Mechanically Checking the Rules",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala#def satisfiesReturnTypeRule(f: Functional..def excludes(f: Functional",
      "doc:explorations/reviews/comprises-type-level-judgement.md#6. The two paths",
      "doc:explorations/reviews/comprises-type-level-proof-addendum.md#One replacement premise",
      "doc:explorations/reviews/comprises-type-level-proof-addendum.md#Application to the existing brief",
      "doc:explorations/reviews/comprises-type-level-proof-addendum.md#Review of the 7b briefing, at the same base",
      "doc:explorations/reviews/comprises-type-level-proof-addendum.md#Concrete acceptance pair for rung C",
      "doc:explorations/reviews/plain-beside-generic-judgement.md#6. Where it lands, and what it costs",
      "The XXX expected-failure mechanism in compiler_tests/ and library_tests/", "positions:2026-09-29 type parameter arguments do not fix", "ledger:516",
      "doc:explorations/reviews/decisions-review/popl-recheck.md#1.6 Item 30"],
    expectedMoves: [] }

const W_ENTRY = { id: 'W', slug: 'rung-walk-dispatch', path: '/home/user/fortress-dispatch', branch: 'wip/rung-walk-dispatch', tail: W_TAIL, expectedMinutes: 220, writesState: true, testIsStage: false, expectedCheckerCount: CHECKER_BASE,
    blurb: "walk's choice between a generic and a plain declaration made on declared domains (answer 9; defect 1), the conversion decision's four items (compare on declared domains, hand the chosen generic to rung K's inference, dispatch the converted call again, lift the load check for O2Z64 and O2Meet), row 478's cache key, row 157's AnyType case, row 159's two walk tests promoted and row 492's walk half, its runtime selection the ordered candidate family the proof covers, and under the paper's instance rule walk's lone-parameter test turned to the written bound beside an expected failure for the unbounded case, no interpreter change for it; Java under interpreter/.",
    briefing: [
      "positions:2026-09-26 answer 9", "positions:2026-09-28 two decisions of Fable's judgement", "positions:2026-09-27 numerics plans",
      "positions:2026-09-28 comprises clause row 459", "positions:2026-09-29 PLAN item 26", "positions:2026-09-29 PLAN item 30",
      "positions:2026-09-29 type parameter arguments do not fix", "positions:2026-09-29 walk's run-time choice of coercions",
      "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop", "positions:2026-09-28 rungs re-running measurements",
      "ledger:478", "ledger:159", "ledger:157", "ledger:516", "ledger:492", "ledger:491", "ledger:496", "ledger:499", "ledger:430", "ledger:395",
      "ledger:390", "doc:explorations/compile-ladder/plan-7b/probes/P4.md#The answers",
      "doc:explorations/compile-ladder/plan-7b/probes/P4.md#1. The shadow", "doc:explorations/reviews/overloading-judgement.md#3.7 The four defects",
      "doc:explorations/reviews/conversion-overloading-judgement.md#3. Walk at run time",
      "doc:explorations/reviews/conversion-overloading-judgement.md#5. Where it lands, and in what order",
      "doc:explorations/reviews/option-2-soundness.md#3. A plain arm more specific in one position",
      "doc:explorations/reviews/option-2-soundness.md#4. Answer 9's rules", "doc:explorations/compile-ladder/plan-n/probe-k/PROBE-K.md#The answers",
      "doc:explorations/reviews/batch-7R-conformance.md#Findings@Row 478 belongs",
      "doc:explorations/reviews/batch-3.5-4-conformance.md#Findings that need Pavol@Two of rung C's points",
      "doc:explorations/reviews/batch-7C-review.md#Findings@Row 492's repair is in batch 7b's files",
      "doc:explorations/reviews/comprises-type-level-judgement.md#6. The two paths",
      "doc:explorations/reviews/comprises-type-level-proof-addendum.md#One replacement premise",
      "doc:explorations/reviews/comprises-type-level-proof-addendum.md#Application to the existing brief",
      "doc:explorations/reviews/comprises-type-level-proof-addendum.md#What coverage checking assumes",
      "doc:explorations/reviews/comprises-type-level-proof-addendum.md#Rung size and the existing fallback",
      "doc:explorations/reviews/plain-beside-generic-judgement.md#2. The list's deciding claims, checked",
      "doc:explorations/reviews/plain-beside-generic-judgement.md#6. Where it lands, and what it costs",
      "doc:explorations/reviews/decisions-review/popl-recheck.md#1.6 Item 30", "doc:explorations/reviews/decisions-review/popl-recheck.md#1.9 Row 516",
      "doc:ProjectFortress/tests/XXXInferLoneUnionWalk.fss", "doc:explorations/reviews/plain-beside-generic-ways/captures/both-paths.txt",
      "doc:explorations/reviews/plain-beside-generic-ways/captures/ret-object.txt",
      "doc:explorations/compile-ladder/rung-generic-runtime/REPORT.md#10. Every measured defect and its home",
      "doc:Specification/basic/overloading.tex#Overloading Resolution", "doc:Specification/advanced/overloading.tex#Meet Rule",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java#private SingleFcn bestMatchInternal",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java#private SingleFcn bestMatchWithCoercion",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java#public synchronized boolean finishInitializingSecondPart",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java#static private boolean meetExistsIn",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FGenericFunction.java#protected Simple_fcn getSymbolic()",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/MakeInferenceSpecific.java#public class MakeInferenceSpecific",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java#public Set<FType> meet(FType t2)",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/GenericFunctionOrMethod.java#static class GenericComparer",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java#public static Simple_fcn inferAndInstantiateGenericFunction",
      "Walk's overload check reads one bound for two generic overloads",
      "Under walk, the interpreter converts by coercion at its three kinds of type check", "Every functional-method name of the library is reserved",
      "The interpreter's overload-ambiguity message names its two declarations", "An XXX*.fss in the interpreter corpus IS a gated expected-failure test",
      "testSystem's four shards are one suite split by sorted index", "Three heaps run the interpreter", "ant compileAll deletes a tracked file",
      "map:modules-and-phases.md#A.2.2 Subpackages of", "map:compile-path-walkthrough.md#How it differs from the interpreter's run-time dispatch",
      "map:test-coverage.md#B. Interpreter versus compiler", "index:overloading"],
    checks: [
      "positions:2026-09-26 answer 9", "positions:2026-09-28 two decisions of Fable's judgement", "positions:2026-09-28 comprises clause row 459",
      "positions:2026-09-29 PLAN item 26", "positions:2026-09-29 PLAN item 30", "positions:2026-09-26 rung D's stop", "ledger:478", "ledger:159",
      "ledger:492", "ledger:491", "ledger:496", "doc:explorations/compile-ladder/plan-7b/probes/P4.md#The answers",
      "doc:explorations/reviews/conversion-overloading-judgement.md#3. Walk at run time",
      "doc:explorations/reviews/conversion-overloading-judgement.md#5. Where it lands, and in what order",
      "doc:Specification/basic/overloading.tex#Overloading Resolution", "doc:Specification/advanced/overloading.tex#Meet Rule",
      "code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java#public synchronized boolean finishInitializingSecondPart",
      "ledger:157", "doc:explorations/reviews/comprises-type-level-judgement.md#6. The two paths",
      "doc:explorations/reviews/comprises-type-level-proof-addendum.md#Application to the existing brief",
      "doc:explorations/reviews/comprises-type-level-proof-addendum.md#Rung size and the existing fallback",
      "doc:explorations/reviews/plain-beside-generic-judgement.md#6. Where it lands, and what it costs",
      "An XXX*.fss in the interpreter corpus IS a gated expected-failure test", "positions:2026-09-29 type parameter arguments do not fix", "ledger:516"],
    expectedMoves: [] }

const L_ENTRY = { id: 'L', slug: 'rung-overload-families', path: '/home/user/fortress-families', branch: 'wip/rung-overload-families', tail: L_TAIL, expectedMinutes: 180, writesState: false, testIsStage: true,
    blurb: "the one library's refused overload families (the array MIN and MAX, String's juxtaposition against the ring, openRangeHelper, seq) repaired by its own devices (answer 9), two api headers made to say what their components say (PossibleReductionPair's parent, Range's excludes clause), and under item 22's decision TotalComparison given StandardMinMax beside Comparison, the library's device, so that BIG MIN and BIG MAX over total comparisons answer again (row 461); library declarations only.",
    briefing: [
      "positions:2026-09-26 answer 9", "positions:2026-09-19 answering the open question", "positions:2026-09-24 override shape diagonal",
      "positions:2026-09-25 preventing failure mode", "positions:2026-09-27 launch of phase 3's batches",
      "positions:2026-09-29 batch 7b's items 22 and 23", "positions:2026-09-28 two decisions of Fable's judgement",
      "positions:2026-09-24 exclusion route P's fork", "positions:2026-09-19 FlatArrays review's repair",
      "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop", "positions:2026-09-28 rungs re-running measurements",
      "ledger:461", "ledger:478", "ledger:421", "doc:explorations/reviews/overloading-judgement.md#3.6 The library's refused set, repaired",
      "doc:explorations/compile-ladder/plan-7b/probes/P1.md#4. The landed library",
      "doc:explorations/compile-ladder/plan-7b/probes/P1.md#5. L's devices, measured", "doc:explorations/compile-ladder/plan-7b/probes/P2.md#The answers",
      "doc:explorations/compile-ladder/rung-exclusion-remainder/REPORT.md#16. Decisions@TotalComparison drops its order",
      "doc:explorations/compile-ladder/rung-exclusion-remainder/SKEPTIC.md#5. The precedent search, and a device the rung did not list",
      "doc:explorations/reviews/batch-7R-conformance.md#Findings@Row 478 belongs", "doc:Specification/advanced/overloading.tex#Meet Rule",
      "code:Library/FortressLibrary.fsi#(** Potemkin exclusion traits..trait Rank3", "code:Library/FortressLibrary.fsi#trait StandardMin[",
      "code:Library/FortressLibrary.fsi#trait StandardMax[", "code:Library/FortressLibrary.fsi#trait StandardMinMax[",
      "code:Library/FortressLibrary.fsi#trait TotalComparison", "code:Library/FortressLibrary.fsi#trait ReadableArray[",
      "code:Library/FortressLibrary.fsi#trait SequentialGenerator[", "code:Library/FortressLibrary.fsi#trait FilterGenerator[",
      "code:Library/FortressLibrary.fss#object SimpleSeqFilterGenerator[", "code:Library/FortressLibrary.fsi#trait PossibleReductionPair",
      "code:Library/FortressLibrary.fss#trait PossibleReductionPair", "code:Library/FortressLibrary.fss#trait Range[",
      "code:Library/FortressLibrary.fsi#trait Range[", "code:Library/RangeInternals.fsi#open1Range(x: ZZ32)..open3Range(x: ZZ32",
      "code:Library/RangeInternals.fsi#openRangeHelper(_: ()->ZZ32)..openRangeHelper(_: ()->(ZZ32, ZZ32, ZZ32))",
      "Measured by the overloading judgement on private library copies", "The hidden layer, classified",
      "The compiled checker's exclusion rule is the designers'", "The one library's number tower is flat",
      "The one library's scalar ranges are over ZZ32 alone", "Every functional-method name of the library is reserved",
      "testSystem's four shards are one suite split by sorted index", "The interpreter's overload-ambiguity message names its two declarations",
      "The compiled checker reads a comprises clause as the 2012 texts do", "The true distance to the switch-over",
      "map:spec-to-implementation.md#4.2 The tower in", "map:dormant-code.md#1.1 Commented-out declarations in",
      "map:README.md#Touch this@Library/FortressLibrary.fss", "index:overloading"],
    checks: [
      "positions:2026-09-26 answer 9", "positions:2026-09-19 answering the open question", "positions:2026-09-24 override shape diagonal",
      "positions:2026-09-27 launch of phase 3's batches", "positions:2026-09-29 batch 7b's items 22 and 23",
      "positions:2026-09-28 rungs re-running measurements", "ledger:461", "ledger:478",
      "doc:explorations/reviews/overloading-judgement.md#3.6 The library's refused set, repaired",
      "doc:explorations/compile-ladder/plan-7b/probes/P1.md#4. The landed library",
      "doc:explorations/compile-ladder/plan-7b/probes/P1.md#5. L's devices, measured", "doc:Specification/advanced/overloading.tex#Meet Rule",
      "code:Library/FortressLibrary.fsi#(** Potemkin exclusion traits..trait Rank3", "code:Library/FortressLibrary.fss#object SimpleSeqFilterGenerator[",
      "code:Library/FortressLibrary.fss#trait PossibleReductionPair", "code:Library/FortressLibrary.fss#trait Range["],
    expectedMoves: [] }

const RUNGS = [S_ENTRY, C_ENTRY, W_ENTRY, L_ENTRY]
const HAS_RUNG = (id) => RUNGS.some(r => r.id === id)

const INTRO_RUNG = {
  S: "S revises the specification's two overloading chapters to the 2011 model the checker runs (answer 9): the sentence that overloads may not differ in static parameters goes, the paper's three rules and the positional rule are stated (the latter, under the POPL recheck's item 1.3 as a default, in a callout as a restriction of the compiled implementation), the coercion chapter gains one cross-reference sentence (the conversion decision of 2026-09-28) and, under Pavol's decision of 2026-09-29 on item 16, one callout at its passage on static resolution saying that walk chooses a coercion on the value until it takes the checker's coercions after the switch-over, the implicit bound becomes Any (Q1, decided in Pavol's words on 2026-09-29, left to S by batch N's rung T), and the originals are kept in the S1 form; under item 26's decision it restates four passages at the level of values, gives the Meet Rule its closed-trait case and revises the proof appendix to run-time uniqueness, its scope and row 487's closure assumption marked; under item 30's decision and the paper's instance rule it says which declaration a dispatch reaches and at which instance, each type parameter at its declared bound under the call's static return type, with a callout that both implementations take the value's type today, and it gives a lone type parameter with no narrowest candidate its bound in place of the union; under item 23's decision it rewords Appendix I's introduction to say that the entries follow the revival's decisions, each naming its own; and it rewords the claim of batch N's inference chapter and its Appendix I entry that the text states the rule the checker builds and no more, listing the checker's four gated departures (rows 508, 515, 516 and 518) in the entry.",
  C: "C makes the compiled checker check the return-type rule over every instance and refuse an override that reorders its own static parameters (answer 9, row 398), repairs the checker's half of row 492 by reading the meet of two closed traits through their clauses, in a coverage check local to overload checking that leaves ordinary subtyping and assignment as they are, types a call that sits between them by the intersection of its candidates' return types, with the proof addendum's acceptance pair as tests, and writes the expected failures of defect 3 and of row 496's two crashes; under the paper's instance rule it writes one expected-failure pair where the paper's instance and the value's type differ and the paper's ArrayList/List set as a test, turns the compiled lone-parameter test into a test of the written bound beside an expected failure for the unbounded case, and keeps the intersection typing within Astra's boundary.",
  W: "W makes walk choose between a generic and a plain declaration on their declared domains, so that the order they were written in no longer decides (answer 9), with the conversion decision's four items, row 478's cache key, row 157's AnyType case, row 159's two tests promoted and row 492's walk half, its runtime selection the ordered candidate family the proof covers, and under the paper's instance rule turns walk's lone-parameter test into a test of the written bound beside an expected failure for the unbounded case.",
  L: "L repairs the one library's refused overload families with the library's own devices (answer 9), makes two api headers say what their components say, and under item 22's decision gives TotalComparison the StandardMinMax parent beside Comparison, the library's device for a partial order that also has MIN and MAX.",
}
const INTRO_STOPS = {
  S: "for S, any edit under Specification-1.0-frozen/, normative text for a rule neither path will run once C lands (the paper's instance rule excepted, stated with its callout and expected failures), text on the checker's Bottom binding or the inference chapter's not-described item, which batch 8 writes, new text for a passage of an item whose answers line says not answered, a soundness claim for the coverage case stated without its scope and row 487's assumption, and a passage whose new text the decisions and judgements do not settle",
  C: "for C, an edit to compiler/StaticChecker.java, a library declaration newly refused that its section does not assign to rung L, a test whose verdict changes other than by C's intent (its own tests, row 492's and XXXInferLoneBoundUnion's), SkBetweenAssign's compiled verdict changing or BetweenTwoClosed's other than as the intersection typing gives, CoverageReturnBad accepted or CoverageReturnGood's verdict differing between its declaration orders, a change to the checker's shared subtyping, meet, equivalence or normalizer or to TypeHierarchyChecker.scala (the fallback's condition, reported and not made), the intersection typing extended to a generic overload that needs run-time instantiation (Astra's boundary, the fallback's condition), a checker change for the paper's ArrayList/List set or its instance rule, a stack overflow in the meet search, a ladder file moving down, and any walk edit",
  W: "for W, a test whose verdict changes other than by W's intent, an overload set whose load-time verdict changes other than the shapes its section names, an interpreter change for the paper's instance rule, and SkBetweenAssign's walk verdict changing",
  L: "for L, a team test line changed, a family whose only repair is a checker change, TotalComparison changed other than as item 22's decision, (b), states in its section, the value-form factories changed under Q4 = (1), and a test whose verdict changes other than by L's intent",
}
const INTRO_LIFTED = {
  S: "S rewrites normative text of the specification, one sentence of the inference chapter's rule among it under the paper's instance rule, and re-anchors the citations its edits move in test messages, no assertion changed (answer 9; the S1 form; the paper's instance rule)",
  C: "C makes the checker refuse two shapes it accepts today and, with row 492, accept the specification's Meet Rule example, typing a call that sits between two closed traits (answer 9; item 26's decision), and renames row 492's compiled expected failure into a plain test once it passes, its program unchanged, and rewrites XXXInferLoneBoundUnion into a plain test of the written bound (the paper's instance rule)",
  W: "W changes which declaration walk runs where a generic and a plain declaration tie, and which overload sets walk loads where the checker accepts them, and instantiates a generic declaration declared to return Any (answer 9; the conversion decision of 2026-09-28; item 30's decision), and renames row 492's walk expected failure into a plain test once it passes, no assertion changed, and rewrites XXXInferLoneUnionWalk.fss into a plain test of the written bound (the paper's instance rule)",
  L: "L adds exclusions and markers to library traits (answer 9), makes two api headers say what their components already say, and gives TotalComparison the StandardMinMax parent (item 22's decision), restoring a walk answer of before batch 7",
}
const OVERLAP_RUNG = {
  S: "S edits Specification/basic/overloading.tex, advanced/overloading.tex, basic/conversions-coercions.tex (three passages, and under item 16's decision the callout at its passage on static resolution), appendices/future.tex, its own subsections of appendices/changes.tex (after the last revision entry, before Passages not yet revised) and that subsection, basic/trait-parameters.tex (the implicit bound, which batch N's rung T left to S), under item 26's decision basic/types-vals-vars.tex, basic/functions.tex, basic/components/source-code.tex and appendices/overloading-function.tex, and basic/inference.tex (its two callouts, and under the paper's instance rule its union sentence) with its Appendix I entry (the Change, the rationale and the Effect), and the Rationale of Appendix I's entry Instantiation exclusion (one citation); it re-anchors the citations its edits move in test messages; never Specification/fortress.pdf.",
  C: "C edits checker files under ProjectFortress/src/com/sun/fortress/scala_src/ (OverloadingOracle.scala, OverloadingChecker.scala, and under item 26's decision types/TypeAnalyzer.scala, for a coverage helper the overloading check alone calls, and the ambiguity check batch N built in typechecker/impls/Functionals.scala) and adds tests in ProjectFortress/compiler_tests/, where it renames XXXComprisesMeetCompiled once row 492's half passes and rewrites and renames XXXInferLoneBoundUnion.",
  W: "W edits OverloadedFunction.java, FGenericFunction.java, GenericFunctionOrMethod.java, GenericConstructor.java, under item 30's decision MakeInferenceSpecific.java and under item 26's decision types/FType.java and FTypeTuple.java, and what else under interpreter/ it needs, not interpreter/glue/prim/, and adds tests in ProjectFortress/tests/, where it renames XXXComprisesMeetWalk.fss once row 492's half passes and rewrites and renames XXXInferLoneUnionWalk.fss.",
  L: "L edits Library/RangeInternals.fsi and .fss and, in Library/FortressLibrary.fsi and .fss, only the declarations section 4 of the record names as L's, and adds one test in ProjectFortress/tests/.",
}

const BATCH_INTRO = [
  "This run is climb batch 7b, the second run of the record CLIMB-BATCH-7.md and phase 3's batch of answer 9, as Pavol decided it on 2026-09-26: the specification's sentence that overloads of one name may not differ in static parameters goes, in four rungs, specification, checker, walk and library, with the four small items of his decision on conversions and overloading of 2026-09-28, his decision of 2026-09-29 on the record's item 26, option 1 of its top-tier judgement with the three points of Astra's proof addendum built into the briefs of S, C and W, his two decisions of that afternoon from the review of his decisions, the implicit bound Any in his own words and walk's run-time choice of coercions accepted as the interpreter's limit with one callout in S and item 16 closed, his decision of 2026-09-29 on the record's item 30, option 1 of its top-tier judgement, his decision that evening adopting the POPL 2019 paper's instance rule, which gives item 30's instance and replaces the inference chapter's union sentence for a lone type parameter, his answers that evening to the record's items 22 and 23, their recommended options, and the recommended defaults of the POPL recheck's items 1.1, 1.3, 1.4, 1.5 and 1.7, the defaults while he has not answered. Batch 7 (rungs H, A and B), batches 7R and 7C, batch 6.5's two runs and batch N's first run have landed before it, batch N's second run retired by his split of the numeral switch, so the FortressLibrary api reaches its overloading check on the count stage, and walk's inference and its re-instantiation by promotion (batch N's rung K) are in the base.",
  RUNGS.map(r => INTRO_RUNG[r.id]).join(' '),
  "Each rung's section of the record opens with its answers line: Pavol's answers to the record's questions, or the default each takes while he has not answered, and the items that stay open. Text a section marks with an answer applies only while that answer is written in the line; an item marked not answered is left as the section says, and new text for it is a stop.",
  "A rung that measures the checker count or the distance stage takes as its before the last landed gate's table and per-site list, the ones the gate itself compares against (checker-count.txt, distance.txt and distance-sites.tsv in the newest explorations/compile-ladder/climb-batch-*/gate/ on the base), and does not run the stage on its unchanged base; it runs the after once, on its own tree, into its tmp/SLUG/. If git log <the commit that landed that table>..<base> -- Library/ ProjectFortress/ prints a commit, the base has changed under the table, and the rung runs the stage on its base and says why (POSITIONS.md, 2026-09-28, on rungs re-running measurements the landed gate had already taken; the process review's measure 4, explorations/reviews/process-review-6b-7-7R.md section 9).",
  "Each rung's tail ends with its briefing entry by entry, each entry with one line on why it is there and what the rung does with it (the same review's measure 5, approved with it): the worker and the repair round read that line before the entry and act on it, and the skeptic and the judges, who are not given the tail, find each key's line beside it in explorations/compile-ladder/plan-7b/manifest/lists7b.py.",
  'The stops reserved for Pavol in this run, on top of the standing ones: ' + RUNGS.map(r => INTRO_STOPS[r.id]).join('; ') + '; and any rung editing a declaration or a file section 4 of the record names as another rung\'s.',
  'Standing stops lifted by his decisions and by nothing else, none of them deleting a test: ' + RUNGS.filter(r => INTRO_LIFTED[r.id]).map(r => INTRO_LIFTED[r.id]).join('; ') + '.',
  "Every stop reserved for Pavol in this run is reversible (POSITIONS.md, 2026-09-27, on the stops a batch record reserves for him: \"These don't need me now. They are reversible things I can review later. Don't block start of next batches on these.\"): a rung that meets one finishes as its section says, lists it in stopsMet with liftedBy citing that entry, POSITIONS.md 2026-09-27, the stops, and lands; the stop is listed for his review, and neither the push nor the next batch waits for it. A stop the record does not reserve, or one that cannot be undone, holds the commit stage's push as before.",
  "An output difference that the untouched tree already shows from run to run, with the test's verdict unchanged, is a ledger row and not a stop (POSITIONS.md, 2026-09-26, rung D's stop).",
  "Every choice a rung makes that its section leaves to it is reported as a decision, with the alternatives considered and the evidence that settled it.",
  "The gather's rules: S lands only if C lands, whatever the approved list says: when C is not approved, the gather applies no file of S and folds its findings as for any rung that did not land. After S and C are applied, the gather checks each rule S's text states against C's landed test programs and the refusals they pin, fixes S's text where the decisions settle a mismatch and reports any other to the review as blocking. Row 492 closes only if both C's and W's halves land; if one lands alone, the row gets a note and the other half's expected failure stays. Under item 26's fallback, when C lands with row 492's expected failure kept because its half needs broader subtype or closure repairs, the gather leaves out S's P2 pieces (the Meet Rule's closed-trait case and its method forms, fact 2's restatement, the typing sentence, the proof appendix's revision and future.tex's done mark) and names P2 in Passages not yet revised with row 492 and batch 8, while S's P1, P3, P4 and covering land. If W does not land, XXXInferLoneUnionWalk.fss keeps its verdict, its assertion holding under the bound as under the union, and the gather rewords its message to the bound, in plain words, no assertion changed.",
  "A rung that edits a chapter of Specification/ re-anchors, in its own commit, every citation of a line of that chapter that its edit moves in the messages and comments of ProjectFortress/tests/, compiler_tests/ and library_tests/, by the map of unchanged lines from git show <base>:<chapter> to its tree, and never changes an assertion (explorations/compile-ladder/climb-batch-6/JUDGE-review.md, finding 1); the gather re-anchors the same way a citation that S's edit moved in a test another rung renamed. A new test cites no specification line: its messages say in plain words what is checked and the answer, naming a rule by its chapter or section, and carry no ledger row, POSITIONS entry, FACTS title or PLAN item, which go in the commit message.",
  "No rung commits Specification/fortress.pdf: the commit stage rebuilds the specification once on the landed tree, since Part IV is rendered from the .fsi files L changes and S edits the specification.",
  "If the harness refuses an agent's write of REPORT.md, record.md or SKEPTIC.md, the agent says so and carries the text in its structured result as fully as the fields allow, and every list a rung hands Pavol is a section of its REPORT.md, which the landing report carries to him.",
  "Cite a FACTS.md entry by its bold title beside its line, and a POSITIONS.md decision by its date and entry name, since both files' line numbers move.",
].filter(Boolean).join(' ')
const BATCH_OVERLAPS = RUNGS.map(r => OVERLAP_RUNG[r.id]).join(' ') + ' ' + "No source, library or specification file is shared: L alone edits Library/, C alone scala_src/, W alone interpreter/, S alone Specification/. The shared directory is ProjectFortress/tests/, where W and L add files with distinct names by topic, W renames XXXComprisesMeetWalk.fss once row 492's walk half passes and rewrites and renames XXXInferLoneUnionWalk.fss, and C rewrites and renames XXXInferLoneBoundUnion in compiler_tests/; S changes the messages and comments of existing tests only where its edits move a citation, never an assertion. A file added there moves the testSystem shards, which the gate compares by their sum. C's rule refuses the library's cond pair under the api's parent, and L's api line clears it, so the two meet only on the merged tree: C's table shows the new errors, L's its lines, the merged tree neither, and the post-batch review ties every moved row to a rung edit. The checker count reads C's and L's changes, not S's or W's. The files every rung reaches are the three record files, folded centrally by the gather."
// =========================== END MANIFEST ==================================

// ===========================================================================
// BATCH_1_EXAMPLE - batch 1's manifest, verbatim, kept as the worked example of
// what the block above must hold (its four tails and four rung entries; the
// record is explorations/coordinator/CLIMB-BATCH-1.md). The script does not
// read it. It sits outside the MANIFEST markers on purpose, so that replacing
// the block for the next batch leaves it in place.
// ===========================================================================

const B1_F_TAIL = [
"",
"## Your rung: F - the functional methods of trait RR64",
"",
"SLUG is rung-rr64-functions. WORKTREE is /home/user/fortress-rr64, branch wip/rung-rr64-functions.",
"",
"The problem (the batch record, section F): the target program calls exp and log on RR64 - exp(z - (BIG MAX[t <- z] t)) in the softmax at explorations/apl/mg/MicroGptApl.fss:42 and explorations/run-c4/src/MicroGptFlat.fss:28, log(pick(pr, tg)) in the loss at MicroGptFlat.fss:61 - and passes exp and log as function values to Array.map at explorations/apl/mg/FlatArrays2.fss:44-45; it calls round three times. The compiler prelude has none of exp, log, sin, cos, tan, asin, acos, atan, atan2, round, truncate, and has ceiling and floor commented out at ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:439-440. On the ladder, buffons.fss stops on ceiling/floor, roundBug.fss on round/truncate, juxtTwice.fss and oprTests.fss on the transcendentals.",
"",
"Add all thirteen as functional methods of trait RR64 - declared with an explicit self, so that exp(x) and the bare name exp both work - in CompilerBuiltin.fsi and .fss. The shape to copy is opr SQRT(self): RR64 = jDoubleSQRT(self) at CompilerBuiltin.fss:900, with its native bound in the import java block at .fss:205-214. floor and ceiling need no native: doubleFloor and doubleCeiling are already bound at .fss:212-213.",
"",
"The specification. Specification/basic-lib/numbers.tex:464-476 defines floor, ceiling, round and truncate on QQ, returning ZZ, with an exact half going to the EVEN integer. Read those lines yourself. No prose chapter names exp, log or a trigonometric function; for those the specification is silent and the precedent governs.",
"",
"The precedent is the interpreter: Library/FortressLibrary.fsi:319-332 and ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:162-190. Two deviations to argue and record: the specification's QQ methods return ZZ where the interpreter's RR64 versions return RR64 or ZZ64; and Java's Math.round rounds a half UP, so a round built on it violates numbers.tex:470-472 - use Math.rint or argue why not, and put the half-way cases in your test.",
"",
"The natives go in ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java or in a new file beside it; argue the choice in one line. Your edit is in .java, so ant compileAll is required before your test can pass, then the full five-component library rebuild.",
"",
"The test goes in ProjectFortress/library_tests/: every one of the thirteen, including exp(0) = 1, log(exp(1)) within an epsilon of 1, atan2 in each quadrant, round(2.5) = 2 and round(3.5) = 4 and round(-2.5) = -2, truncate(-2.7) = -2, floor(-2.5) = -3, and exp passed as a function value. Your ladder subset: buffons, roundBug, juxtTwice, oprTests, realArith, testRR32, before and after.",
"",
].join('\n')

const B1_M_TAIL = [
"",
"## Your rung: M - Maybe, Just and Nothing for the compiler world",
"",
"SLUG is rung-maybe. WORKTREE is /home/user/fortress-maybe, branch wip/rung-maybe.",
"",
"The problem (the batch record, section M): 59 of the 139 interpreter tests stopped at the disambiguate wall name Maybe, Just or Nothing, more than any other name, and the compiler world declares none of them. The target program does not name it; the rung is here for what it unblocks.",
"",
"The specification's prose uses the type as a given and settles one thing: Specification/basic/exceptions.tex:62-69 declares settable message: Maybe[\\String\\] on Exception, and :114-117 write the defaults as = Nothing - an unparameterised Nothing where a Maybe[\\String\\] is expected. Read those lines.",
"",
"Two precedents, and they disagree. The interpreter: value trait Maybe[\\T\\] at Library/FortressLibrary.fss:1306, value object Just[\\T\\](x:T) at :1312, value object Nothing[\\T\\] at :1342. The team's own draft for THIS world, commented out at Library/CompilerLibrary.fsi:217-229: Maybe[\\T\\] comprises { Just[\\T\\], NothingObject[\\T\\] } with coerce(x: Nothing) - which is what makes the specification's = Nothing type-check, because the compiler path has coercion and the interpreter does not. The compiler world already implements the protocol under other names: Option, Some, None, NoneObject at CompilerBuiltin.fsi:648-660.",
"",
"The decision is yours and it must be argued: the team's draft or the corpus. Both cannot coexist. Do NOT delete or rename Option, Some, NoneObject or None: removing a declaration a gated test uses is a reserved stop.",
"",
"The test goes in ProjectFortress/library_tests/: construct both cases, dispatch on them, get and its default form, a for over a Maybe, and - if you take the draft - a binding written as = Nothing at a Maybe type, coerced. Your ladder subset: ExceptionScoping.fss and oddJuxt.fss, before and after.",
"",
].join('\n')

const B1_N_TAIL = [
"",
"## Your rung: N - the named integral operators on ZZ32 and ZZ64",
"",
"SLUG is rung-integral-ops. WORKTREE is /home/user/fortress-ints, branch wip/rung-integral-ops.",
"",
"The problem (the batch record, section N): the target program uses MOD 32 times on ZZ32 indices, and the compiler prelude has no MOD, REM, GCD, LCM, LSHIFT or RSHIFT on ZZ32 (CompilerBuiltin.fsi:202-256) or ZZ64 (:147-201). On the ladder chain0.fss (GCD, LCM, MOD) and rshiftbug.fss (RSHIFT) stop on nothing else.",
"",
"The specification: Specification/basic-lib/basic-integers.tex:439-456. REM is the remainder of the truncating division; MOD is the remainder of floor division, and both throw IntegerDivisionByZero; GCD and LCM at :247-248. Read those lines yourself. So MOD is NOT Java's %, which is REM: (-7) MOD 3 is 2 and (-7) REM 3 is -1. Put every sign combination in your test.",
"",
"The precedent: the interpreter declares the six in trait Integral[\\I\\] at Library/FortressLibrary.fss:622-636. The compiler world has no native for any of them and needs none. Pure Fortress inside the compiler world's flat design; do not introduce Integral or touch the tower. Division by zero: what DIV does today on the compiled path is the precedent; establish it with a probe and record it.",
"",
"The test goes in ProjectFortress/library_tests/: every operator, every sign combination for MOD and REM, GCD and LCM on the identity GCD(a, b) LCM(a, b) = |a b|, the shifts against << and >>, and a ZZ64 case beyond ZZ32. Your ladder subset: chain0.fss and rshiftbug.fss, before and after.",
"",
].join('\n')

const B1_T_TAIL = [
"",
"## Your rung: T - recordTime and printTime",
"",
"SLUG is rung-timing. WORKTREE is /home/user/fortress-time, branch wip/rung-timing.",
"",
"The problem (the batch record, section T): nestedTransactions1.fss, nestedTransactions2.fss and nestedTransactions4.fss in ProjectFortress/tests/ name recordTime and printTime and nothing else at the disambiguate wall, so they are the ladder's likeliest passes.",
"",
"The specification is silent: no prose chapter names recordTime, printTime or nanoTime. Precedent governs; your spec: line is none with that grep.",
"",
"The precedent: Library/FortressLibrary.fss:4109-4118 - nanoTime(): ZZ64, a top-level mutable __globalTimeInformation: ZZ64 := 0, recordTime and printTime. The compiler world's nanoTime(): RR64 is declared at CompilerBuiltin.fsi:23; the type is RR64 where the interpreter's is ZZ64, a deviation you record, not one you repair.",
"",
"The top-level mutable variable now lives in a transactional cell, and yours is the first library use of it. Two facts from the repair batch bear on you: a top-level variable exported through an api does not link (ledger row 320), so the variable must NOT be exported through CompilerLibrary.fsi; and the three nestedTransactions files call recordTime and printTime around atomic blocks.",
"",
"The test goes in ProjectFortress/library_tests/: recordTime(0), work that takes measurable time, printTime(0), and PASS; and one call pair around an atomic block. Your ladder subset: the three nestedTransactions files, before and after.",
"",
].join('\n')

const BATCH_1_EXAMPLE = {
  BATCH: 1,
  BATCH_RECORD: 'explorations/coordinator/CLIMB-BATCH-1.md',
  BATCH_INTRO: 'This batch is the first ordinary batch of the ladder after the repair batch of 2026-09-19: four library rungs, chosen by what the target program (microGPT compiled to bytecode) names and by what the ladder blocks on.',
  BATCH_OVERLAPS: 'F and N both edit CompilerBuiltin.fsi and .fss in different traits (RR64; ZZ32 and ZZ64); M may edit either prelude file; T edits CompilerLibrary.',
  LEDGER_FROM: 329,   // the first free ledger row number when the batch was planned
  RUNGS: [
  { id: 'F', slug: 'rung-rr64-functions', path: '/home/user/fortress-rr64',  branch: 'wip/rung-rr64-functions', tail: B1_F_TAIL, expectedMinutes: 45, writesState: false,
    blurb: 'the functional methods of trait RR64 the program and the ladder need - exp, log, sin, cos, tan, asin, acos, atan, atan2, floor, ceiling, round, truncate. The only rung of this batch that touches .java (a native helper under nativeHelpers/).',
    expectedMoves: ['tests/buffons.fss: typecheck or better', 'tests/roundBug.fss: typecheck or better', 'tests/juxtTwice.fss: typecheck or better', 'tests/oprTests.fss: typecheck or better'] },
  { id: 'M', slug: 'rung-maybe',          path: '/home/user/fortress-maybe', branch: 'wip/rung-maybe',          tail: B1_M_TAIL, expectedMinutes: 40, writesState: false,
    blurb: 'Maybe, Just and Nothing for the compiler world, over the Option machinery it already has. Library only; carries a naming decision.',
    expectedMoves: ['tests/ExceptionScoping.fss: typecheck or better', 'tests/oddJuxt.fss: typecheck or better'] },
  { id: 'N', slug: 'rung-integral-ops',   path: '/home/user/fortress-ints',  branch: 'wip/rung-integral-ops',   tail: B1_N_TAIL, expectedMinutes: 45, writesState: false,
    blurb: 'the named integral operators MOD, REM, GCD, LCM, LSHIFT, RSHIFT on ZZ32 and ZZ64. Library only, pure Fortress.',
    expectedMoves: ['tests/chain0.fss: pass', 'tests/rshiftbug.fss: codegen or better'] },
  { id: 'T', slug: 'rung-timing',         path: '/home/user/fortress-time',  branch: 'wip/rung-timing',         tail: B1_T_TAIL, expectedMinutes: 40, writesState: true,
    blurb: 'recordTime and printTime over the existing nanoTime and a top-level mutable variable. Library only.',
    expectedMoves: ['tests/nestedTransactions1.fss: pass', 'tests/nestedTransactions2.fss: pass', 'tests/nestedTransactions4.fss: pass'] },
  ],
}

const BATCH_DIR = 'explorations/compile-ladder/climb-batch-' + BATCH
const GATE_DIR = BATCH_DIR + '/gate'
const SITES = 'explorations/compile-ladder/gate/distance-sites.tsv'   // the distance stage's per-site list, one fixed path overwritten at each landing (post-mortem 2026-09-29, synthesis item 37)
const LOG_DIR = 'tmp/gate-batch-' + BATCH          // untracked: .gitignore:64 ignores /tmp/, and .gitignore:42,46 would swallow .out/.log anywhere
const GATE_OUT = LOG_DIR + '/out'   // the gate writes here during the run, untracked; the commit stage copies it to GATE_DIR, so a run that stops before that stage leaves nothing untracked in the tree (climb-batch-3-redesign.md, f2; Pavol, 2026-09-24)

// The scatter order: longest expected worker first. The manifest order is kept
// for ledger numbering and for the gather, which never uses this one.
const SCATTER = RUNGS.slice().sort((a, b) => (b.expectedMinutes || 0) - (a.expectedMinutes || 0))

// ---------------------------------------------------------------------------
// The briefing: the first step of every role that works on a rung. The agents
// were not trained on Fortress, the language was never finished, and what they
// write from other languages' habits contradicts the specification and the
// library unless they have absorbed what the project has gathered (Pavol,
// 2026-09-27). And what the agents of the later climbs missed was on record: a
// ledger row, a POSITIONS entry, an earlier judge's ruling, the library's own
// precedent (explorations/reviews/worker-global-decisions.md). So the planner
// writes each rung's briefing, a list of facts-extract.sh keys in its manifest
// entry, carrying besides the record the specification's sections, the notes
// and the precedent code the rung's subject touches: the rung worker reads it whole as its step 1, and the
// skeptic, the repair round and the judges read its checks sub-list, the
// decisions and ledger rows their checks need and the specification's sections
// and precedent code they compare against. Nothing is printed to every
// agent alike: a blanket read first cost more than the gathering it could
// remove, and on skeptics and repairs it was a cost in every case
// (worker-context-cost.md). The tool prints in parts of at most 28 KB, under
// what one shell command shows an agent, and says the size.
// climb-batch-workflow.md, "Shared prefix".
// ---------------------------------------------------------------------------

const LOOKUP_TOOL = 'explorations/coordinator/tools/facts-extract.sh'
const keyOk = (q) => typeof q === 'string' && q.trim() !== '' && !q.startsWith('-') && !/["\x60$\\\n]/.test(q)
RUNGS.forEach(r => {
  for (const field of ['briefing', 'checks']) {
    if (r[field] === undefined) continue
    const bad = Array.isArray(r[field]) ? r[field].filter(q => !keyOk(q)) : [String(r[field])]
    if (bad.length) throw new Error('rung ' + r.id + ': ' + field + ' is a list of strings, none empty or opening with -, and none holding a double quote, a backtick, a dollar sign, a backslash or a newline, since each is rendered in double quotes: ' + bad.join(' | '))
  }
  const stray = (Array.isArray(r.checks) ? r.checks : []).filter(q => !(Array.isArray(r.briefing) && r.briefing.includes(q)))
  if (stray.length) throw new Error('rung ' + r.id + ': checks is a sub-list of briefing, and these keys are not in the briefing: ' + stray.join(' | '))
})
const keysOf = (r, field) => Array.isArray(r[field]) ? r[field] : []
// The command as the prompt shows it, one key a line, indented as code.
const lookupCommand = (keys) => ['        ' + LOOKUP_TOOL + ' \\'].concat(keys.map((q, i) => '            "' + q + '"' + (i < keys.length - 1 ? ' \\' : '')))
const SEARCH_FIRST = 'explorations/coordinator/INDEX.md, FACTS.md and POSITIONS.md beside it, the gap ledger (explorations/fortress-gap-ledger.md) and the maps under explorations/coordinator/map/'
const MORE_PARTS = 'Output that ends by naming a next part is continued by the same command with --part 2, then 3, until it says it printed the last.'

// Step 1 of the rung worker, and of a worker resumed after a stop: the rung's
// whole briefing.
function briefingStep(rung, where) {
  const keys = keysOf(rung, 'briefing')
  if (!keys.length) return ['1. This rung has no briefing. Before anything else, search ' + SEARCH_FIRST + ' for its topics, before the tree.']
  return [
'1. You are working in Fortress, a language you were not trained on, whose design was never finished. It is not Java or Scala, and habits from them often mislead here. Before anything else, run this command in ' + where + ' and read all it prints. It is your mission briefing, gathered for this rung by the batch\'s planner: the decisions on record and earlier rulings, the facts established so far, the map of the tree, the gap-ledger rows, the specification, the notes and probes already on file, and the library code that already solves the same kind of problem. Learn from it how Fortress does things, then do the rung: design in the library\'s own way, with the ledger and the decisions on record in mind. Where the rung takes you past what the briefing covers, look in the same places before you choose. ' + MORE_PARTS,
'',
...lookupCommand(keys),
'',
'   For a topic the briefing does not cover, search ' + SEARCH_FIRST + ' before the tree.',
  ]
}

// Step 1 of a skeptic, a repair round and a judge, on one rung (rungs = [rung],
// in its worktree) or on the merged tree (rungs = RUNGS, in the main tree): the
// checks slice of each rung's briefing. lead opens the step: step 1 of a
// numbered order by default, the words given in a role that has none.
function sliceStep(rungs, where, lead) {
  const sliced = rungs.filter(r => keysOf(r, 'checks').length)
  const one = rungs.length === 1
  const open = lead || '1. Before anything else,'
  if (!sliced.length) return [open + ' search ' + SEARCH_FIRST + ' for the decisions and ledger rows ' + (one ? 'this rung rests on' : 'the rungs rest on') + ', before the tree: ' + (one ? 'this rung\'s briefing has no checks list.' : 'no rung of this run has a checks list in its briefing.')]
  return [
open + ' run ' + (sliced.length > 1 ? 'these commands' : 'this command') + ' in ' + where + ' and read all ' + (sliced.length > 1 ? 'they print' : 'it prints') + '. ' + (one
  ? 'It is the part of this rung\'s briefing that the checks on it need: the decisions of Pavol\'s and the ledger rows the rung rests on, the rulings and facts they turn on, and the specification\'s sections and the precedent code the checks compare against, each whole. The rung\'s first pass read the whole briefing.'
  : 'Each is the part of a rung\'s briefing that the checks on it need, for ' + sliced.map(r => r.id).join(', ') + ' in that order: the decisions of Pavol\'s and the ledger rows each rung rests on, the rulings and facts they turn on, and the specification\'s sections and the precedent code the checks compare against, each whole.') + ' ' + MORE_PARTS,
'',
...[].concat.apply([], sliced.map((r, i) => (i ? [''] : []).concat(one ? [] : ['        # ' + r.id]).concat(lookupCommand(keysOf(r, 'checks'))))),
'',
'   For an entry ' + (one ? 'the slice lacks' : 'the slices lack') + ', search ' + SEARCH_FIRST + ' before the tree.',
  ]
}

// ---------------------------------------------------------------------------
// The shared prefix. batched-climb-plan.md section 8: every agent in a batch
// opens with the same block, byte-identical and in the same order. No backticks
// anywhere in these strings; code is indented instead.
// ---------------------------------------------------------------------------

const PREFIX = [
"# Fortress climb batch " + BATCH + " - shared prefix",
"",
"You are an agent in the Fortress revival's compile-path climb (@palimondo's revival of Sun's Fortress programming language). " + BATCH_INTRO + " Your brief carries your rung's section of " + BATCH_RECORD + " word for word and your briefing prints the decisions it rests on; read the record's sections 1 and 2 only where your tail points you there, and never the whole file.",
"",
"## The batch manifest",
"",
RUNGS.length + ' rungs, each in its own worktree on its own branch, two running at a time, gated once together after the merge:',
"",
RUNGS.map(r => '- ' + r.id + ', slug ' + r.slug + ', worktree ' + r.path + ', branch ' + r.branch + ': ' + r.blurb).join('\n'),
"",
'All branches are off ' + BASE + ' on main. ' + BATCH_OVERLAPS + ' Batch rule 1 - no two rungs add or change the same declaration, trait body or operator - is what keeps the merge clean; the merge is the coordinator\'s, not yours.',
'',
'## Your worktree',
'',
'Work ONLY in the worktree your tail names. The other rungs are running at the same time in their own worktrees; never read or write outside your own. Never touch /home/user/fortress, which is the main tree.',
'',
'Set up every shell (substitute your worktree path for WORKTREE):',
'',
'    cd WORKTREE',
'    source explorations/experiment/env.sh',
'    export TMPDIR=WORKTREE/tmp',
'    export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=WORKTREE/tmp"',
'',
'env.sh sets FORTRESS_HOME from its own location, so check that echo $FORTRESS_HOME prints your worktree and not /home/user/fortress. It also runs rm -rf /tmp/fortress*rats; source it once per shell and never mid-run, because the other agent\'s Rats! temp directories live there too. The JDK is at /usr/lib/jvm/java-25-openjdk-amd64 and the box has 4 cores; do not spend a call probing for either.',
'',
'ProjectFortress/build has been copied in so javac is incremental, but ant compileAll\'s scalac step has no uptodate guard (build.xml:547-568) and is a full rebuild wherever it runs; budget for that. Your default_repository/caches/ starts empty and cannot be warmed from the main tree, because the analysed-cache key hashes the source path (NamingCzar.deCaseName, compiler/NamingCzar.java:243-245). So after ant compileAll you must rebuild the bytecode cache in library order:',
'',
'    cd ProjectFortress',
'    ../bin/fortress compile LibraryBuiltin/AnyType.fss',
'    ../bin/fortress compile LibraryBuiltin/CompilerBuiltin.fss',
'    ../bin/fortress compile ../Library/CompilerLibrary.fss',
'    ../bin/fortress compile ../Library/CompilerAlgebra.fss',
'    ../bin/fortress compile ../Library/CompilerSystem.fss',
'',
'about 145 s cold: AnyType 21, CompilerBuiltin 104, CompilerLibrary 17, CompilerAlgebra 2, CompilerSystem 1. Two operational traps measured in rung 7: a fortress compile whose source has not changed writes nothing and exits 0; and a change to a native helper\'s signature leaves a stale class in default_repository/caches/nativewrapper_cache that must be deleted or the old signature is what the run links against.',
'',
'## Long commands: run them in the background and poll, and never pipe ant through tail',
'',
'The Bash tool has a 10-minute ceiling and ant testFast is longer than that. Never pipe ant (or any long command) through tail: the summary you need is at the end and you will have to re-run to see it, which cost 21.7 minutes of the last climb. Capture the full output to a file under tmp/ and grep the file. Use these two helpers rather than inventing a sleep loop - the last batch lost 8.2 minutes to polls that overshot their sentinel:',
'',
'    run_bg () {            # run_bg <logfile> <command string>; the subshell makes the redirection cover the whole string, so a cd inside it neither escapes the log nor moves a relative log path',
'        nohup bash -c "( $2 ) > \'$1\' 2>&1; echo EXIT=\\$? >> \'$1\'" >/dev/null 2>&1 &',
'    }',
'    wait_for () {          # wait_for <logfile> [max-seconds, default 270]; 5-second granularity; call it again if it times out',
'        local n=0',
'        while ! grep -q \'^EXIT=\' "$1" 2>/dev/null ; do',
'            sleep 5 ; n=$((n+5))',
'            [ "$n" -ge "${2:-270}" ] && { echo "still running after ${n}s" ; return 1 ; }',
'        done',
'        grep -n \'^BUILD \\|^Total time:\\|^EXIT=\' "$1"',
'    }',
'',
'The default bound is 270 s so that each call returns inside the prompt cache\'s five minutes: a longer wait makes your next call write your whole context to cache again, which was half of all the tokens the batches wrote. Call wait_for again until it prints the BUILD line. Do not chain shorter sleeps in one call.',
'',
'Stop or kill only processes that run under your own worktree\'s path (readlink /proc/<pid>/cwd, or the path in their arguments), never by a script\'s name across the box: the other agents of the batch run copies of the same scripts in their own trees, and climb batch 6.5b\'s rung V, stopping its own pass by the name count-run.sh, killed rung E\'s corpus passes (explorations/reviews/batch-6.5b-review.md, finding 4).',
'',
'Your scratch (probe programs, captured outputs, build logs, lists, copies of tools) goes under tmp/SLUG/ in your worktree, which .gitignore:64 ignores. It is never committed, on your branch or anywhere. Your skeptic and your judge read it there.',
'',
'## Your briefing - read it before you search the tree',
'',
'You were not trained on Fortress, and the language was never finished: what you would write from other languages\' habits often contradicts its specification and its library. And the agents of the early climbs went wrong on decisions made locally, where what they missed was on record: a decision of Pavol\'s in explorations/coordinator/POSITIONS.md, a row of the gap ledger (explorations/fortress-gap-ledger.md), an earlier judge\'s ruling, the library\'s own way for the same family. So the batch\'s planner gathered a briefing for each rung: the POSITIONS.md entries, the ledger rows and the earlier rulings the rung rests on, the specification\'s sections its subject touches, the notes already written on it, the library code that is the precedent for the same kind of problem, and the explorations/coordinator/FACTS.md entries (what the project has established, grouped by area, each cited by its bold title) and the map rows and sections of its area, each printed whole by ' + LOOKUP_TOOL + '. Step 1 of every role that works on a rung runs it: the rung worker reads the whole briefing, and the skeptic, the repair round and the judges read the part of it that their checks need. For a topic it does not cover, search explorations/coordinator/INDEX.md (one line per standalone note), FACTS.md, POSITIONS.md, the ledger and the relevant map below before the tree. Cite a FACTS entry by its bold title.',
'',
'## The territory map - read the parts your task needs, do not go looking',
'',
'In 36 agents of the last climb not one of these was opened, and that is the direct cause of what the conformance review found. They are in explorations/coordinator/map/:',
'',
'- README.md - the synthesis: the gaps on the path in dependency order, the development loop\'s slow spots, and a touch-this-affects-that map.',
'- modules-and-phases.md - the repository\'s architecture and both pipelines phase by phase, with a table of where the interpreter and compiler paths diverge.',
'- spec-to-implementation.md - per language feature: its parser rule, checker class, interpreter site, codegen site and prelude location. This is how you answer "where does this fix belong".',
'- test-coverage.md - what each corpus and each gate target actually covers, and what is dark.',
'- design-intent-sources.md - where the design intent is written down: the papers, the spec\'s note boxes, the suppressed appendices. Section 6 is a table by design area.',
'- dormant-code.md - code that is present and switched off, with the reason and the repair.',
'',
'## Four rules every batch enforces',
'',
'1. "Where does this fix belong" is a required step, answered before any edit. Use spec-to-implementation.md and modules-and-phases.md. Rung 7 is the case in point: it wrote a run-time implementation without finding that INTEGERLITERALFOLDING is already wired before TYPECHECK (compiler/phases/PhaseOrder.java:57,142), and without engaging the team\'s comment three lines below the block it cited: "Do not enable these until coercion is implemented; doing so will cause all our arithmetic to occur on IntLiterals" (LibraryBuiltin/FortressBuiltin.fss:483-485).',
'',
'2. Precedent search before writing code. Ask "has the team solved this here already, and in how many ways", and answer it by citation. Rung 3 is the case in point: the right shape existed twice in VarCodeGen.java and the wrong shape once, and it copied the wrong one. And a precedent that repaired a defect is evidence the same defect is elsewhere in that file: count the sites and give the number. The repair batch\'s refusal was exactly this - the brief had named rung 0\'s guard and said not to redo it, and 22 unguarded sites in the same two files were the refusal.',
'',
'3. The specification\'s prose chapters are the standard; the api renderings are not. Specification/library/structure.tex:25-31 says Part Library "is largely automatically generated from the API code for the libraries themselves", so citing Specification/library/apis/*.tex to justify an edit to the matching .fsi is circular, and two rung reports did exactly that. Cite Specification/basic/ and Specification/basic-lib/. Cite the passage, not the grep hit: read at least ten lines either side of every line you cite before you cite it. The repair batch\'s only two unopened citations came from a grep piped through head, and the sentence that settled the question (basic-integers.tex:569) was one line below the citation and contained none of the grep\'s words.',
'',
'4. The interpreter is evidence, not an oracle. The static type checker runs only on the compile path and walk turns it off, so the interpreter accepts programs the language does not and reports what would be type errors as run-time dispatch failures; 55 ledger rows record its own defects. When walk and the compiled run disagree, that is a question and the specification answers it. Three real outcomes: the specification settles it against the compiled run, so repair; it settles it against the interpreter, so the compiled side may be right and a ledger row is owed against the interpreter; or the specification is silent. A silent specification is NOT a reason to stop - it is the reason to think harder: review the architecture around the construct, derive the candidate behaviours with what each costs and what else it touches, decide holistically which is right for the language, execute that one, and record the decision in your report: the candidates, what each costs, and why the one you executed is right. (The stops that apply to every rung of this batch, on top of the standing ones, are the stops the batch record\'s intro reserves for Pavol, at the head of this prefix.)',
'',
'A fourth case exists and is legitimate: the specification settles the divergence but the repair lies outside this rung\'s scope. Then the rung lands and opens a verified ledger row naming the defect, the specification clause, the probes both ways, the location of the fix and what the fix is. That is what rungs 6 and 7 did with row 317 and it was right.',
'',
'## What a measured defect is worth: the three homes',
'',
'This batch closes the gap the last three campaigns left - 22 defects measured by skeptics, 2 of them gated. Every defect anyone in this rung measures has exactly one of three homes, and the record says which and why:',
'',
'1. **Measured by anyone and repaired in this rung** - by the worker in its own first pass, by the skeptic, or in a repair round: it gets an ASSERTION in the rung\'s own gated test, and that assertion exists and passes BEFORE the second skeptic runs. Not a FACTS line, not a probe: an assertion. The cheapest form is an extra assert in the .fss file the rung already added; a new file is only needed when the defect is in another area. The assert message says what is checked and the expected answer in plain words. A specification rule is named by chapter or section, never by a .tex line; no ledger row, POSITIONS entry, FACTS title or PLAN item in a message. The ledger row goes in the commit message and may go in the file\'s one comment line.',
'',
'2. **Deferred, and the specification settles it** - the rung does not repair it, but the specification says what the answer is: it gets a gated EXPECTED-FAILURE test, whose file name starts with XXX. The harness makes this a real check, not a wish. FileTests.java:932 sets shouldFail = s.startsWith("XXX") from the file name; :587 and :654 make (shouldFail != failed) the failure condition, so an XXX test that STARTS PASSING turns the suite red, and :851 says the suite prints "XXX tests that succeed". So write XXX<Name>.fss asserting what the SPECIFICATION says, with a .test file beside it; it fails today, which is expected, and the day anyone repairs the defect without closing the ledger row the gate says so. 224 XXX*.test files in compiler_tests/ already use this. In compiler_tests/ and library_tests/ a run test whose run_out_ check is unmet fails whatever its name, because :583-585 fail it (the check at :534-539) before :587 reads the flag, and a run test with no run_out_ check demands PASS (:276-282): so a program that compiles and then dies at run time is two .test files over one component, a plain link test and an XXX run test whose key names output the failing run does print before it dies, run_out_contains=REACHED with REACHED printed before the failing call, or run_out_does_not_contain=REACHED where it dies before any output, never run_out_contains=PASS (FACTS.md, "The XXX expected-failure mechanism in compiler_tests/ and library_tests/ can express a compile-stage failure only, and a run-time defect needs two .test files", and "Two constraints of the test and native machinery, measured by rung S"; climb batch 6.5b\'s gate went red on a PASS key, explorations/reviews/batch-6.5b-review.md, finding 1). One caveat, from the harness\'s own author at FileTests.java:853 -"WARNING: expect_failure is not treated consistently" - so the first XXX file a rung adds is shown through the harness itself, not only by a direct compile and run of its program: placed where the gate reads it, the harness counting it an expected failure, and on a deliberate local fix, the harness failing it (explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh for compiler_tests/ and library_tests/, its link test before its run test; explorations/compile-ladder/rung-inference-walk/harness-one.sh for tests/), and the report quotes each run\'s verdict line with its command. A program the checker accepts that then fails JVM verification, linkage or a range check at run time is settled by the specification under every reading, so its home is 2, not 3 (explorations/reviews/batch-N-review.md, measure 6). The test is owed in the batch that measures the defect, even when a later rung or batch is planned to repair it: "its test can wait for the rung that fixes it" was ruled against at the gather or review of batches 6b, 7R and 7C (explorations/reviews/batch-7C-review.md, the repeat).',
'',
'3. **Deferred, and the specification is silent** - a plain gated test that pins today\'s behaviour, named for what it pins, and a ledger row naming the open question and the test; where no program can observe it, the ledger row alone, quoting the two to five output lines that show it and the command that printed them. The record says the silence is the reason.',
'',
'## Register',
'',
'Plain sentences, no self-congratulation - we are humble custodians here and deserve no credit. No unactionable comments in the source tree: provenance and rationale belong in your report, not in code. A test file is named by its topic, as the team\'s tests are, with no rung letter or batch name, and carries at most ONE comment line saying what the program checks, which may name the ledger row it reproduces and nothing else from the record (protocol.md, principle 1; compiler_tests/AtomicTopLevelVar.fss:13-42 is the 30-line comment that rule exists to prevent). Verify against primary sources before asserting, and cite file:line. If you make a decision, say in your report that it was a decision and what the alternatives were: a decision buried in a report is a decision not made. No estimates in days or weeks.',
'',
'## What you write, and what you must not touch',
'',
'Everything you produce goes under explorations/compile-ladder/SLUG/ in your own worktree, where SLUG is in your tail:',
'',
'- REPORT.md - what you found, what changed and why, every citation as file:line, the failing run\'s two to five lines quoted with its command, and the passing run\'s line, the precedent search, what the specification settles and the passages that settle it, each differential you ran, in a sentence.',
'- record.md - the record lines the coordinator will fold at merge time: the FACTS.md line or lines this rung earns, the ledger note (which row, and exactly what to append - rows are never renumbered or moved, they are cited from thirty-five reports), and the handover state line. Write them as finished prose, ready to paste.',
'',
'Nothing else under explorations/, but the decision record your tail asks for if it asks for one: your scratch is under tmp/SLUG/ in your worktree, which .gitignore ignores, and it is never committed.',
'',
'Do NOT edit explorations/coordinator/FACTS.md, the gap ledger, PLAN.md, POSITIONS.md, INDEX.md, the handover document, CLAUDE.md, explorations/protocol.md, the tools under explorations/coordinator/tools/ (a rung runs them, it does not change them), or anything under .claude/. Parallel rungs conflict on every one of those - 28 of 28 replayed pairs conflict on FACTS.md and on the handover - which is the whole reason the record leaves you and is folded centrally.',
'',
'Do NOT run ant testFast or ant testSystem. The batch is gated once, after the merge, by the coordinator. Running the gate here costs 582 s and buys nothing: across nine skeptic runs of the last climb, not one of the 26 findings was load-bearing on a suite failure.',
'',
'## What you cite',
'',
'Cite the Fortress tree at file:line and your own REPORT.md. A result from your scratch is quoted in the report, two to five lines, with the command that produced it; never cite a file under tmp/.',
'',
'## Commit and push as you go - on your own branch only',
'',
'Your worktree is on its own wip/ branch, cut from ' + BASE + ' and already pushed. Commit on it at every milestone and push after every commit with git push -u origin <your branch>: after the failing test is written and seen failing, in a commit that holds the test alone, so that your skeptic can run it on the base; after the edit and the pass; after REPORT.md and record.md; after anything else worth not losing. The batch of 2026-09-17 kept every worktree dirty and lost all of it when the container died; this is the insurance against that, and nothing else. Write plain messages that say what state the commit captures; the landed commit is composed by the coordinator from your branch\'s net change, so your commits are not history that must be shaped. Never commit to main, never push to any branch but your own, never force-push, and never put a model identifier in a commit message. End every commit message with exactly these two lines:',
'',
'    Co-Authored-By: Claude <noreply@anthropic.com>',
'    Claude-Session: https://claude.ai/code/session_01AmiXNpJxQ6TBwec4vJZHDB',
'',
'## If your branch already carries commits',
'',
'The batch may have been relaunched after its container died or its VM was restarted; both have happened (2026-09-17, 2026-09-18), and the second time the disk survived and the wip/ branches held every pushed milestone. Then your branch already holds the earlier attempt\'s milestones, and your worktree may hold its uncommitted edits and its tmp/ logs. Before anything else: git log --oneline ' + BASE + '..HEAD, git status --short, and the newest files in tmp/. Committed work is yours to verify, not to redo: read it as you would a colleague\'s, re-run its checks rather than trusting its logs, and continue from where it stops. Uncommitted edits are the same once you have read them; a log whose last step failed or was cut off means that step is still to be done. Nothing on the branch has been through a skeptic yet. Say in your report what you inherited and what you re-verified.',
'',
'## If your context is compacted',
'',
'Your brief is the first message of your own transcript, the newest agent-*.jsonl under ~/.claude/projects/*/*/subagents/workflows/ whose first line holds this prefix\'s title and your role\'s heading ("# Your role: ..."). After a compaction, re-read from it what your next step needs, and the files you have written, and go on. The boot that CLAUDE.md asks for after a compaction (explorations/coordinator/README.md, the protocol, FACTS.md and POSITIONS.md read whole) is the coordinator\'s and not yours, and so is the coordinator\'s own session transcript: read neither. Batch N\'s gather spent about 70K tokens re-orienting after its compaction, 45K of them on those two (explorations/reviews/batch-N-review.md, question 1).',
'',
].join('\n')

// ---------------------------------------------------------------------------
// The rung worker's role block. The tails are in the manifest.
// ---------------------------------------------------------------------------

// The paths neither the checker count nor the distance stage reads. Both run the
// compiler's phase order over the library, Shell.compilerPhases with
// PhaseOrder.compilerPhaseOrder (tools/checker-count/WorldFlip.java,
// tools/distance/DistanceMulti.java; PhaseOrder.java:137-147, ENVGEN off), which
// reads no test, text or record and runs no code of walk's evaluator or natives:
// outside interpreter/ those are named only by walk's commands in Shell.java and by
// ENVGEN's compiler/environments/. A rung whose edit touches nothing else does not
// run either stage (Pavol, POSITIONS.md 2026-09-29, the weighing of cost against what
// a rule protects; batch N's rung K ran the count twice on an interpreter-only edit
// and read the landed total twice, explorations/reviews/batch-N-review.md, question 4).
const STAGE_BLIND = ['explorations/', 'Specification/', 'Documentation/', 'ProjectFortress/tests/', 'ProjectFortress/*_tests/',
  'ProjectFortress/src/com/sun/fortress/interpreter/evaluator/', 'ProjectFortress/src/com/sun/fortress/interpreter/glue/']
const STAGE_BLIND_TEXT = STAGE_BLIND.slice(0, -1).join(', ') + ' or ' + STAGE_BLIND[STAGE_BLIND.length - 1]

function stageBlindStep() {
  return 'A checker-count or distance table that your tail or the batch intro asks you to capture after your edit is not captured when your edit cannot move it: when every path your edit adds or changes (git diff --name-only ' + BASE + ' in your worktree, and git status --short for new files) is under ' + STAGE_BLIND_TEXT + '. Both stages run the compiler\'s phase order over the library, which reads no test, text or record and runs no code of walk\'s evaluator or natives (explorations/coordinator/tools/checker-count/WorldFlip.java and tools/distance/DistanceMulti.java call Shell.compilerPhases). Then write in REPORT.md and record.md that the count and the distance are unchanged and not run because the edit touches no path they read, with the paths, and run neither: the gate measures both on the merged tree (Pavol, POSITIONS.md 2026-09-29, on weighing what a rule costs against what it protects). Any other path, a library, checker, parser, runtime or build file among them, and the stage runs as asked.'
}

function rungRole(rung, repairRound) {
  return [
'',
'---',
'',
'# Your role: rung worker',
'',
'## The order of work - test first, and the failure observed',
'',
'From explorations/coordinator/PLAN.md and Pavol\'s rule of 2026-09-17: the test first, seen failing, then the fix, the test staying in the corpus:',
'',
...(repairRound ? sliceStep([rung], 'your worktree (' + rung.path + ')') : briefingStep(rung, 'your worktree (' + rung.path + ')')),
...(rung.testIsStage ? [
'2. Your rung declares testIsStage: its failing-then-passing test is the gate\'s checker-count stage (gate step 8) and NOT a .fss program: no program can yet be compiled against the interpreter\'s prelude, and this is the one place the test-first rule is met by a permanent stage instead of a test file (explorations/coordinator/library-route-judgement.md section 2 step 1; Pavol\'s decision of 2026-09-21, POSITIONS.md, "the library route"). Its before is the last landed gate\'s table and per-site list, which the batch intro and your tail name (POSITIONS.md, 2026-09-28: a rung does not re-run the stage on an unchanged base); read them, and do not run the stage before your edit.',
'3. Once steps 4 and 5 below are done (the edit and its rebuild), run the stage once in your worktree, to tmp/SLUG/checker-count-postedit.txt; read the header of explorations/coordinator/tools/checker-count/run.sh first, and ant compileAll must have run in your worktree:',
'',
'        explorations/coordinator/tools/checker-count/run.sh tmp/SLUG/checker-count-postedit.txt tmp/SLUG/cc-post',
'',
'   It runs the compiler\'s static checker over Library/FortressLibrary.fss with the interpreter\'s prelude in scope, under its own private cache, and prints one row per api with that api\'s error count, then #total, #locations and #crash; 20 s measured in the main tree, and it writes nothing but the table. Start the distance stage in the background at once (gate step 9: the whole library, every checker stage run, the setting any, the overloading memo off; 13 to 24 minutes), and read its table when your report is written, with wait_for tmp/SLUG/distance-run.txt called again until it prints its EXIT= line:',
'',
'        run_bg tmp/SLUG/distance-run.txt "explorations/coordinator/tools/distance/run.sh tmp/SLUG/distance-postedit.txt tmp/SLUG/dist-post"',
'',
'   Put the diff of each pair of tables in REPORT.md and say what moved and why, api by api: the count tables by diff, the distance tables with explorations/coordinator/tools/distance/compare.sh, and errors.tsv in tmp/SLUG/dist-post, which lists every error with its site, against the landed per-site list. Commit no table: the gate\'s tables on the merged tree are the record. If the total changes, the manifest must declare the number it reaches as expectedCheckerCount and the crash line as expectedCheckerCrash when that moves - say in REPORT.md and in record.md which values the manifest needs, because the gate prints the declared total beside the one it measures, your skeptic compares your post-edit table with your report, and a crash line no rung declared is red. A rung of this kind writes no .test file; everything else in this list is unchanged, including the ladder subset of step 8 of this list and the three homes of its step 9.',
] : [
'2. Write the failing test FIRST, into ProjectFortress/compiler_tests/ (checker and codegen rungs) or ProjectFortress/library_tests/ (library rungs): a .fss component that prints PASS, plus a .test file in the format of ProjectFortress/library_tests/Boolean.test (a tests= line naming the components, then link, run, and the check line). The test is the ledger row\'s reproduction written as a clean minimal program of the core problem, not the shape the probe met it in; name it by its topic. The check line is exactly',
'',
'        run_out_contains=PASS',
'',
'   run_out_WIcontains, which Boolean.test and PLAN.md write, is implemented in the harness as of 2026-09-19 (FileTests.java:147-155, whitespace-insensitive containment beside _contains) but this batch writes _contains: one key, one meaning, and the seventeen older files are not this batch\'s business. A native-helper rung whose declarations are library declarations is a library rung: rung 7 put its test in library_tests/ (IntLiteralArithRung7).',
'3. Run it through the harness BEFORE the edit exists and see it fail. Commit the test alone. Quote the failing lines, two to five, in REPORT.md with the command. A test your skeptic cannot see fail on the base is refused. The process this rules out is the one-off validation script: proving once by hand that something works and going ahead without leaving a permanent check in the corpus.',
'   A rung that edits only the specification or other prose, where no test can go red (a prose edit of Specification/ or Documentation/, with at most the messages and comments of tests re-anchored), makes no test-only commit and has no failure to see: steps 2, 3 and 6 do not apply, its report says so, and its skeptic checks its text against the tree and the decisions on record instead. It commits no build log, capture or PDF: if it builds the specification to see its text compile, it commits nothing the build writes, and the commit stage builds the PDF once for the batch.',
]),
'4. Make the edit, as small as the test needs.',
'5. Rebuild: ant compileAll if you touched .java or .scala, then the library-order bytecode-cache rebuild. A rung that edits only CompilerLibrary rebuilds CompilerLibrary, CompilerAlgebra and CompilerSystem (25-30 s); one that edits CompilerBuiltin rebuilds from CompilerBuiltin down (about 125 s); the full five only after ant compileAll.',
'6. Run the test again through the harness and see it pass; quote its verdict line in REPORT.md.',
'7. Grep BOTH corpora - ProjectFortress/tests/ and every *_tests/ directory - for a competing declaration of every name you add. Rung 1 lost a full cycle to library_tests/MaybeTest9.fss declaring its own trait Equality, which only a full run revealed; this grep costs seconds and covers it. And grep src/com/sun/fortress/ whole, not compiler/ and runtimeSystem/ alone, for every name you add: rung M found Maybe, Just and Nothing named from syntax_abstractions/, outside the scope the climb had been grepping.',
'8. Run the ladder subset for the files your names were blocking, after the edit only. The before is the last landed gate\'s ladder stage, or for a file the gate does not run, the baseline\'s recorded output (explorations/compile-ladder/baseline-2026-09-19/raw/); run a file on the base only when neither covers it or the tree changed under it, and say which. Use the restricted driver explorations/compile-ladder/repair-r1-atomic-static/run-subset.sh with a subset.txt (corpus<TAB>file per line) listing the files the batch record names for your rung plus any file whose recorded first error in explorations/compile-ladder/baseline-2026-09-19/raw/ names one of your names. The driver writes its subset.txt and outputs beside itself (its OUT), so copy it into tmp/SLUG/ladder/ as the gate copies it, point its OUT there and LADDER_ROOT at tmp/SLUG/ladder/root: the copy is scratch and is never committed. Never run the full-corpus driver with its default root: that root is shared and its cache pruning corrupts a parallel run.',
'9. Every defect you measure gets one of the three homes the shared prefix names, and your report says which and why for each. The assertions of home 1 are in place and passing before you report; the XXX file of home 2 is in place and failing as expected, and if it is this rung\'s first one you also show it going red on a deliberate local fix and then undo the fix.',
'10. The provenance block. Under the title of REPORT.md, FIVE lines, each ending in a file:line or the literal none. problem: the measurement that made this a rung (a program line or a ladder file). spec: the governing prose passage under Specification/basic or basic-lib, found from the feature\'s row in explorations/coordinator/map/spec-to-implementation.md; a citation under Specification/library/apis/ is labelled (api listing) and is not sufficient on its own; none when the prose is silent, with the grep that shows it. precedent: the interpreter\'s declaration, the team\'s dormant draft, or the in-file shape you copied. deviation: one line per way your edit differs from the precedent and from the specification\'s spelling. historical: every file of the original 2012 tree this rung edits - anything outside explorations/ and outside the test corpora this campaign created - or none. the protocol\'s hard rule on the gate requires those edits to be flagged at commit time, and the gather copies this line into the commit message. Your skeptic opens every line the block cites and asks for a correction if one is missing or does not say what the block says.',
'11. Ledger rows. Rungs 6 and 7 opened row 317 when the specification settled a divergence the rung could not repair; do the same if you meet one. Number a new row provisionally from ' + LEDGER_FROM + ' in record.md and say that it is provisional: another rung may open one too, and the gather assigns the final numbers in manifest order (' + RUNGS.map(r => r.id).join(', ') + ').',
'',
...(rung.testIsStage ? [] : [stageBlindStep(), '']),
'Report at the end in the structured form the tool requires, and write the full detail into REPORT.md.',
'',
'Two fields of that form the script reads itself. reportText and recordText carry the full text of REPORT.md and record.md, word for word as you wrote them to the files: in batch 5 the harness refused every rung worker\'s write of REPORT.md, and a file your branch does not carry is written by the gather from these fields verbatim, so they are the report whenever the file is not. If the harness refuses a write, say so in notDone and go on. stopsMet lists every stop the batch record\'s intro reserves for Pavol that this rung met, including one met on part of the work while the rest lands (a passage reported without choosing, a test whose verdict changed other than the rung\'s own), each with its evidence as file:line; a stop the intro names as lifted, or that another decision of his lifts, carries in liftedBy the POSITIONS.md line of that decision. Only Pavol lifts a stop: an entry without such a line holds the batch\'s push until he does, and an empty list says the rung met none. forPavol lists every point for Pavol that this rung does not settle, one entry each, with its evidence as file:line: a decision taken here on a question that was his, a fork with its candidates and costs, a defect or divergence that lands unrepaired and needs his word, anything REPORT.md or record.md says goes to him. The reports the tail\'s "What comes back to Pavol" names are not such points; they reach him with the landing. The gather puts each point into PLAN.md.',
'',
  ].join('\n')
}

// ---------------------------------------------------------------------------
// The skeptic's role block. batched-climb-plan.md section 3.
// ---------------------------------------------------------------------------

function skepticRole(rung, workerReport, round) {
  return [
'',
'---',
'',
'# Your role: skeptic for ' + rung.id + ', ' + rung.slug,
'',
(round > 1
  ? 'This is the SECOND judgement of this rung. You refused it once, the worker made one repair, and this is the re-judgement. Under the design, a second refusal drops the rung from the batch: it is recorded with the reason and returned to the ranking, not retried. So refuse again only if the rung is genuinely wrong, not if it is merely improvable.'
  : 'This is the first judgement of this rung. You may refuse once; the worker then gets exactly one repair round in the same worktree.'),
'',
'You did not do this work and you are not here to be agreeable. Your job is to decide whether the claim is true and whether the record is honest. The worktree is ' + rung.path + ' and it is dirty on purpose; read the diff with git diff and git status in that worktree.',
'',
'## What the worker reported',
'',
'This is the worker\'s own account. Treat it as a claim to be checked, not as evidence.',
'',
JSON.stringify(Object.assign({}, workerReport, { reportText: undefined, recordText: undefined }), null, 2),
'',
'## What you must check',
'',
...sliceStep([rung], 'the rung\'s worktree (' + rung.path + ')'),
'2. The provenance block under REPORT.md\'s title: FIVE lines now - problem, spec, precedent, deviation, historical. Open every file:line it cites with sed -n and check that the line says what the block says. A missing line, a line that does not say it, a spec: line that cites only Specification/library/apis/, or a historical: line that omits a file of the 2012 tree the diff edits, is a required correction, not a refusal (the rule after check 12).',
(rung.testIsStage
  ? '3. The failure, which for THIS rung is a table and not a program. Its manifest entry sets testIsStage: no program can yet be compiled against the interpreter\'s prelude, so the failing-then-passing test is the gate\'s checker-count stage (gate step 8, explorations/coordinator/tools/checker-count/run.sh). The before is the last landed gate\'s table; the after is tmp/' + rung.slug + '/checker-count-postedit.txt in the worktree; check that the report\'s diff is the diff of those two, and RUN THE STAGE YOURSELF in the worktree to see the post-edit table come out again: that run is your check that the test passes, in place of running a .fss test. A rung of this kind whose post-edit table you cannot reproduce is refused exactly as a test you cannot see fail would be; a report whose diff is not the diff of those two tables is a required correction. Check also that the report names the total the manifest must declare as expectedCheckerCount, and the crash line as expectedCheckerCrash if that moved: the gate prints the declared total beside the one it measures, and a crash line no rung declared makes the batch\'s gate red. Check 10 compares that total with the table. Where the rung\'s tail asks for the distance stage\'s tables too, re-run explorations/coordinator/tools/distance/run.sh in the worktree through run_bg (13 to 24 minutes) and compare your table with the worker\'s post-edit one with explorations/coordinator/tools/distance/compare.sh: they agree within the checker\'s run-to-run variation of 2 to 4 errors. Everything else in this list is unchanged.'
  : '3. The failure, seen by you. Check out the worker\'s test-only commit, or put the new test on the base alone, rebuild what the edit touched (ant compileAll for Java or Scala, then the library-order rebuild), and run it through the harness: it must fail as the report quotes. Then git checkout ' + rung.branch + ', rebuild, and run it at the branch\'s head: it must pass. Your own programs below run on that tree, and you commit on that branch. A test you cannot see fail on the base is refused - this is not negotiable and it is the point of the whole discipline. A rung that edits only the specification or other prose, where no test can go red (the order of work says which), has no failure to see: check that git diff --name-only ' + BASE + '...HEAD lists no path outside Specification/, Documentation/ and explorations/ but test files whose change is a message or a comment, and check its text against the tree and the decisions on record instead, each sentence it adds or changes stating what the code and the decisions do. It is not refused for a failure no test can show.'),
'4. The diff, read line by line against the specification passages cited and against the provenance block. Does the edit do what the report says, and only that? Is it as small as the test needs?',
'5. The precedent search. Did the worker find what the team already did here, and did it follow the right precedent? Where a precedent repaired a defect, did the worker count the other sites in that file and give the number? If the worker followed none, look for one yourself in the interpreter\'s library, the compiler prelude and the team\'s tests: a device the rung invented where the library already has one is a finding, with the library\'s file:line.',
'6. The test. Does it actually exercise the defect? The rung\'s tail names the cases that matter for this rung. Check also that the test file carries at most one comment line and no provenance essay.'
  + (rung.testIsStage ? ' This rung writes no test file: what you check instead is that the two tables differ in the way the report says, and that the difference is the defect and not a cache or a build artefact.' : ''),
'7. The competing-declaration grep across both corpora AND across src/com/sun/fortress/ whole.',
'8. The record.md fragment. Are the FACTS lines true as written and sourced? Does the ledger note cite an existing row without renumbering anything? Would a reader six months from now be able to check it?',
'9. The three homes. For every defect the report names as measured: home 1 (repaired in this rung) must be a passing assertion in the rung\'s gated test, and you run the test yourself to see it pass; home 2 (deferred, specification settles it) must be an XXX-named file that the harness treats as expected-to-fail, and you check the name and the .test file; home 3 (deferred, specification silent) must be a test pinning today\'s behaviour, or a ledger row quoting the output where no program can observe it, and the report must say the specification is silent and show the grep. A defect in your OWN findings that the worker then repairs is home 1 too, and its assertion is in place before you approve.',
(rung.testIsStage
  ? '10. The rung\'s own count table against its report: a file read, nothing to run. Its brief names the table: tmp/' + rung.slug + '/checker-count-postedit.txt in the worktree.'
  : '10. The rung\'s own count table against its report: a file read, nothing to run. The general part of its brief names no table, because the rung does not set testIsStage; its tail may name one, and the report says which table, if any, it wrote under tmp/.')
  + ' Take the table\'s #total row and compare it with the total the report declares in REPORT.md, record.md and the structured report'
  + (rung.expectedCheckerCount !== undefined ? '; write the manifest\'s expectedCheckerCount, ' + rung.expectedCheckerCount + ', beside the two in SKEPTIC.md, as the prediction it is, not a value the table must meet' : '')
  + '. A mismatch between the table and the report is a finding for repair, not a stop: put it in requiredCorrections with both numbers, so that the report is corrected, and do not refuse the rung over it alone. If no table path is named and the rung declares a count, in its report or as expectedCheckerCount, report "no count table" in findings. A rung that declares no count and names no table has nothing to compare; one line saying so is enough.'
  + (rung.testIsStage ? '' : ' Nor does a rung that says its count and distance are unchanged and not run because its edit touches no path the two stages read: check its paths against git diff --name-only ' + BASE + '...HEAD, which must list none outside ' + STAGE_BLIND_TEXT + ' (the rule of the worker\'s order of work); a path outside them without a table is the finding "no count table".'),
'11. The ledger and the sibling sites. Search explorations/fortress-gap-ledger.md with terms of your own for rows that bear on the rung, and the tree for every other site of the defect the rung repairs: in the files it edits, in the sibling types and widths, and on the other path. A missed row that changes what the rung should do is a finding; a sibling site the rung leaves gets one of the three homes or a recommendedRows entry.',
'12. The decisions on record. For each entry of explorations/coordinator/POSITIONS.md that the briefing printed or the rung\'s section of ' + BATCH_RECORD + ' cites, check that the landed text says what the decision says, in its scope and its words. A rule stated narrower or broader than the decision, or a case the decision names that the landed text leaves out, is a finding for repair; a landed text that contradicts a decision is a ground to refuse.',
'',
'Refuse only for the change or the test: the change is wrong or larger than its test needs, the test does not test it or was not seen failing, a sibling defect has no home, a decision on record was not followed. A citation off by a line, a wording, a missing cross-reference is a required correction, not a refusal.',
'',
'## Your required differential - this is not optional',
'',
'For every construct the rung touches, write your OWN small program, run it under the interpreter (bin/fortress FILE.fss) and under the compiler path (bin/fortress compile then bin/fortress run), and compare the answers. Do not satisfy this by reading the rung\'s own test; write programs the worker did not write. This requirement exists because four of the 26 items the last climb\'s skeptics raised came from differential probes they invented on their own initiative, and those four were the highest-value findings of eight rungs.',
'',
(rung.writesState
  ? 'THIS RUNG TOUCHES MUTABLE STATE, A TRANSACTION, OR LIBRARY CODE THAT WRITES, so run every one of your differentials TWICE: once with FORTRESS_THREADS=1 and once with FORTRESS_THREADS=4, as a command-line prefix that overrides env.sh (FORTRESS_THREADS=4 ../bin/fortress run X). Report both columns. The reason is on record: the repair batch found AtomicTopLevelVar failing at four threads and passing at one on the same tree (34,104 of 40,000), and every batch-1 skeptic ran everything at one thread by construction, including the first library write to the transactional cell from inside a transaction. A program that is correct cannot lose an update at four threads; a disagreement between the two columns is a finding, not noise.'
  : 'This rung does not touch mutable state, a transaction, or library code that writes, so one thread is enough for the differentials. If your reading of the diff says otherwise - a mutable variable, a field, an atomic block, or a write into CompilerLibrary\'s state - run every differential at FORTRESS_THREADS=1 and at =4 anyway and say that you did.'),
'',
'When walk and the compiled run disagree, apply rule 4 of the shared prefix: the divergence is a question and the specification answers it. Name which of the four outcomes you are in, and cite the passage.',
'',
'## The failure-mode question, asked explicitly',
'',
'Where the rung replaces a throwing stub, an error, or any other loud failure with a computed value, establish what that value is and run it against the specification. This is separate from which side is correct: a loud failure becoming a quiet answer costs diagnosability whoever turns out to be right, because the next person to meet it gets a number instead of a stack trace. It does not by itself prevent the rung from landing. It is a fact the rung must establish, record and report.',
'',
'## Your verdict',
'',
'Approve, or refuse with the one thing that must change. If you approve WITH required corrections, list them precisely: an approval carrying corrections becomes a checklist the commit stage is required to close, and two such corrections from the last climb were simply never made. Do not pad the list with preferences; name what must change and why.',
'',
'Every defect you measure that the rung does not repair and that deserves a ledger row goes in recommendedRows, one entry each, with the row\'s proposed text and the probe that establishes it. This field exists because the last batch lost one: a skeptic narrowed a codegen defect to any closure whose declared return type is a supertype of its body\'s type, and it reached no ledger row, no FACTS line and no handover sentence, because nothing in the machinery carried a recommendation that was not a required correction. The gather is required to open or refuse each entry in one sentence.',
'',
'Every point you find that is Pavol\'s and that the rung does not settle - a decision the rung took on a question that was his, a fork, a defect or divergence that lands unrepaired and needs his word - goes in forPavol, one entry each with its evidence as file:line. The gather puts each into PLAN.md.',
'',
'Write your findings to explorations/compile-ladder/' + rung.slug + '/SKEPTIC.md in that worktree, and your own programs and their outputs under tmp/' + rung.slug + '/skeptic/, which is never committed; quote in SKEPTIC.md the lines of theirs a finding rests on, with the command. Commit SKEPTIC.md alone. ' + (round > 1
  ? 'Carry the text of this second judgement, word for word, in skepticText, and not the first judgement\'s, which the script already holds from the first round: a file the branch does not carry is written by the gather from the two fields verbatim, this judgement first, so if the harness refuses your write, say so in findings and go on.'
  : 'Carry SKEPTIC.md\'s full text, word for word, in skepticText: a file the branch does not carry is written by the gather from that field verbatim, so if the harness refuses your write, say so in findings and go on.') + ' In stopsMet, name every stop the batch record\'s intro reserves for Pavol that the rung as it stands meets, whether or not the worker named it, with its evidence as file:line; a stop the intro names as lifted, or that another decision of his lifts, carries in liftedBy the POSITIONS.md line of that decision. Your approval does not lift a stop: an entry without such a line holds the batch\'s push until he lifts it. Do not edit the worker\'s source changes yourself and do not run ant testFast or ant testSystem. Commit SKEPTIC.md on the rung\'s branch, ' + rung.branch + ', with the footer the shared prefix gives, and push it; touch nothing else in the commit. The worker\'s own commits are on that branch, so git log ' + BASE + '..HEAD shows its milestones and git diff ' + BASE + '...HEAD its net change.',
'',
  ].join('\n')
}

function repairPrompt(rung, verdict, decision) {
  return [
'',
'---',
'',
'# Your role: rung worker, repair round for ' + rung.id + ', ' + rung.slug,
'',
'First, before anything below: take step 1 of the order of work above, in ' + rung.path + (verdict ? '. In a repair round it is the part of the briefing that the checks on the rung read, not the whole briefing, which the first pass read.' : ', the rung\'s whole briefing.'),
'',
(verdict
  ? 'You did this rung. Your skeptic refused it. This is your ONE repair round in the same worktree, ' + rung.path + '; a second refusal drops the rung from the batch.'
  : 'You did this rung and stopped on what you took for a stop condition. The judge has ruled that it is not one, and this is the continuation in the same worktree, ' + rung.path + '.'),
'',
(verdict ? 'The skeptic\'s verdict:\n\n' + JSON.stringify(verdict, null, 2) + '\n' : ''),
'The judge\'s decision, which you execute:',
'',
JSON.stringify(decision, null, 2),
'',
'Read the judge\'s full ruling in explorations/compile-ladder/' + rung.slug + '/JUDGE.md' + (verdict ? ' and the skeptic\'s findings in SKEPTIC.md beside it' : '') + '. Carry out the judge\'s instructions in order. Where an instruction turns out wrong against a primary source, do what the source says, and say so in REPORT.md with the file:line that settles it - the judge read the two reports and the diff, not the whole tree.',
'',
'Every defect this round repairs - including one the skeptic measured and you now fix - gets its assertion in the rung\'s gated test, in place and passing, BEFORE you report: the second skeptic will look for it and its absence is a refusal ground. A defect this round does not repair gets home 2 or home 3 of the shared prefix, and the report says which. Re-run the test through the harness and quote its verdict line, update REPORT.md and record.md (including the historical: line of the provenance block if the repair touched a file of the 2012 tree) and, with them, reportText, recordText, stopsMet and forPavol in your structured result, forPavol carrying every point for Pavol the rung still has, the earlier pass\'s included, commit and push on your branch, and do not run the full gate.',
'',
  ].join('\n')
}

// ---------------------------------------------------------------------------
// The judge. Called at four points only: a worker's stop, a skeptic's refusal,
// a blocking review or a red gate on the merged tree. Its first ruling on a rung
// or on the merged tree runs on Opus; a second ruling on the same one is
// escalated to Fable (judgeTier). It does not build or test; it reads what the two
// Opus agents already wrote, rules on it, and writes instructions the next
// Opus agent executes. Its context is assembled here from the structured
// outputs so it does not have to gather it by tool calls.
// ---------------------------------------------------------------------------

function judgeRole(kind, rung, worker, verdict, extra) {
  const inWorktree = (kind === 'refusal' || kind === 'stop')
  const where = inWorktree ? rung.path : MAIN
  const outFile = inWorktree
    ? 'explorations/compile-ladder/' + rung.slug + '/JUDGE.md'
    : BATCH_DIR + '/JUDGE-' + kind + '.md'
  const question = {
    refusal: 'The rung worker landed and its skeptic refused. Decide what the repair is: which of the two is right on each point, by citation, and exactly what the repair round must do. If the skeptic is wrong on its refusal ground, the repair round is a report-only repair that settles it, and you say so.',
    stop: 'The rung worker stopped, reporting a stop condition. Decide whether it is genuinely one of the reserved forks that reach Pavol (the array representation, the library route, a change of semantics against what the specification does say, deleting a test, and the stops the batch record\'s intro reserves for Pavol, at the head of the shared prefix above) or a silent specification that rule 4 says to think harder about. If the latter, derive the candidate behaviours with their costs and decide, and the instructions are the continuation. If the former, write what reaches Pavol: the fork, the candidates, what each costs, and your recommendation.',
    review: 'The merged-diff review found something blocking in the source hunks after the gather: its blockingCode findings, the ones whose repair touches code, are yours; its routed findings, settled by tests and records only, go to the next batch without a ruling. Diagnose it holistically on the merged tree and decide the repair; do not bisect rungs. The gate is still running beside you in this tree: do not read ' + GATE_OUT + '/ or wait for it; rule on the review and the merged diff alone. ' + LAND_RULE,
    gate: 'The gate is red on the merged tree. Read the failing evidence and decide the repair. The gate has five ways to be red and they point at different places: a failing or erroring JUnit suite (its output is under ProjectFortress/TEST-RESULTS/); a suite whose test COUNT fell against the last landed summary, which usually means a .test file or a tests= line went missing rather than a test failing; a FAIL or a repeated timeout in the four-thread runs of the compiled atomic programs, which is a lost update and is about the transaction runtime rather than about the suites; a ladder regression, where a file that compiled and ran before now reaches a lower phase or prints different output - the stage hands you the diff; and, from the checker count over the interpreter\'s library, a crash line no rung declared or a stale checker shadow (the total itself is reported and never red), which is about the distance to the one library Pavol decided on (POSITIONS.md, 2026-09-21, "the library route"; library-route-judgement.md section 2 step 1) and whose evidence is the two tables the stage diffs, ' + GATE_OUT + '/checker-count.txt against the last landed one. The distance stage (' + GATE_OUT + '/distance.txt, the whole library with every checker stage run) is reported and never red, so it is never why the gate is red, though its table may help you place a checker change. Pavol\'s standing rule: identify the source of the conflict holistically and rework that part in the merged batch; dropping a rung is the retreat, taken only when its approach is wrong rather than its code, and then it is recorded and returned to the ranking.',
  }[kind]
  return [
'',
'---',
'',
'# Your role: judge (' + kind + ')' + (rung ? ' for ' + rung.id + ', ' + rung.slug : ''),
'',
'You are the escalation point of this batch, invoked only here. You did not do the work and you are not repeating it: no build, no test run, no ladder subset. You read, you rule, and you write instructions that an Opus worker executes. The rules above about never touching the main tree and never running the gate were written for the rung workers; you write one file and commit it, nothing else.',
'',
question,
'',
'## What is already known',
'',
(worker ? 'The worker\'s structured report:\n\n' + JSON.stringify(worker, null, 2) + '\n' : ''),
(verdict ? 'The skeptic\'s structured verdict:\n\n' + JSON.stringify(verdict, null, 2) + '\n' : ''),
(extra ? 'The stage that escalated to you returned:\n\n' + JSON.stringify(extra, null, 2) + '\n' : ''),
'## What to read, and no more than this unless a ruling needs it',
'',
inWorktree
  ? sliceStep([rung], 'the rung\'s worktree (' + rung.path + ')').join('\n') + '\n2. The net change: git -C ' + rung.path + ' diff ' + BASE + '...HEAD, and the milestones: git log ' + BASE + '..HEAD.\n3. explorations/compile-ladder/' + rung.slug + '/REPORT.md and record.md in that worktree' + (verdict ? ', and SKEPTIC.md beside them' : '') + '.\n4. Every specification passage the two cite, by file:line with sed -n, in Specification/ under that worktree - the prose chapters, not library/apis/. Read at least ten lines either side of each.\n5. The precedents both name, at the cited lines.\n6. explorations/coordinator/map/spec-to-implementation.md only if the question is where a fix belongs.'
  : sliceStep(RUNGS, 'the main tree (' + MAIN + ')').join('\n') + '\n2. The composed commits: git -C ' + MAIN + ' log ' + BASE + '..HEAD and git diff ' + BASE + '...HEAD.\n3. The stage\'s outputs named above, and for a red gate the failing tests\' own output under ProjectFortress/TEST-RESULTS/, the summary and comparison under ' + GATE_OUT + '/, and the full logs, which are NOT committed and are under ' + LOG_DIR + '/.\n4. Each rung\'s REPORT.md and SKEPTIC.md under explorations/compile-ladder/<slug>/, and the lines the gather folded from its record.md into the three record files.\n5. The specification passages the reports cite, by file:line.',
'',
'## How to rule',
'',
'Rule 4 of the shared prefix governs: the interpreter is evidence, not an oracle, and the specification answers a divergence; a silent specification is the reason to think harder, not to stop, except where the silence falls exactly on the point at issue and PLAN.md names it a fork. Rule holistically: the goal is one tree with everything running, not the largest subset that happens to be green. Every point in your ruling is a citation, file:line, that the repair worker can check. Say which claims of the worker and of the skeptic were right and which were wrong. If you take a decision under a silent specification, say that you did and what the alternatives were: it is reported to Pavol out of the loop.',
'',
'Write the full ruling to ' + outFile + ' in ' + where + (inWorktree
  ? ', commit it on the rung\'s branch ' + rung.branch + ' with the footer the shared prefix gives, and push it.'
  : ', and commit it locally on main with that footer; do not push. Another agent may be committing in this tree at the same time: retry once on an index.lock error after a few seconds.'),
'',
'Return the structured decision the tool requires. Your instructions are numbered steps the repair worker executes in order, each concrete enough to be done without re-deriving your reasoning.',
'',
  ].join('\n')
}

const JUDGE_SCHEMA = {
  type: 'object',
  properties: {
    kind: { type: 'string' },
    decision: { type: 'string', enum: ['repair', 'drop', 'stop'], description: 'repair: the next Opus worker executes the instructions; drop: the rung\'s approach is wrong and it returns to the ranking; stop: a reserved fork, this reaches Pavol' },
    instructions: { type: 'array', items: { type: 'string' }, description: 'numbered steps for the repair worker, each with the file:line it rests on; empty unless repair' },
    ruling: { type: 'string', description: 'which claims of the worker and the skeptic were right and wrong, by citation' },
    specRuling: { type: 'string', description: 'what the specification settles here and how, or that it is silent and what was decided under the silence' },
    forPavol: { type: 'array', items: { type: 'string' }, description: 'what must reach Pavol out of the loop, one entry per point: a fork with its candidates and costs, a divergence that lands unrepaired, a decision taken under a silent specification; the gather, or the repair on the merged tree, puts each into PLAN.md; empty if nothing' },
    summary: { type: 'string', description: 'at most 10 lines' },
  },
  required: ['kind', 'decision', 'instructions', 'ruling', 'summary'],
}

// The merged-diff review's judge has a fourth decision, land (Pavol, POSITIONS.md
// 2026-09-29, the entry on rerunning the gate: "The same weighing of cost against
// what a rule protects applies to the other rules of the batch workflow"). A ruling
// whose settlement is tests and records only does not hold the batch for a repair:
// the batch lands on its gate, and the ruling's steps go to the next batch with the
// findings it upholds, listed for Pavol. In batch N the repair of such a ruling and
// the second review after it cost about 0.7M tokens and, with the judge, 54 minutes
// after a green gate (explorations/reviews/batch-N-review.md, question 4, item 1).
// Since the post-mortem of 2026-09-29 the review routes such findings itself and the
// judge sees only those that touch code; land stays for one of them that the judge
// finds settled by tests and records after all.
const LAND_RULE = 'You have a fourth decision here, land (Pavol, POSITIONS.md 2026-09-29, the entry on rerunning the gate: the same weighing of cost against what a rule protects applies to every rule of the batch workflow). Decide land when every finding you uphold is settled by tests and records only: test files in ProjectFortress/tests/ or a ProjectFortress/*_tests/ directory, and files under explorations/, with no source, library, checker, interpreter or specification file changed. Then no repair runs: the batch lands on its gate, and your numbered instructions, written as for a repair worker, go to the next batch with the findings you uphold and are listed for Pavol, as the review\'s routed findings are (the post-mortem of 2026-09-29). The tests land one batch later, as rows 447 and 505\'s did by that rule. A finding whose settlement needs a source, library, checker, interpreter or specification change is a repair, as before, and so is a ruling that mixes the two.'
const REVIEW_JUDGE_SCHEMA = Object.assign({}, JUDGE_SCHEMA, {
  properties: Object.assign({}, JUDGE_SCHEMA.properties, {
    decision: { type: 'string', enum: ['repair', 'land', 'drop', 'stop'], description: 'repair: the next Opus worker executes the instructions on the merged tree; land: every finding upheld is settled by tests and records only, so the batch lands on its gate and the instructions go to the next batch, listed for Pavol; drop: a rung\'s approach is wrong; stop: a reserved fork, this reaches Pavol' },
    instructions: { type: 'array', items: { type: 'string' }, description: 'numbered steps, each with the file:line it rests on: for the repair worker on repair, for the next batch on land; empty otherwise' },
  }),
})

// ---------------------------------------------------------------------------
// For Pavol. Every item a rung's worker, skeptic or judge, a merged-diff review
// or a merged-tree judge marks for Pavol becomes an entry of PLAN.md, under
// "Pavol's answers, in the order they are needed" or "Off the path, parked".
// The gather routes the rungs' items in its commits and lists them, and each
// it could not route; the review routes its own and any the gather missed; the
// repair on the merged tree routes its judge's. Nothing waits on them: an item
// not in PLAN.md is logged and carried in the script's result for the
// coordinator (Pavol, 2026-09-27, on the proposal). The measure is item 4 of
// explorations/reviews/worker-global-decisions.md: a judge's "For Pavol"
// section or a rung's list for him stopped in the rung's files, and no stage
// moved it into PLAN's queue (a size's range, rung F's = on Number, rows 417,
// 419 and 420).
// ---------------------------------------------------------------------------

const PLAN_SECTIONS = ['Pavol\'s answers, in the order they are needed', 'Off the path, parked']
const PLAN_RULE = 'Each item for Pavol becomes an entry of explorations/coordinator/PLAN.md: under "' + PLAN_SECTIONS[0] + '" when it asks for his decision or answer before work on the path can go on, in the group of the phase it must come before; under "' + PLAN_SECTIONS[1] + '" otherwise. The entry says in one or two plain sentences what he is asked or told, the default or recommendation on record if there is one, and where the evidence is, by file:line. An item PLAN.md already holds is not written again: name that entry. Several items on one point make one entry.'
const PAVOL_ROUTED = { type: 'array', description: 'one entry per item for Pavol this role put into PLAN.md or found there, by the id the role gives it; several ids may share one PLAN.md entry',
  items: { type: 'object', properties: {
    id: { type: 'string', description: 'the item\'s id, as the role gives it' },
    section: { type: 'string', description: 'the PLAN.md section the entry is in: ' + PLAN_SECTIONS.map(x => '"' + x + '"').join(' or ') },
    entry: { type: 'string', description: 'the entry\'s opening words, enough to find it' },
  }, required: ['id', 'section', 'entry'] } }
const strings = (x) => Array.isArray(x) ? x.filter(t => typeof t === 'string' && t.trim()) : (typeof x === 'string' && x.trim() ? [x] : [])
const numbered = (prefix, list) => strings(list).map((text, i) => ({ id: prefix + '.' + (i + 1), text }))
// A rung's items: its last worker's, each skeptic round's, and its judges'.
function pavolItemsOf(r) {
  const twoRounds = !!(r.firstVerdict && r.firstVerdict !== r.verdict)
  return [].concat(
    numbered(r.rung + '.worker', r.worker && r.worker.forPavol),
    twoRounds ? numbered(r.rung + '.skeptic', r.firstVerdict.forPavol) : [],
    numbered(r.rung + (twoRounds ? '.skeptic2' : '.skeptic'), r.verdict && r.verdict.forPavol),
    numbered(r.rung + '.judge-stop', r.stopJudge && r.stopJudge.forPavol),
    (r.judge && r.judge !== r.stopJudge) ? numbered(r.rung + '.judge', r.judge.forPavol) : [])
}
const inPlanSection = (x) => typeof x === 'string' && PLAN_SECTIONS.some(sec => x.toLowerCase().indexOf(sec.toLowerCase().replace(/^pavol's /, '')) >= 0)
// The ids a stage's result says it put into PLAN.md, under one of the two sections.
const routedIds = (results) => new Set([].concat.apply([], results.filter(Boolean).map(x => Array.isArray(x.pavolItems) ? x.pavolItems : []))
  .filter(e => e && typeof e.id === 'string' && inPlanSection(e.section)).map(e => e.id))

// ---------------------------------------------------------------------------

// The stops a rung worker, a skeptic or the merged-diff review found met; the
// script reads them to hold the push (pushHeldBy, below the stages).
const STOPS_MET = { type: 'array', description: 'every stop the batch record\'s intro reserves for Pavol that was met, including one met on part of the work while the rest lands; empty if none',
  items: { type: 'object', properties: {
    rung: { type: 'string', description: 'the rung id; the review names it, a rung worker or skeptic may leave it empty' },
    stop: { type: 'string', description: 'the stop, in the intro\'s words' },
    evidence: { type: 'string', description: 'file:line where it is met' },
    liftedBy: { type: 'string', description: 'the POSITIONS.md line of the decision of Pavol\'s that lifts it; empty if none does, and then it holds the push' },
  }, required: ['stop', 'evidence', 'liftedBy'] } }

const RUNG_SCHEMA = {
  type: 'object',
  properties: {
    slug: { type: 'string' },
    landed: { type: 'boolean', description: 'true if the edit is in place and the new test passes' },
    stopped: { type: 'boolean', description: 'true if the rung hit a stop condition and is reporting instead of landing' },
    stopReason: { type: 'string', description: 'empty unless stopped' },
    filesChanged: { type: 'array', items: { type: 'string' }, description: 'path:line-range per changed source file, plus new test files' },
    historicalFiles: { type: 'array', items: { type: 'string' }, description: 'files of the original 2012 tree this rung edits, for the commit message; empty if none' },
    recordedFailure: { type: 'string', description: 'the hash of the commit that holds the test alone, the harness command, and the two to five lines of its run on the base that show the failure; for a rung that edits only prose, none and why' },
    recordedPass: { type: 'string', description: 'the harness command and the verdict line of the test\'s run on the edit' },
    precedentSearch: { type: 'string', description: 'what the team already did here, by citation, and which precedent was followed' },
    specCitations: { type: 'array', items: { type: 'string' } },
    divergences: { type: 'array', items: { type: 'string' }, description: 'each walk-vs-compiled divergence found, with which side the specification favours' },
    defectHomes: { type: 'array', items: { type: 'string' }, description: 'one line per measured defect: the defect, its home (1 gated assertion, 2 XXX expected-failure test, 3 probe under a silent specification), and where it is' },
    decisions: { type: 'array', items: { type: 'string' }, description: 'decisions taken inside the rung, each with the alternative rejected' },
    notDone: { type: 'array', items: { type: 'string' } },
    stopsMet: STOPS_MET,
    forPavol: { type: 'array', items: { type: 'string' }, description: 'every point for Pavol this rung does not settle, one entry each with its evidence as file:line; the gather puts each into PLAN.md; empty if none' },
    reportText: { type: 'string', description: 'the full text of REPORT.md, word for word; the gather writes it verbatim when the branch does not carry the file' },
    recordText: { type: 'string', description: 'the full text of record.md, word for word; the gather writes it verbatim when the branch does not carry the file' },
    summary: { type: 'string', description: 'at most 15 lines of prose' },
  },
  required: ['slug', 'landed', 'stopped', 'filesChanged', 'recordedFailure', 'stopsMet', 'summary'],
}

const SKEPTIC_SCHEMA = {
  type: 'object',
  properties: {
    slug: { type: 'string' },
    approved: { type: 'boolean' },
    refusalReason: { type: 'string', description: 'empty unless refused; the one thing that must change' },
    requiredCorrections: { type: 'array', items: { type: 'string' }, description: 'corrections the commit stage must close even on an approval' },
    recommendedRows: { type: 'array', items: { type: 'string' }, description: 'ledger rows this skeptic recommends opening that are NOT required corrections: the proposed row text and the probe that establishes it; the gather opens or refuses each in one sentence' },
    failureWasRecorded: { type: 'boolean', description: 'whether you saw the new test fail on the base by your own run (check 3); false for a rung that edits only prose, which has none' },
    differentialsRun: { type: 'array', items: { type: 'string' }, description: 'the skeptic\'s OWN probes: program, walk answer, compiled answer, verdict; with both thread columns where the rung writes state' },
    threadCounts: { type: 'string', description: 'which thread counts the differentials were run at and why' },
    defectHomes: { type: 'array', items: { type: 'string' }, description: 'one line per defect this skeptic measured: its home (1, 2 or 3) and where the check now is' },
    loudToQuiet: { type: 'string', description: 'whether a loud failure became a quiet value, and what the value is' },
    findings: { type: 'array', items: { type: 'string' } },
    stopsMet: STOPS_MET,
    skepticText: { type: 'string', description: 'the full text of SKEPTIC.md, word for word; the gather writes it verbatim when the branch does not carry the file' },
    forPavol: { type: 'array', items: { type: 'string' }, description: 'every point for Pavol this skeptic finds that the rung does not settle, one entry each with its evidence as file:line; the gather puts each into PLAN.md; empty if none' },
    summary: { type: 'string' },
  },
  required: ['slug', 'approved', 'failureWasRecorded', 'differentialsRun', 'stopsMet', 'summary'],
}

// ---------------------------------------------------------------------------
// The stages below the scatter. All in the main tree, all Opus except the judge.
// batched-climb-plan.md section 3, "Gather and gate" and "Commit", as corrected
// on 2026-09-17: the landed commit is composed at the gather from each branch's
// net change, never merged.
// ---------------------------------------------------------------------------

const MAIN_TREE_ROLE = [
'',
'---',
'',
'You work in the MAIN tree, ' + MAIN + ', on branch main. The rule in the shared prefix about never touching it was written for the rung workers, whose stage is over; the wip/ worktrees are now read-only history to you. Source explorations/experiment/env.sh in every shell; do not export TMPDIR or JAVA_FLAGS beyond what it sets. The batch base is ' + BASE + '. Commit locally with the footer the shared prefix gives; push only if your role below says so. Another agent of this batch may be working in this tree at the same time: if a git command fails on index.lock, wait five seconds and retry, up to four times.',
'',
].join('\n')

// The texts a rung's agents returned for its three files, for the gather to write
// verbatim where the branch lacks the file (the harness refuses a rung worker's write
// of REPORT.md: batch 5, and all four rungs of batch N). Since 2026-09-29 they are not
// pasted into the gather's brief: the script names, per file, the command that writes
// the field from the run's journal, which holds every agent's structured result, so
// that the text never passes through the gather's context (Pavol, POSITIONS.md
// 2026-09-29, the weighing of cost against what a rule protects; in batch N the texts
// were 195K tokens of the gather's brief, and it spent 88K more copying five of them
// back out, explorations/reviews/batch-N-review.md, question 2). The labels are the
// ones this script gives: the last result of rung:, resume: or repair: is the worker
// the script kept, and a second skeptic round's text comes first, the first round's
// after it under "## First round".
const TEXT_TOOL = 'explorations/coordinator/tools/journal-text.py'
function rungTextCommands(r) {
  const dir = 'explorations/compile-ladder/' + r.slug + '/'
  const cmd = (file, field, labels) => 'python3 ' + TEXT_TOOL + ' --out ' + dir + file + ' ' + field + ' ' + labels
  const workers = ['rung', 'resume', 'repair'].map(p => p + ':' + r.rung).join(' ')
  const twoRounds = !!(r.verdict && r.firstVerdict && r.firstVerdict !== r.verdict)
  const skeptic = twoRounds ? 'skeptic2:' + r.rung + ' --first-round skeptic:' + r.rung : ((r.verdict || r.firstVerdict) ? 'skeptic:' + r.rung : '')
  const out = { 'REPORT.md': cmd('REPORT.md', 'reportText', workers), 'record.md': cmd('record.md', 'recordText', workers) }
  if (skeptic) out['SKEPTIC.md'] = cmd('SKEPTIC.md', 'skepticText', skeptic)
  return { textCommands: out }
}

function gatherRole(approved, notLanded, items) {
  return MAIN_TREE_ROLE + [
'# Your role: gather',
'',
'Compose one clean local commit per approved rung on main. Nothing is merged: each rung\'s branch stays as it is and is never a parent of anything on main.',
'',
'The batch record the steps below name is ' + BATCH_DIR + '/RECORD.md, and you write it once: no later stage rewrites it, and the commit stage adds to it only the landed hashes, the gate\'s summary line and, when the push is held, a "Not pushed." paragraph (the post-mortem of 2026-09-29).',
'',
'Preconditions, checked first and reported if they fail: git status --porcelain is empty; ' + BASE + ' is an ancestor of HEAD (git merge-base --is-ancestor).',
'',
'## The order the commits go in',
'',
'NOT manifest order. Ascending order of each rung\'s LOWEST edited line in the files two or more rungs share: apply the rung whose hunks are highest in the file (smallest line numbers) first, so that a later rung\'s hunk does not shift the line numbers a landed record already cites. Work the order out from git diff ' + BASE + '...<branch> per branch before you apply anything, and say in your result what order you chose and why. Nine of the last review\'s fixes were one such shift, re-anchoring every citation above a later rung\'s hunk.',
'',
'For each rung, in that order:',
'',
'1. Its net change: git diff ' + BASE + '...<branch> > <scratch>/<slug>.patch, then git apply --3way --index <patch>. A hunk that fails in a file another rung also touched is the conflict this stage exists to see: if the hunks are in unrelated regions, resolve it by hand from both sides and say so; if both changed the same logic, do NOT guess - leave the tree clean (git checkout -- . && git clean -fd on the touched paths), and return with the conflict named.',
'   Then the rung\'s three files. The texts its agents returned for them - reportText for REPORT.md and recordText for record.md from its last worker, skepticText for SKEPTIC.md from its last skeptic and, where there were two rounds, the first round\'s after a line "## First round" - are in the run\'s journal and not in this brief, and each rung below carries in textCommands the command that writes each file from there, byte for byte, without the text passing through your context (' + TEXT_TOOL + '; it finds the journal itself, the newest one whose last started agent is this gather, and says which on stderr). For each of the three files under explorations/compile-ladder/<slug>/ that the branch does not carry, run its command from ' + MAIN + ', and compose nothing: the rung\'s own words, not a summary of them. From there on the file is treated as one the rung wrote; read of it only what a later step needs. A file the branch carries stands as it is, and its command is not run. Name in the batch record every file written this way. A command that exits 1 wrote nothing (no journal found, or no text in the field): report that file as missing rather than composing it. In batch 5 the harness refused every rung worker\'s write of REPORT.md and the gather composed each from a 15-line summary; in batch N these texts, pasted into the gather\'s brief, were 195K tokens of it, re-read and copied back out (explorations/reviews/batch-N-review.md, question 2).',
'2. Fold its record: explorations/compile-ladder/<slug>/record.md (now in the tree) carries finished prose for three places. The FACTS.md line goes into explorations/coordinator/FACTS.md under the section of its area (the file is grouped by area, its README gives the rule: "Landed semantics" for a rule of the language or the library as it now stands, "The harness and the gate" for test mechanics, "The checker and the one library" for the checker), after that section\'s last entry, as one bullet with its source. The ledger note is APPENDED to the notes of the row it names in explorations/fortress-gap-ledger.md - rows are never renumbered, moved or deleted; where the note needs the landed commit\'s hash write the literal placeholder <short hash>, which the commit stage replaces. The handover state line goes into the first section of explorations/microgpt-run-c-handover.md ("Where the work stands"). If record.md opens a new row, the number is provisional (from ' + LEDGER_FROM + '): assign the final numbers in MANIFEST order (' + RUNGS.map(r => r.id).join(', ') + ') as you fold, append each row to the ledger\'s last table, and correct every citation of the provisional number in the lines you fold from that rung\'s record.md and in its REPORT.md, SKEPTIC.md and tests, in the same commit. Any file:line a record cites that a previously applied rung has shifted is re-anchored by SYMBOL - find the declaration or the assert by name in the current file and cite the line it is at now, rather than trusting the number the record was written with.',
'3. Close every requiredCorrections item of that rung\'s skeptic verdicts, listed below; each is a checklist item and the last climb left two of them unmade.',
'4. Open or refuse every recommendedRows item of that rung\'s skeptic, in one sentence each, recorded in the batch record. Opening it means a real ledger row with the probe it cites; refusing it means one sentence saying why the tree does not owe it. The last batch lost a codegen defect a skeptic had narrowed precisely, because nothing carried a recommendation that was not a required correction.',
'5. Its items for Pavol, from the list at the end of this role. ' + PLAN_RULE + ' The evidence named is the rung\'s file that carries the point, REPORT.md, SKEPTIC.md or JUDGE.md, at the line it is now at.',
'   A text mismatch is not blocking. Where the batch intro has you check one rung\'s specification text against another rung\'s landed code, a mismatch the decisions on record settle you fix on the side they settle, as before; one they do not settle you do NOT report to the review as blocking, whatever the intro says. It is reversible, so it lands as a reserved stop met does, listed for Pavol (POSITIONS.md, 2026-09-27, the stops; 2026-09-29, the weighing of cost against what a rule protects), with the three records that keep it from being a discrepancy no one can see (POSITIONS.md, 2026-09-24, on updating the specification): the text stands as the rung wrote it; the path that departs from it gets a ledger row and a gated home-2 test (XXX) asserting the text\'s rule; and the text\'s entry in Specification/appendices/changes.tex names that row among its departures, so that the text claims no more than holds. All three go in the commit of the later of the two rungs, and the mismatch goes in your forPavol, with its ledger row and its test, and into PLAN.md by step 5\'s rule, with the ids gather.1, gather.2 in the order of forPavol. In batch N the rule "report any other to the review as blocking" made row 516 half of the first review\'s block, a judge ruling, a repair and a second review, and the judge reversed it in one line (explorations/reviews/batch-N-review.md, question 4, item 3).',
'6. One commit: the applied source, the tests, the rung\'s files under explorations/compile-ladder/<slug>/ (REPORT.md, SKEPTIC.md and JUDGE.md if any, and decision-record.md for a specification rung; record.md is folded, not landed, so take it out of the index and the tree once step 2 has folded it; nothing else under the rung\'s folder), the three record files, and PLAN.md when step 5 wrote to it. Stage those files by an explicit list, never by git add of the directory, and read git diff --cached --stat before you commit: 85 MB of a worker\'s experimental caches reached main that way on 2026-09-19 and the protocol\'s hard rule on worker commits now forbids it. Title line: what the repair does, in the plain register; body: the two or three sentences of record.md that say why. If git diff --name-only for this commit shows ANY path outside explorations/, the body also carries a line beginning "historical:" naming the files of the original 2012 tree the commit edits, taken from the rung\'s provenance block - the protocol\'s hard rule on the gate requires those edits to be flagged at commit time. Footer as given. Do not push.',
'',
(notLanded.length
  ? '## The rungs that did not land\n\nThese rungs stopped, were dropped, or their worker died, or the script withheld them (state withheld) because their manifest entry names in landsOnlyWith a rung that was not approved; the reason says which. Their source changes are NOT applied and their branches stay as they are. But their skeptics\' findings are about the tree, not about the rung, and they have nowhere else to go: fold them into ' + BATCH_DIR + '/RECORD.md under a heading "Not landed", one section per rung, carrying the reason it did not land, the findings of its SKEPTIC.md if it has one, and every recommendedRows entry, each opened as a real ledger row or refused in one sentence exactly as step 4 requires. Its items for Pavol go into PLAN.md as step 5 says, in the commit that carries its "Not landed" section. Take that rung\'s REPORT.md, SKEPTIC.md and record.md out of its branch by an explicit list of paths (git checkout <branch> -- <path> ..., one path at a time), never the whole directory, so that nothing else comes with them; where the branch lacks one of the three files, write it with its command from textCommands below, as step 1 says for a landed rung. Apply none of its source.\n\n' + JSON.stringify(notLanded.map(r => Object.assign({ rung: r.rung, slug: r.slug, branch: r.branch, state: r.state, reason: r.withheldReason || (r.judge && r.judge.summary) || (r.worker && r.worker.stopReason) || '', skepticFindings: (r.verdict && r.verdict.findings) || [], recommendedRows: (r.verdict && r.verdict.recommendedRows) || [] }, rungTextCommands(r))), null, 2) + '\n'
  : '## The rungs that did not land\n\nNone: every rung of this batch was approved.'),
'',
'The rungs and their verdicts:',
'',
JSON.stringify(approved.map(r => Object.assign({ rung: r.rung, slug: r.slug, branch: r.branch, historicalFiles: (r.worker && r.worker.historicalFiles) || [], requiredCorrections: [].concat((r.firstVerdict && r.firstVerdict.requiredCorrections) || [], (r.verdict && r.verdict.requiredCorrections) || []), recommendedRows: [].concat((r.firstVerdict && r.firstVerdict.recommendedRows) || [], (r.verdict && r.verdict.recommendedRows) || []) }, rungTextCommands(r))), null, 2),
'',
'The items for Pavol, by id (' + (items.length ? items.length + ' of them' : 'none') + '):',
'',
JSON.stringify(items, null, 2),
'',
'Return the structured result the tool requires: the commit hash per rung, the order you applied them in and why, the conflicts met and how each was resolved, the corrections closed, the recommended rows opened or refused, forPavol, the points you find yourself (a text mismatch the decisions do not settle among them), pavolItems, one entry for every id above and every gather.N of forPavol with the PLAN.md section and entry that holds it, and pavolUnrouted, every id you could not put in with the reason, for the coordinator. Nothing waits on these: the batch goes on to its review, gate and commit either way.',
'',
  ].join('\n')
}

const GATHER_SCHEMA = {
  type: 'object',
  properties: {
    commits: { type: 'array', items: { type: 'object', properties: { rung: { type: 'string' }, hash: { type: 'string' }, files: { type: 'array', items: { type: 'string' } } }, required: ['rung', 'hash'] } },
    applyOrder: { type: 'string', description: 'the order the rungs were applied in and the lowest edited line that decided it' },
    conflicts: { type: 'array', items: { type: 'string' }, description: 'each hunk that did not apply cleanly, the file, and how it was resolved or that it was not' },
    unresolved: { type: 'boolean', description: 'true if a conflict was left unresolved and the tree was returned to clean' },
    correctionsClosed: { type: 'array', items: { type: 'string' } },
    rowsOpenedOrRefused: { type: 'array', items: { type: 'string' }, description: 'one line per recommendedRows entry: opened as row N, or refused because ...' },
    notLandedFolded: { type: 'array', items: { type: 'string' }, description: 'the rungs whose findings were folded without their source, and where' },
    head: { type: 'string', description: 'the hash HEAD is at when you finish' },
    forPavol: { type: 'array', items: { type: 'string' }, description: 'every point for Pavol this gather finds itself, a text mismatch the decisions do not settle among them, one entry each with its ledger row, its test and its evidence as file:line; each goes into PLAN.md as gather.1, gather.2 in this order; empty if none' },
    pavolItems: PAVOL_ROUTED,
    pavolUnrouted: { type: 'array', description: 'every item for Pavol you could not put into PLAN.md, for the coordinator; empty if none', items: { type: 'object', properties: {
      id: { type: 'string' }, why: { type: 'string', description: 'why it could not go in' } }, required: ['id', 'why'] } },
    summary: { type: 'string' },
  },
  required: ['commits', 'conflicts', 'unresolved', 'pavolItems', 'pavolUnrouted', 'summary'],
}

// The merged-diff review, once, beside the gate. Since the post-mortem of 2026-09-29
// (postmortem-2026-09-29/synthesis.md, section 2(b)) there is no second review inside a
// batch: the post-batch review is the second look. A finding whose repair touches code
// goes to the judge and a repair; one settled by tests and records only is routed by the
// review to the next batch and listed for Pavol, with no judge (Pavol, POSITIONS.md
// 2026-09-29, the weighing of cost against what a rule protects). The checker count's
// rows are the post-batch review's to explain, so this review does not wait on the
// gate's table.
const COMMIT_TITLE = 'Record the landed commits\' hashes and the gate summary'
function reviewRole(gather, label, items) {
  return MAIN_TREE_ROLE + [
'# Your role: merged-diff reviewer',
'',
'The rungs were judged one at a time in their own worktrees; nobody has yet read the changes together, and the rung skeptics could not see the three record files, which were folded after them. You read both.',
'',
'THE GATE IS RUNNING BESIDE YOU, in this same tree, on the commits the gather made. That is deliberate and it costs nothing as long as your own fixes stay inside explorations/ - the gate\'s result stands. It is why the two rules below matter.',
'',
'The composed commits: git log ' + BASE + '..HEAD; the whole change: git diff ' + BASE + '...HEAD. The gather stage returned:',
'',
JSON.stringify(gather, null, 2),
'',
'Check, and cite file:line for every finding:',
'1. Batch rule 1 against the real hunks: no two rungs add or change the same declaration, method, trait body or operator. Rule 2: no rung\'s edit depends on another\'s for its meaning or its test.',
'2. Each commit carries its edit, its test and its record together, and nothing of another rung.',
'3. The folded record as a whole: every FACTS line true as written and sourced; every ledger note appended to an existing row with no row renumbered, moved or deleted, and the ledger\'s own counts still right; the handover\'s first section consistent; every new row numbered in manifest order with no gap or duplicate against the rows already there, and no provisional number left anywhere.',
'4. Every requiredCorrections item the gather says it closed is actually closed, and every recommendedRows entry is opened as a real row or refused in one sentence.',
'5. Footers present and exact; no model identifier anywhere in the commits; a historical: line in the body of every commit whose diff touches a path outside explorations/, naming the 2012-tree files it edits.',
'6. The provenance block of every REPORT.md: five lines (problem, spec, precedent, deviation, historical), each ending in a file:line or none, and its SKEPTIC.md says the lines were opened.',
'7. The three homes: every defect a REPORT.md or SKEPTIC.md says was measured has a gated assertion, an XXX expected-failure file, or a test pinning today\'s behaviour with a ledger row, or a ledger row quoting the output where no program can observe it - and the one it has is the one the specification allows. A defect repaired in the rung whose only trace is a FACTS line is a finding.',
'8. The stops. Every stop the batch record\'s intro reserves for Pavol that a landed rung meets - in its hunks, or where its REPORT.md, SKEPTIC.md or the lines folded from its record.md say it met one (a passage reported without choosing, a test whose verdict changed other than by a rung\'s own intent, a line that waits for him) - goes in stopsMet with the rung\'s id, the evidence as file:line, and in liftedBy the POSITIONS.md line of the decision of his that lifts it, or nothing. The script holds the batch\'s push on any entry with no such line, and on the rungs\' own entries too; it is not a blocking finding, and you do not fix it.',
'9. The items for Pavol. For each id of the list below, the PLAN.md entry the gather\'s pavolItems names is in explorations/coordinator/PLAN.md, under one of the two sections, and says what the item says. An item the gather left out or placed wrong you put in yourself, in your corrections commit. Every point you yourself find that is Pavol\'s goes in forPavol, one entry each, with the ids ' + label + '.1, ' + label + '.2 in the order of forPavol. ' + PLAN_RULE + ' pavolItems lists every id you put in or moved, with its section and entry. It is not a blocking finding.',
'',
'The items for Pavol from the rungs and the gather, by id:',
'',
JSON.stringify(items, null, 2),
'',
'Three kinds of finding. A record-only or mechanical defect you fix yourself, in one local commit titled "Fold the review\'s corrections", listed in your return. A defect whose repair touches a path outside explorations/ that is not a test file - source, library, checker, interpreter or specification: a rule broken, an edit that is not what its report says, an interaction between two rungs - you do NOT fix; you return it in blockingCode, precisely enough that a judge can rule on it from your words and the diff; a judge rules, a repair runs, and the gate runs again on the repaired tree. A finding settled by tests and records only that you do not fix yourself - a test owed or a test file to change - you return in routed, each with the step the next batch owes: no judge and no repair run for it, it goes to the next batch and is listed for Pavol, and it does not hold the batch. Put each routed finding into explorations/coordinator/PLAN.md by check 9\'s rule, with the ids review-routed.1, review-routed.2 in the order of routed, in your corrections commit, and list the ids in pavolItems (the post-mortem of 2026-09-29, section 2(b); Pavol, POSITIONS.md 2026-09-29, the weighing of cost against what a rule protects). A mismatch between one rung\'s specification text and another rung\'s code that the decisions do not settle, which the gather filed as a reversible stop met (the text as the rung wrote it, the ledger row and gated XXX test of the path that departs, the row named among the text\'s departures in Specification/appendices/changes.tex, and an item for Pavol), is not blocking: check that the four are there, complete a missing record yourself, and return a missing test in routed. Do not run the gate and do not push.',
'',
'## Two rules because the gate is running beside you',
'',
'First: record the hash HEAD is at BEFORE your corrections commit, and the hash after, and run',
'',
'    git diff --name-only <before> <after>',
'',
'and return both hashes and every path that command prints which is NOT under explorations/. If that list is non-empty the gate may have to run again on your result, and the script decides from your answer. Keep your own fixes inside explorations/: a correction that needs any other path goes in blockingCode or routed.',
'',
'Second: do not touch ' + GATE_OUT + '/ or ' + LOG_DIR + '/, which are the gate\'s, and retry a git command that fails on index.lock.',
'',
  ].join('\n')
}

const REVIEW_SCHEMA = {
  type: 'object',
  properties: {
    approved: { type: 'boolean', description: 'true if blockingCode is empty after your own record fixes' },
    blockingCode: { type: 'array', items: { type: 'string' }, description: 'findings whose repair touches a path outside explorations/ that is not a test file (source, library, checker, interpreter or specification), each with file:line and which rule or claim it breaks; the judge rules on these, and the gate runs again after their repair; empty if none' },
    routed: { type: 'array', items: { type: 'string' }, description: 'findings settled by tests and records only that you did not fix yourself, each with file:line and the step the next batch owes; no judge runs for them, they go to the next batch and are listed for Pavol, and you put each into PLAN.md as review-routed.N; empty if none' },
    fixed: { type: 'array', items: { type: 'string' }, description: 'record or mechanical defects you fixed, and the commit hash' },
    headBefore: { type: 'string', description: 'the hash HEAD was at before your corrections commit' },
    headAfter: { type: 'string', description: 'the hash HEAD is at after it; same as headBefore if you committed nothing' },
    pathsOutsideExplorations: { type: 'array', items: { type: 'string' }, description: 'every path from git diff --name-only <headBefore> <headAfter> that is not under explorations/; empty if none' },
    stopsMet: STOPS_MET,
    forPavol: { type: 'array', items: { type: 'string' }, description: 'every point for Pavol this review finds, one entry each with its evidence as file:line; empty if none' },
    pavolItems: PAVOL_ROUTED,
    summary: { type: 'string' },
  },
  required: ['approved', 'blockingCode', 'routed', 'fixed', 'stopsMet', 'forPavol', 'pavolItems', 'summary'],
}

// ---------------------------------------------------------------------------
// The gate. Eight steps: build, library, the two suites, the summary and its
// comparison with the last landed one, the four-thread atomic runs, the ladder
// regression, and the checker count - the compiler's static checker run over the
// INTERPRETER's library, whose error total is the measured distance to the one
// library Pavol decided on (POSITIONS.md, 2026-09-21, "the library route";
// library-route-judgement.md section 2 step 1 makes it a stage so that the
// distance is measured by every gate instead of by a script anybody re-runs).
// It commits nothing - the commit stage adds its summary and its table - because
// the review is committing in this tree at the same time.
//
// The ladder-regression stage's rule about the two microGPT programs, set by
// Pavol on 2026-09-19: their eighteen components are COMPILED ONLY in this
// stage - fortress compile, the phase reached - and are never linked and never
// run here. The 85 pass-list files are compiled and run, as the baseline
// measured them. When the microGPT programs one day compile, running them is a
// separate non-gating stage and not part of the gate.
// ---------------------------------------------------------------------------

const ATOMIC_OTHER = 'atomic0 atomic1 atomic2 atomic3 atomic4 atomic5 atomic6 nestedTransactions0 nestedTransactions1 nestedTransactions2'
const ATOMIC_COMPILER = 'AtomicTopLevelObjectVar AtomicTopLevelVar MutableTopLevelVarInLoop FirstLoadThreadsRungG'

function gateRole(expectedMoves, expectedChecker) {
  return MAIN_TREE_ROLE + [
'# Your role: the gate',
'',
'Run the full gate once on the tree as it stands, exactly, and report what it says. You change no source and you commit nothing: the review agent is committing in this tree beside you, and the commit stage adds your summary to the tree after both of you are done. Your logs go to ' + LOG_DIR + '/, which is untracked and stays untracked - .gitignore:64 ignores /tmp/, and .gitignore:42,46 would swallow a .out or a .log anywhere. Your three tracked outputs are ' + GATE_OUT + '/summary.txt, ' + GATE_OUT + '/checker-count.txt and ' + GATE_OUT + '/distance.txt, which you WRITE but do not commit.',
'',
'The steps, in order. Use run_bg and wait_for from the shared prefix for every long one, and never pipe ant through tail.',
'',
'1. mkdir -p ' + LOG_DIR + ' ' + GATE_OUT + '. df -h / first; if under 1 GB free, sweep /tmp/fortress*rats, ProjectFortress/test-tmp and ProjectFortress/test-caches and check again; if still under 500 MB, stop and report.',
'2. rm -rf ProjectFortress/TEST-RESULTS. Then ant compileAll to ' + LOG_DIR + '/compileAll.txt. BUILD SUCCESSFUL must appear at its end. Then, at once and before step 3, start the distance stage in the background; step 9 reads it. It needs the classes compileAll just built and nothing any later step writes, it runs one JVM on one core for 13 to 24 minutes, and it is started here so that it runs beside steps 3 to 8 instead of after them:',
'',
'        run_bg ' + LOG_DIR + '/distance.txt "explorations/coordinator/tools/distance/run.sh ' + GATE_OUT + '/distance.txt ' + LOG_DIR + '/distance"',
'',
'   Start it once per gate run, never a second one beside it, and do not wait for it here. It reads only ProjectFortress/build and the library sources and writes only under ' + LOG_DIR + '/distance/ and ' + GATE_OUT + '/distance.txt, with its own -Dfortress.caches and its own java.io.tmpdir, so the library rebuild, the suites and the ladder do not touch it and it touches none of them.',
'3. The library-order bytecode-cache rebuild, the five fortress compile commands of the shared prefix, to ' + LOG_DIR + '/library.txt. Then, immediately and before anything else compiles into that cache, take the pristine copy the ladder stage needs:',
'',
'        mkdir -p ' + LOG_DIR + '/ladder/root',
'        cp -a default_repository/caches ' + LOG_DIR + '/ladder/root/ladder-caches',
'        cp -a default_repository/caches ' + LOG_DIR + '/ladder/root/pristine',
'',
'   Two copies of about 14 MB each, a second apiece: run-subset.sh keeps its working cache in $LADDER_ROOT/ladder-caches and its untouched reference in $LADDER_ROOT/pristine, and skips build_library when pristine already exists, which is what saves the 145 s. The analysed cache keys on the source file\'s absolute path (NamingCzar.java:243-245), which is the same path in this same tree, so the copy is valid here and only here.',
'4. ant testFast to ' + LOG_DIR + '/testFast.txt; then ant testSystem to ' + LOG_DIR + '/testSystem.txt. Never both at once.',
'5. The summary, and the comparison with the last landed one. Run exactly this, from ' + MAIN + ':',
'',
'        gate_summary () {                 # gate_summary <log-dir> <out-file>',
'            local L="$1" O="$2" R="$FORTRESS_HOME/ProjectFortress/TEST-RESULTS" f',
'            {',
'              printf \'#suite\\ttests\\tfailures\\terrors\\tskipped\\n\'',
'              for f in "$R"/fast-*/TEST-*.txt "$R"/system-*/TEST-*.txt ; do',
'                [ -f "$f" ] || continue',
'                awk -v track="$(basename "$(dirname "$f")")" -F\'[ ,:]+\' \'',
'                  /^Testsuite:/ { n = split($2, p, "."); s = p[n] }',
'                  /^Tests run:/ { print track "/" s "\\t" $3 "\\t" $5 "\\t" $7 "\\t" $9 ; exit }\' "$f"',
'              done | sort',
'              for f in compileAll testFast testSystem ; do',
'                grep -h \'^BUILD \\|^Total time:\' "$L/$f.txt" | sed "s|^|# $f: |"',
'              done',
'            } > "$O"',
'        }',
'',
'        gate_compare () {                 # gate_compare <last-landed-summary> <this-summary>; prints the red lines, exit 1 if any. The system-<i> rows are one suite split by sorted index (FileTests.java:790-806): a file added to tests/ moves every later file along the shards, so those rows are compared by their sum',
'            awk -F\'\\t\' \'',
'              function key(s) { sub("^system-[0-9]+/", "system/", s) ; return s }',
'              FNR == NR { if ($0 !~ /^#/ && NF == 5) base[key($1)] += $2 ; next }',
'              $0 !~ /^#/ && NF == 5 {',
'                  k = key($1) ; seen[k] = 1 ; cur[k] += $2',
'                  if ($3 + 0 > 0 || $4 + 0 > 0)              { print "RED\\t" $1 "\\t" $3 " failures, " $4 " errors" ; bad++ }',
'                  if ($2 + 0 == 0)                           { print "EMPTY\\t" $1 ; bad++ }',
'              }',
'              END { for (k in cur) if ((k in base) && cur[k] < base[k]) { print "COUNT DOWN\\t" k "\\t" base[k] " -> " cur[k] ; bad++ }',
'                    for (s in base) if (!(s in seen)) { print "SUITE GONE\\t" s "\\t" base[s] " -> absent" ; bad++ }',
'                    if (bad) exit 1 }\' "$1" "$2"',
'        }',
'',
'        last_landed_summary () {',
'            git -C "$FORTRESS_HOME" log --name-only --pretty=format: -- \\',
'                \'explorations/compile-ladder/gate-baseline/summary.txt\' \\',
'                \'explorations/compile-ladder/climb-batch-*/gate/summary.txt\' | grep -m1 \'summary.txt$\'',
'        }',
'',
'   Then: gate_summary ' + LOG_DIR + ' ' + GATE_OUT + '/summary.txt, and gate_compare "$(last_landed_summary)" ' + GATE_OUT + '/summary.txt. A COUNT DOWN or SUITE GONE line is RED and you name the suite: it almost always means a .test file or a tests= line went missing rather than a test failing, because the .test file is the whole enumeration (FileTests.java:936-963) and nothing else would notice. A count that went UP is normal - this batch adds tests. Do NOT grep for "Tests expected to pass are failing": it is ant\'s own <fail message=...> at build.xml:993 and :1209, raised only when tests.failed is set, so its absence is exactly equivalent to BUILD SUCCESSFUL and reading it is reading the same dial twice.',
'6. The four-thread runs of the compiled atomic programs. The gate is pinned to one thread - env.sh:6 and, since 2026-09-19, the fastTrack and systemShard macros themselves (build.xml) - which makes both suites blind to a lost update: AtomicTopLevelVar passed at one thread and failed at four on the same unrepaired tree, 34,104 of 40,000. These thirteen programs are the ones the repair batch measured at both counts and found 22 of 22 PASS, so a FAIL here is a regression and not a discovery. FirstLoadThreadsRungG, added by climb batch 6.5\'s rung G, is row 417\'s gated home: the first load of generic instantiations from four threads at once, a race one thread never runs; until the file is in compiler_tests/ the stage reports it ABSENT, which is not red. A correct transaction runtime cannot lose an update, so this stage adds no flakiness to a green gate:',
'',
'        ATOMIC_OTHER="' + ATOMIC_OTHER + '"        # other_compiler_tests/, the ten atomicTest.test names',
'        ATOMIC_COMPILER="' + ATOMIC_COMPILER + '"  # compiler_tests/, the three the repair batch added and climb batch 6.5\'s FirstLoadThreadsRungG (row 417)',
'        atomic_runs () {                  # atomic_runs <out-file>; appends "# atomic ..." lines, exit 1 if any is not PASS',
'            local O="$1" p d i out rc',
'            case "$O" in /*) ;; *) O="$PWD/$O" ;; esac     # resolve before the cd: the gate passes GATE_OUT, which is relative to the main tree',
'            cd "$FORTRESS_HOME/ProjectFortress" || return 1',
'            for p in $ATOMIC_COMPILER $ATOMIC_OTHER ; do',
'                case " $ATOMIC_COMPILER " in *" $p "*) d=compiler_tests ;; *) d=other_compiler_tests ;; esac',
'                [ -f "$d/$p.fss" ] || { echo "# atomic $p ABSENT" >> "$O" ; continue ; }     # a program a batch adds before it lands: reported, not red',
'                if ! timeout -k 5 300 ../bin/fortress compile "$d/$p.fss" >/dev/null 2>&1 ; then',
'                    echo "# atomic $p COMPILE-FAILED" >> "$O" ; continue',
'                fi',
'                for i in 1 2 3 ; do',
'                    out=$(FORTRESS_THREADS=4 timeout -k 5 120 ../bin/fortress run "$p" 2>&1) ; rc=$?',
'                    if [ "$rc" -eq 124 ] ; then',
'                        out=$(FORTRESS_THREADS=4 timeout -k 5 120 ../bin/fortress run "$p" 2>&1) ; rc=$?',
'                        [ "$rc" -eq 124 ] && { echo "# atomic $p run$i threads=4 TIMEOUT-TWICE" >> "$O" ; continue ; }',
'                    fi',
'                    case "$out" in',
'                      *FAIL*) echo "# atomic $p run$i threads=4 FAIL" >> "$O" ;;',
'                      *PASS*) echo "# atomic $p run$i threads=4 PASS" >> "$O" ;;',
'                      *)      echo "# atomic $p run$i threads=4 NO-PASS rc=$rc" >> "$O" ;;',
'                    esac',
'                done',
'            done',
'            ! grep -q \'FAIL\\|TIMEOUT-TWICE\\|NO-PASS\\|COMPILE-FAILED\' "$O"',
'        }',
'',
'   Run atomic_runs ' + GATE_OUT + '/summary.txt so the result lines land in the summary: 39, and one ABSENT line while compiler_tests/FirstLoadThreadsRungG.fss does not exist; 42 once it does. Any FAIL, any NO-PASS, any COMPILE-FAILED and any program that timed out twice is RED. A single timeout that passes on its re-run is not.',
'7. The ladder regression. The measured baseline is explorations/compile-ladder/baseline-2026-09-19/: 85 files at phase pass with their stdout captured under raw/, listed in pass-list.txt, plus the eighteen components of the two microGPT programs at phase disambiguate in microgpt-phase.md. Both are re-run here and compared. Use the baseline\'s own drivers so the result is the same kind of claim:',
'',
'   The eighteen microGPT components are COMPILED ONLY here - fortress compile, the phase reached - and are never linked and never run in this stage; that is Pavol\'s rule of 2026-09-19 and microgpt-phase.sh already obeys it. The 85 pass-list files are compiled AND run, as the baseline measured them. The day a microGPT component compiles, running it is a separate non-gating stage and not part of the gate.',
'',
'   a. Copy explorations/compile-ladder/repair-r1-atomic-static/run-subset.sh (the subset driver; baseline-2026-09-19/ has only the whole-corpus run-ladder.sh) and baseline-2026-09-19/classify.py, report.py, microgpt-phase.sh and microgpt-phase.py into ' + LOG_DIR + '/ladder/. Point OUT at ' + LOG_DIR + '/ladder and LADDER_ROOT at ' + LOG_DIR + '/ladder/root in both shell drivers, which is where step 3 put ladder-caches and pristine, so the driver\'s "if [ ! -d $PRISTINE ]" guard skips build_library. Its sanity step (library_tests/Integer1 must compile and print PASS) still runs and is the check that the copy is good; if it fails, build the library the slow way and say so in your result.',
'   b. subset.txt is the first column of pass-list.txt, rewritten as corpus<TAB>file:',
'',
'        tail -n +2 explorations/compile-ladder/baseline-2026-09-19/pass-list.txt | cut -f1 | sed \'s|/|\\t|\' > ' + LOG_DIR + '/ladder/subset.txt',
'',
'   c. Run run-subset.sh, then classify.py in that directory to get ladder.tsv, then microgpt-phase.sh and microgpt-phase.py for the eighteen. Budget about 200 s for the 85 and about 35 s for the eighteen; the baseline measured 192 s of program time for the 85 on a busy host and the library rebuild is what the copy removes.',
'   d. Compare:',
'',
'        ladder_filter () { sed -E \'s/Operation took [0-9.]+ms/Operation took <time>ms/\' "$1" ; }',
'        ladder_compare () {               # ladder_compare <baseline-dir> <now-dir>; prints one DOWN, UP, NEW, MISSING or STDOUT line per moved file, and nothing when nothing moved',
'            local B="$1" N="$2" key',
'            awk -F\'\\t\' \'',
'              function rank(p,   r) { r["parse"]=1; r["disambiguate"]=2; r["typecheck"]=3; r["codegen"]=4;',
'                                      r["link"]=5; r["run"]=6; r["pass"]=7; return r[p] + 0 }',
'              FNR == NR { if (FNR > 1) b[$1 "/" $2] = $4 ; next }',
'              FNR > 1 {',
'                  k = $1 "/" $2',
'                  if (!(k in b))                  { print "NEW\\t" k "\\t" $4 ; next }',
'                  if (rank($4) < rank(b[k]))      { print "DOWN\\t" k "\\t" b[k] " -> " $4 }',
'                  else if (rank($4) > rank(b[k])) { print "UP\\t" k "\\t" b[k] " -> " $4 }',
'              }\' "$B/ladder.tsv" "$N/ladder.tsv"',
'            tail -n +2 "$B/pass-list.txt" | cut -f1 | while IFS= read -r key ; do',
'                [ -n "$key" ] || continue',
'                if [ ! -f "$N/raw/$key.run" ] ; then printf \'MISSING\\t%s\\n\' "$key" ; continue ; fi',
'                if ! diff -q <(ladder_filter "$B/raw/$key.run") <(ladder_filter "$N/raw/$key.run") >/dev/null ; then',
'                    printf \'STDOUT\\t%s\\n\' "$key"',
'                    diff <(ladder_filter "$B/raw/$key.run") <(ladder_filter "$N/raw/$key.run") | sed \'s/^/    /\' | head -8',
'                fi',
'            done',
'        }',
'',
'      The timing filter is what makes the three nestedTransactions captures comparable; they are the only files among the 85 whose output varies from run to run, and the filter masks exactly the line that varies rather than exempting the file, so a change in the rest of their output is still caught. If a later run shows another file varying, exempt it from the STDOUT half only and never from the phase half, and say so in your result.',
'',
'      For the eighteen, compare the phase column of the baseline\'s microgpt-phase.md against this run\'s:',
'',
'        mg_phases () { awk -F\'|\' \'/^\\| *[0-9]+ *\\| *`/ { gsub(/[` ]/, "", $3); gsub(/ /, "", $4); print $3 "\\t" $4 }\' "$1" ; }',
'        diff <(mg_phases explorations/compile-ladder/baseline-2026-09-19/microgpt-phase.md) <(mg_phases ' + LOG_DIR + '/ladder/microgpt-phase.md)',
'',
'      Every one of the eighteen is at disambiguate today. A move UP is the batch\'s real result and the summary says so plainly; a move DOWN is red.',
'   e. Append the comparison\'s output to ' + GATE_OUT + '/summary.txt, every line prefixed with "# ladder ", and copy ladder.tsv, microgpt-phase.md and the comparison into ' + GATE_OUT + '/ladder/ - those are small and they are committed. The raw captures and the driver logs stay in ' + LOG_DIR + ' and are not.',
'',
'   A DOWN, a STDOUT or a MISSING line is RED unless the manifest declared it. This batch declared these expected moves, which are the files a rung changes on purpose; anything on this list is reported, not red, and a file NOT on this list that moves down is red and goes to the judge with the diff:',
'',
(expectedMoves.length ? expectedMoves.map(m => '     - ' + m).join('\n') : '     (none: no rung of this batch expects to move a ladder file)'),
'',
'8. The checker count: the compiler\'s static checker run over the INTERPRETER\'s library, and its error total compared with the last landed one. Pavol decided on 2026-09-21 that the one library the compiler checks is the interpreter\'s (POSITIONS.md, "the library route"), and step 1 of explorations/coordinator/library-route-judgement.md makes the distance to it a stage of this gate rather than a script anybody re-runs by hand, so that from now on every batch measures it. The count is reported, not gated, whatever the header of run.sh says (explorations/coordinator/checker-gate-review.md, 2026-09-23). Read the header of explorations/coordinator/tools/checker-count/run.sh, then run',
'',
'        explorations/coordinator/tools/checker-count/run.sh ' + GATE_OUT + '/checker-count.txt ' + LOG_DIR + '/checker-count',
'',
'   from ' + MAIN + '. It compiles the two sources beside it - WorldFlip.java, which flips the world with the public Shell.useInterpreterLibraries() and PhaseOrder.compilerPhaseOrder, and an instrumented copy of StaticChecker that names each api it checks and survives the OverloadingChecker crash - against bin/fortress_classpath, and runs the compiler phase order over Library/FortressLibrary.fss with its own -Dfortress.caches under ' + LOG_DIR + '/, so default_repository/ is neither read nor written and no library rebuild is needed. Since climb batch 7 it runs with the overloading checker\'s memo off (-Dfortress.analyzer.overload.cache=false): the memo is keyed on declaration pairs and hides 27 to 35 errors depending on the build order once an api reaches its overloading check (FACTS.md, "The hidden layer, classified"), which the FortressLibrary api does once a rung clears its early errors; with it off every build gives one count. 20 s measured in the main tree on 2026-09-22, 33 s on 2026-09-27; budget a minute. It edits nothing and its only tracked output is the table, which you write and, like the summary, do NOT commit. Print the table in your result: one row per api with that api\'s own error count, then #total, #locations (the distinct file:line the errors were reported at, by this script\'s count), #crash (the crash the checker meets after the apis: none in every table landed since climb batch 4; before it, the nat gap, Not yet implemented at STypesUtil.scala:557), #cache (the memo\'s setting; a landed table without the row was measured with the memo on, which gave the same 62 on the tree of 2026-09-27) and #shadow.',
'',
'   Then compare it with the last landed table, found the way the summary is found:',
'',
'        last_landed_checker_count () {',
'            git -C "$FORTRESS_HOME" log --name-only --pretty=format: -- \\',
'                \'explorations/compile-ladder/gate-baseline/checker-count.txt\' \\',
'                \'explorations/compile-ladder/climb-batch-*/gate/checker-count.txt\' | grep -m1 \'checker-count.txt$\'',
'        }',
'',
'        checker_compare () {              # checker_compare <last-landed-table> <this-table> [declared-totals] [declared-crash]; prints the verdict lines, exit 1 if any is red; the total is never red',
'            local was now wasc nowc bad=0 decl="${3:-none}"',
'            was=$(awk -F\'\\t\' \'$1 == "#total" { print $2 }\' "$1")',
'            now=$(awk -F\'\\t\' \'$1 == "#total" { print $2 }\' "$2")',
'            wasc=$(awk -F\'\\t\' \'$1 == "#crash" { print $2 }\' "$1")',
'            nowc=$(awk -F\'\\t\' \'$1 == "#crash" { print $2 }\' "$2")',
'            [ -n "$now" ] || { echo "NO TOTAL   the table has no #total row" ; return 1 ; }',
'            if [ "$now" -gt "$was" ] ; then echo "COUNT UP   $was -> $now, declared $decl"',
'            elif [ "$now" -lt "$was" ] ; then echo "COUNT DOWN   $was -> $now, declared $decl"',
'            else echo "COUNT SAME   $now, declared $decl" ; fi',
'            if [ "$nowc" != "$wasc" ] ; then',
'                if [ -n "${4:-}" ] && [ "$nowc" = "$4" ] ; then echo "CRASH DECLARED   $wasc -> $nowc"',
'                else echo "CRASH CHANGED   $wasc -> $nowc" ; bad=1 ; fi',
'            fi',
'            case "$(awk -F\'\\t\' \'$1 == "#shadow" { print $2 }\' "$2")" in',
'              STALE*) echo "SHADOW STALE   the instrumented StaticChecker copy no longer matches the tracked one" ; bad=1 ;;',
'            esac',
'            diff "$1" "$2" | sed \'s/^/    /\'',
'            [ "$bad" = 0 ]',
'        }',
'',
'   Run it as checker_compare "$(last_landed_checker_count)" ' + GATE_OUT + '/checker-count.txt "' + ((expectedChecker && expectedChecker.counts && expectedChecker.counts.length) ? expectedChecker.counts.join(', ') : 'none') + '"' + ((expectedChecker && expectedChecker.crashes && expectedChecker.crashes.length) ? ' "' + expectedChecker.crashes[0].replace(/^[^:]*: /, '') + '" (the declared crash line, without its rung prefix, as the fourth argument)' : '') + ', and append its output to ' + GATE_OUT + '/summary.txt with every line prefixed by "# checker ".',
'',
'   The total is REPORTED and is never red on its own (explorations/coordinator/checker-gate-review.md): a fix can raise it, because the checker stops checking an api at that api\'s first errors (StaticChecker.java:268-272) and clearing them lets its later rules run there for the first time, and two rungs\' changes do not add, so neither a rise nor a missed declaration tells progress from harm. COUNT UP, COUNT DOWN and COUNT SAME each print the declared totals beside the measured one; a declaration is a prediction written before the run, printed and not enforced, and the post-batch review explains every new or risen row of the landed table. A CRASH CHANGED line that no rung declared stays RED, as before, and so does SHADOW STALE, which means the copy beside run.sh is no longer the checker the tree builds and the number is not this tree\'s. The per-api rows and #locations are printed either way, so print the diff in your result. What this batch declared:',
'',
(expectedChecker && expectedChecker.counts && expectedChecker.counts.length
  ? expectedChecker.counts.map(m => '     - total: ' + m).join('\n')
  : '     - total: none declared; the change is printed all the same'),
(expectedChecker && expectedChecker.crashes && expectedChecker.crashes.length
  ? expectedChecker.crashes.map(m => '     - crash line: ' + m).join('\n')
  : '     - crash line: none declared, so any change of it is red'),
'',
'9. The distance stage, started at step 2: the same checker over the whole interpreter library, the twelve prelude apis and their twelve components, with every stage of every unit run whatever the earlier stages reported, so that nothing hides behind an api\'s early return. Step 8 sees only the errors before each early return, 62 of about 1,750 on the tree of 2026-09-27. This stage is Pavol\'s answer 11 (POSITIONS.md, 2026-09-26): the full measurement of the distance to the switch-over "becomes a report-only stage of phase 3\'s gates, whose job is driving it down". It runs the setting any, the compiled path with the implicit bound Any, because batch 7\'s question 1 was answered (a) (POSITIONS.md, 2026-09-27, the numerics plans), and the overloading memo off; the header of explorations/coordinator/tools/distance/run.sh says why and what each row is. Wait for it with wait_for ' + LOG_DIR + '/distance.txt, called again until it prints its EXIT= line; never start it a second time. Then compare its table with the last landed one, found the way the others are found:',
'',
'        last_landed_distance () {',
'            git -C "$FORTRESS_HOME" log --name-only --pretty=format: -- \\',
'                \'explorations/compile-ladder/gate-baseline/distance.txt\' \\',
'                \'explorations/compile-ladder/climb-batch-*/gate/distance.txt\' | grep -m1 \'distance.txt$\'',
'        }',
'',
'   Run explorations/coordinator/tools/distance/compare.sh "$(last_landed_distance)" ' + GATE_OUT + '/distance.txt and append its output to ' + GATE_OUT + '/summary.txt with every line prefixed by "# distance ". It prints DISTANCE DOWN, UP or SAME with the two totals, or DISTANCE FIRST when no table has landed yet, then every kind, root-cause class and unit whose count moved and every crash that went or came. It is REPORTED and never red: not on a rise, not on a new crash, not on SHADOW STALE (a shadow edit that no longer matches the tracked sources, so the checker did not run) and not on DISTANCE NO TABLE (a run that produced no count). A move of 2 to 4 errors in the components\' type errors, or in which LEXICO, SQCAP or INVERSE pair an overloading error names, is the checker\'s run-to-run variation, not a change. Print in your result the table\'s #total, #kind, #class, #seconds and #shadow rows and the comparison\'s lines.',
'',
'## What green means',
'',
'Zero failures and zero errors in every suite of testFast and of testSystem, BUILD SUCCESSFUL on compileAll and on both suites, no COUNT DOWN and no SUITE GONE line from gate_compare, every atomic run PASS, no undeclared DOWN, STDOUT or MISSING line from the ladder comparison, and from the checker count an unchanged crash line, unless a rung declared the new one, and no stale shadow. The checker\'s total, up or down, declared or not, is reported and never red, and so is everything the distance stage of step 9 prints, a run of it that produced no table included. Anything else is red.',
'',
'Write ' + GATE_OUT + '/summary.txt, ' + GATE_OUT + '/checker-count.txt and ' + GATE_OUT + '/distance.txt as the snippets and the scripts produce them - do not hand-write any of them; the last two batches wrote agent prose and one of them got a suite count wrong. Do NOT commit them. Return the structured result. If red, name every failing test and copy the first failure\'s output lines into the result; the judge reads them.',
'',
  ].join('\n')
}

const GATE_SCHEMA = {
  type: 'object',
  properties: {
    green: { type: 'boolean' },
    compileAll: { type: 'string', description: 'BUILD SUCCESSFUL or the first error' },
    testFast: { type: 'string', description: 'suites, tests, failures, errors' },
    testSystem: { type: 'string', description: 'shards, tests, failures, errors' },
    countsDown: { type: 'array', items: { type: 'string' }, description: 'every COUNT DOWN or SUITE GONE line from gate_compare, with the suite named; empty if none' },
    atomicFourThread: { type: 'string', description: 'the thirteen programs, three runs each at FORTRESS_THREADS=4: how many PASS, and every line that is not PASS' },
    ladder: { type: 'string', description: 'the 85 files and the eighteen microGPT components: moves up, moves down, stdout differences, and which were declared in the manifest' },
    checkerCount: { type: 'string', description: 'the checker count over the interpreter library: the total, the last landed total it was compared against, the crash line, every verdict line checker_compare printed, and the per-api rows that moved' },
    distance: { type: 'string', description: 'the distance stage of step 9, reported and never red: the table\'s #total, the verdict line compare.sh printed with the last landed total, the kinds and classes that moved, the crashes that went or came, #seconds, and #shadow; or why the run produced no table' },
    failing: { type: 'array', items: { type: 'string' }, description: 'failing test names with the key output line each' },
    stopped: { type: 'boolean', description: 'true if the gate could not be run (disk, build failure before tests)' },
    summaryPath: { type: 'string', description: 'the path of the summary file you wrote, and the path of the last landed one you compared against' },
    summary: { type: 'string' },
  },
  required: ['green', 'failing', 'stopped', 'summary'],
}

// Pavol, 2026-09-29 (POSITIONS.md, rerunning the gate after a repair that only
// added tests): a repair on the merged tree that changes no source, library,
// checker, interpreter or specification file does not rerun the gate. It runs the
// test files it added or changed in the harness, the gate's own JUnit mechanics
// for those files, and the first gate's tables stand. A test file is a .fss, .fsi
// or .test file directly in one of the corpora the harness reads, the directories
// named tests or ending in _tests under ProjectFortress/ (FileTests reads them flat).
const TEST_FILE = /^ProjectFortress\/(tests|[A-Za-z_]+_tests)\/[^/]+\.(fss|fsi|test)$/
const repoPath = (p) => p.trim().replace(/^\.\//, '')
const codePathsOf = (paths) => strings(paths).map(repoPath).filter(p => !p.startsWith('explorations/') && !TEST_FILE.test(p))
const testPathsOf = (paths) => strings(paths).map(repoPath).filter(p => TEST_FILE.test(p))

function repairTestsStep(kind, failing) {
  return [
'',
'## Your tests, and whether the gate runs again',
'',
'Record the hash HEAD is at before your first commit and the hash after your last, and return both, and in pathsChanged every path git diff --name-only <before> <after> prints. The script decides from that list whether the whole gate runs again after you (Pavol, POSITIONS.md 2026-09-29, on rerunning the gate after a repair that only added tests). A path outside explorations/ that is not a test file - source, library, checker, interpreter or specification - reruns it, as before. Test files and records only do not: then your runs below are the verification of your tests, the first gate\'s tables stand, and the commit stage records your tests\' lines beside the first gate\'s summary. A test file here is a .fss, .fsi or .test file directly in one of the corpora the harness reads, ProjectFortress/tests/ and the ProjectFortress/*_tests/ directories.',
'',
'Every test file you add or change there you run in the harness on the merged tree, placed where the gate reads it, with the gate\'s own JUnit mechanics, and all the files of one corpus TOGETHER, in one harness run, one JVM, as the gate\'s track runs them: a file that passes alone can fail beside others in one JVM, as batch 6.5\'s WitnessIdentityRungG did under the gate (explorations/reviews/batch-6.5-review.md, item 78), and running them together is the one thing a second gate would still have added (explorations/reviews/batch-N-review.md, question 4). The .test files of compiler_tests/, and those of library_tests/, each through one call of ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh <label> <the directory> <Name.test>..., which runs fortress junit once over the list, the harness\'s FileTests.suiteFromListOfFiles, its compile and link tests before its run tests, so a link test still runs before its XXX run test; the interpreter tests of tests/ through one call of explorations/compile-ladder/rung-inference-walk/harness-one.sh <scratch dir under tmp/> <file.fss>..., which runs SystemJUTest, the class testSystem\'s shards run, once over a directory holding only the named files with testSystem\'s JVM settings. Batch N\'s repair ran each file in its own JVM (explorations/compile-ladder/climb-batch-N/merged-tests/repair-junit-placed.txt); do not. Capture each run\'s output under ' + LOG_DIR + '/repair-' + kind + '-tests/, which is not committed (the post-mortem of 2026-09-29: no capture is committed anywhere). In testRuns return one entry per file: the file, the added or changed test paths its lines in the run exercise (a .test and the .fss it names), the summary.txt row it adds to (fast-compiler/CompilerJUTest, fast-library/LibraryJUTest, or system for tests/), the JUnit cases it adds (its lines of the run; the files of one run add up to the n of its OK (n tests) or Tests run: n), its verdict (pass only when the run that held it printed OK, so a failure anywhere in a run fails every file of it), and the path of that run\'s capture. A test path you changed that no run exercises, or a run that did not pass, reruns the gate.',
...(kind === 'gate' ? [
'',
'The gate was red on these lines:',
'',
JSON.stringify(strings(failing), null, 2),
'',
'In failingAnswered return one entry per line, in order: the line, and the test file of testRuns whose passing run now answers it, or empty where no run of yours does (an atomic run, the ladder, a suite count, the checker count). The gate does not run again only when every line is answered and your commit changed no path that reruns it.',
] : strings(failing).length ? [
'',
'The gate that ran beside the review was red on these lines:',
'',
JSON.stringify(strings(failing), null, 2),
'',
'Your ruling is the review\'s, not the gate\'s: do not take on a line it does not touch. Where your ruling\'s edit is to the test a line names, and your harness run above passes it, that run answers the line. In failingAnswered return one entry per line, in order: the line, and the test file of testRuns whose passing run now answers it, or empty where no run of yours does (a line your ruling does not touch, an atomic run, the ladder, a suite count, the checker count). When every line is answered and your commit changed no path that reruns the gate, no gate judge and no gate repair run after you, and the first gate\'s tables stand beside your runs (Pavol, POSITIONS.md 2026-09-29, on rerunning the gate after a repair that only added tests).',
] : []),
'',
  ]
}

function mergedRepairRole(decision, kind, failing) {
  return MAIN_TREE_ROLE + [
'# Your role: repair on the merged tree (' + kind + ')',
'',
...sliceStep(RUNGS, 'the main tree (' + MAIN + ')', 'First, before the ruling below,'),
'',
'The judge has ruled on the merged tree; you execute the ruling. Its decision:',
'',
JSON.stringify(decision, null, 2),
'',
(strings(decision && decision.forPavol).length
  ? 'The judge marked these for Pavol. ' + PLAN_RULE + ' The entries go in your commit, and pavolItems lists each by its id.\n\n' + JSON.stringify(numbered('judge-' + kind, decision.forPavol), null, 2) + '\n\n'
  : '') + 'Its full ruling is in ' + BATCH_DIR + '/JUDGE-' + kind + '.md. Carry out the instructions in order. Where one turns out wrong against a primary source, do what the source says and record the deviation in ' + BATCH_DIR + '/REPAIR-' + kind + '.md with the file:line that settles it. Rebuild what the edit needs (ant compileAll for Java, then the library-order rebuild), run the tests the ruling names, and commit locally, one commit, with the record files updated where the ruling says and a historical: line in the body if the commit touches a file of the 2012 tree. Every defect this repair measures and fixes gets its assertion in a gated test, as the shared prefix requires. Do not run the full gate; the gate stage runs it after you when the section below says it does. Do not push.',
...repairTestsStep(kind, failing),
  ].join('\n')
}

// The push rule (CLIMB-BATCH-6.md section 8, item 2): the commit stage pushes
// only when no landed rung carries a stop that was met and not lifted. The stops
// are those each landed rung's last worker report and last skeptic verdict list,
// those the merged-diff review lists, and those each repair on the merged tree
// lists (repairs, by label: since the post-mortem of 2026-09-29 no second review
// reads a repair's commit, so its own stopsMet are read here; the script review
// of that night, finding 1); only Pavol lifts a stop, so an entry counts as lifted
// only when its liftedBy cites POSITIONS.md. A malformed entry counts as not
// lifted. Batches 4 and 5 held the push by the landing agent's reading of the
// intro alone, and batch 5's push went out past a stop.
function pushHeldBy(landed, review, repairs) {
  const lifted = (s) => !!(s && typeof s === 'object' && /POSITIONS\.md/.test(s.liftedBy || ''))
  const line = (id, s) => id + ': ' + ((s && s.stop) || String(s)) + ((s && s.evidence) ? ' (' + s.evidence + ')' : '')
  const own = [].concat.apply([], landed.map(r => [].concat((r.worker && r.worker.stopsMet) || [], (r.verdict && r.verdict.stopsMet) || [])
    .filter(s => !lifted(s)).map(s => line(r.rung, s))))
  const reviewed = ((review && review.stopsMet) || []).filter(s => !lifted(s)).map(s => line((s && s.rung) || 'review', s))
  const repaired = [].concat.apply([], Object.keys(repairs || {}).filter(k => repairs[k]).map(k => (repairs[k].stopsMet || []).filter(s => !lifted(s)).map(s => line(k, s))))
  return own.concat(reviewed, repaired)
}

// The repairs whose tests stand beside the gate's summary instead of a second gate
// (repairRerun): each { kind, runs, answered } as the script kept it.
function besideStep(beside) {
  if (!beside.length) return []
  const cases = [].concat.apply([], beside.map(b => b.runs)).reduce((n, t) => n + (Number(t.cases) || 0), 0)
  return [
'1a. The gate below ran on the tree before a repair on the merged tree that changed test files and records only, so it was not run again (Pavol, POSITIONS.md 2026-09-29, on rerunning the gate after a repair that only added tests): its tables stand, and the repair ran its tests in the harness on the merged tree. Record them beside the summary, in the same commit as step 1, so that the next batch\'s comparand is stated honestly: after the gate\'s own lines, append to ' + GATE_DIR + '/summary.txt one line per run below, tab-separated and prefixed "# repair-tests", with the repair\'s kind, the summary row it adds to, its JUnit cases, its verdict and the file; then, for each line the gate failed on that the repair answered, a line "# repair-tests answered", the gate\'s line and the file whose run answers it; and last "# repair-tests total" with ' + cases + ', the cases these runs add, by which every count the next gate reads rises beyond this summary\'s rows. Do not change the gate\'s own rows. The runs and answers:',
'',
JSON.stringify(beside, null, 2),
'',
  ]
}

// The commit stage, steps 1 to 5. From 2026-09-29 until the post-mortem of the same
// night a second review after a repair on the merged tree split it in two, a local
// part beside that review and a push after it; with the second review gone it is one
// stage again (postmortem-2026-09-29/synthesis.md, section 4, items 35 and 36).
function commitRole(gather, gate, heldBy, beside) {
  const held = heldBy.length > 0
  beside = beside || []
  const answered = beside.some(b => strings((b.answered || []).map(a => a && a.failing)).length)
  const tree = beside.length
    ? 'The gate ran on the tree before a repair of test files and records only and was not run again; its tables stand, ' + (answered ? 'the lines it was red on answered by the repair\'s passing runs' : 'green') + ' (step 1a).'
    : 'The gate is green on the tree as it stands.'
  return MAIN_TREE_ROLE + [
'# Your role: commit',
'',
held
  ? tree + ' Land it on the local main; the script holds the push (step 3).'
  : tree + ' Land it.',
'',
'1. Replace every literal <short hash> placeholder in the ledger, FACTS, the handover and ' + BATCH_DIR + '/RECORD.md with the hash of the commit it refers to, from the gather stage\'s result below. RECORD.md is the gather\'s, written once: in it you replace the hashes and add the gate\'s summary line, and rewrite nothing else. Copy the gate\'s outputs into the tree first: mkdir -p ' + GATE_DIR + ' && cp -R ' + GATE_OUT + '/. ' + GATE_DIR + '/ - the gate wrote them under tmp/, untracked, so that a run that stops before this stage leaves nothing untracked in the tree, and it committed nothing because the review was committing in this tree at the same time. Then add ' + GATE_DIR + '/summary.txt, ' + GATE_DIR + '/checker-count.txt, ' + GATE_DIR + '/distance.txt and ' + GATE_DIR + '/ladder/ to the same commit, and copy ' + LOG_DIR + '/distance/errors.tsv to ' + SITES + ', one fixed path overwritten at each landing (mkdir -p ' + SITES.replace(/\/[^/]*$/, '') + '), and add it too: the distance stage\'s per-site list, which the next batch\'s count and distance rungs read as their "before" instead of re-running the stage on an unchanged base (POSITIONS.md, 2026-09-28, the entry on rungs re-running measurements). The checker-count and distance tables are the comparands the next batch\'s gate reads, so a batch that lands without them leaves the next gate comparing against older ones. Title it "Record the landed commits\' hashes and the gate summary". grep -rn "<short hash>" explorations/ afterwards must be empty, and the full gate logs under ' + LOG_DIR + '/ are NOT committed and never are. When any landed commit changed a file under Specification/ (git diff --name-only ' + BASE + '..HEAD -- Specification/), run ant tex once and add Specification/fortress.pdf to this commit; its log stays under ' + LOG_DIR + '/ and is not committed. The build is the one the rungs used: in Specification/fortress/, ./ant genSource and then ./ant tex, each logged under ' + LOG_DIR + '/; copy Specification/fortress/fortress.pdf to Specification/fortress.pdf and add nothing else the build wrote.',
...besideStep(beside),
'2. Verify every commit since ' + BASE + ' ends with the two footer lines and contains no model identifier (git log ' + BASE + '..HEAD --format=%B), and that every commit whose diff touches a path outside explorations/ carries a historical: line.',
...commitPushSteps(held, heldBy),
'',
'The gather stage returned:',
'',
JSON.stringify(gather, null, 2),
'',
'The gate stage returned:',
'',
JSON.stringify(gate, null, 2),
'',
(held
  ? 'Return the structured result: the hash main is at locally as mainHead, pushed empty, pushHeld true, and the stops above in heldBy.'
  : 'Return the structured result: the hash main is at on origin, the commits pushed, and what was cleaned up.'),
'',
  ].join('\n')
}

// Steps 3 to 5 of the commit stage: the push or the held push; the two microGPT
// programs under walk, started in the background on the landed tree and not awaited
// (Pavol, 2026-09-19: running them is a separate non-gating stage; since the
// post-mortem of 2026-09-29 no rung runs them); and the clean-up.
function commitPushSteps(held, heldBy) {
  return [
held
  ? '3. Do NOT push: not main, not ' + CONTAINER_BRANCH + ', no branch. The script holds the push, because landed rungs carry stops that were met and that no decision of Pavol\'s lifts:\n\n' + heldBy.map(h => '- ' + h).join('\n') + '\n\n   Append to ' + BATCH_DIR + '/RECORD.md a paragraph headed "Not pushed." that names each of these stops with its rung and evidence, gives the hash origin/main stays at, and says that the push waits on Pavol, as batch 4\'s and batch 5\'s records did; commit it locally with the footer. The coordinator pushes once he has lifted them.'
  : '3. git push origin main; then git push origin main:' + CONTAINER_BRANCH + ' so the container\'s own branch stays at main. Retry a failed push up to four times with 2, 4, 8, 16 seconds between.',
'4. Start the two microGPT programs under walk on the landed tree in the background, to ' + LOG_DIR + '/microgpt-walk.txt, and do not wait for them: the coordinator reads the file at the landing report or the post-batch review (Pavol, 2026-09-19: a separate non-gating stage). From ' + MAIN + ', with run_bg from the shared prefix, and only if no earlier attempt or run started them, as the log exists once they are started:\n\n        [ -e ' + LOG_DIR + '/microgpt-walk.txt ] || run_bg ' + LOG_DIR + '/microgpt-walk.txt "explorations/coordinator/tools/mg-run.sh ' + LOG_DIR + '/microgpt-walk batch-' + BATCH + '"\n\n   A second start would delete the private caches of the programs already running and put four JVMs of 4 GB on the box. The tool runs MicroGptFlatCheck and MicroGptAplCheck under walk, both at once, each from an empty private cache, about 80 minutes each; each program\'s output goes to ' + LOG_DIR + '/microgpt-walk/<name>.txt, headed by the machine line and ended by rc=, and ' + LOG_DIR + '/microgpt-walk.txt ends in EXIT= when both are done. Nothing of it is committed.',
held
  ? '5. Keep every wip/ worktree and its local branch: their removal follows the push, as batch 5\'s commit stage kept them while its push was held.'
  : '5. For each wip/ branch: confirm git -C <worktree> status -sb shows nothing ahead of its origin; restore the one tracked file a build deletes, git -C <worktree> checkout -- default_repository/caches/global.map (FACTS.md, "ant compileAll deletes a tracked file"); then git worktree remove <worktree>, without --force (its ignored tmp/ goes with it; the transcripts hold what it held), and git branch -D <branch>. A worktree git refuses to remove holds uncommitted or untracked work: keep it and its branch, and name it in your result with its git status --short; the coordinator decides. Leave the remote wip/ branches: the proxy refuses branch deletion from here, and Pavol removes them in the GitHub UI.',
  ]
}

// The repair on the merged tree returns a worker's result, the items for Pavol it
// put into PLAN.md, the paths its commits changed and its tests' runs, from which
// the script decides whether the gate runs again (repairRerun, below).
const MERGED_REPAIR_SCHEMA = Object.assign({}, RUNG_SCHEMA, {
  properties: Object.assign({}, RUNG_SCHEMA.properties, {
    pavolItems: PAVOL_ROUTED,
    headBefore: { type: 'string', description: 'the hash HEAD was at before your first commit' },
    headAfter: { type: 'string', description: 'the hash HEAD is at after your last commit' },
    pathsChanged: { type: 'array', items: { type: 'string' }, description: 'every path git diff --name-only <headBefore> <headAfter> prints, inside explorations/ or not' },
    testRuns: { type: 'array', description: 'one entry per test file added or changed outside explorations/, run in the harness on the merged tree together with the other files of its corpus, one run per corpus; empty if none',
      items: { type: 'object', properties: {
        file: { type: 'string', description: 'the file run, as the repository path' },
        paths: { type: 'array', items: { type: 'string' }, description: 'the added or changed test paths its lines of the run exercise' },
        suite: { type: 'string', description: 'the summary.txt row it adds to: fast-compiler/CompilerJUTest, fast-library/LibraryJUTest, or system' },
        cases: { type: 'integer', description: 'the JUnit cases it adds' },
        verdict: { type: 'string', enum: ['pass', 'fail'], description: 'pass only when the run that held it printed OK' },
        capture: { type: 'string', description: 'the path of that run\'s capture under ' + LOG_DIR + '/, not committed, shared by the files of the run' },
      }, required: ['file', 'paths', 'suite', 'cases', 'verdict', 'capture'] } },
    failingAnswered: { type: 'array', description: 'the gate\'s repair, and the review\'s repair when the gate beside the review was red and its lines are in your role: one entry per line of the gate\'s failing list, in order; otherwise empty',
      items: { type: 'object', properties: {
        failing: { type: 'string' },
        file: { type: 'string', description: 'the testRuns file whose passing run answers it; empty if none does' },
      }, required: ['failing', 'file'] } },
  }),
  required: RUNG_SCHEMA.required.concat(['headBefore', 'headAfter', 'pathsChanged', 'testRuns']),
})

// Whether the gate runs again after a repair on the merged tree. It does when the
// repair, or the review's corrections before it (reviewPaths), changed a path
// outside explorations/ that is not a test file; when a test path they changed is
// not exercised by a passing run of the repair's; when the repair did not say what
// it changed; and, after the gate's repair (redGate, the gate it repaired), when the
// gate's own counts fell or a suite went, when it named no failing line, or when a
// line it failed on is not answered by a passing run. After the review's repair,
// redGate is the red gate that ran beside the review, asked of a repair the first
// call found to be of tests and records only: whether its runs already answer that
// gate's lines, so that no gate judge runs (below "The run."). Otherwise the first gate's
// tables stand and the repair's runs are recorded beside its summary. No second
// review runs after it since the post-mortem of 2026-09-29.
function repairRerun(repair, reviewPaths, redGate) {
  if (!repair) return { rerun: true, why: 'the repair returned nothing' }
  if (!Array.isArray(repair.pathsChanged)) return { rerun: true, why: 'the repair did not list the paths it changed' }
  const changed = strings(repair.pathsChanged).concat(strings(reviewPaths))
  const code = codePathsOf(changed)
  if (code.length) return { rerun: true, why: 'changed outside explorations/, not a test file: ' + code.join(', ') }
  const runs = Array.isArray(repair.testRuns) ? repair.testRuns.filter(t => t && typeof t === 'object') : []
  const passing = runs.filter(t => t.verdict === 'pass')
  if (passing.length < runs.length) return { rerun: true, why: 'a test run of the repair did not pass: ' + runs.filter(t => t.verdict !== 'pass').map(t => t.file).join(', ') }
  const exercised = new Set([].concat.apply([], passing.map(t => testPathsOf([t.file].concat(strings(t.paths))))))
  const unrun = testPathsOf(changed).filter(p => !exercised.has(p))
  if (unrun.length) return { rerun: true, why: 'test path(s) no passing run of the repair exercises: ' + unrun.join(', ') }
  const lines = redGate ? strings(redGate.failing) : []
  if (redGate) {
    if (strings(redGate.countsDown).length) return { rerun: true, why: 'the gate\'s own counts fell or a suite went: ' + strings(redGate.countsDown).join('; ') }
    if (!lines.length) return { rerun: true, why: 'the gate was red and named no failing line for the repair to answer' }
    const answers = Array.isArray(repair.failingAnswered) ? repair.failingAnswered : []
    const passed = new Set(passing.map(t => repoPath(String(t.file))))
    const open = lines.filter(l => !answers.some(a => a && String(a.failing).trim() === l.trim() && typeof a.file === 'string' && passed.has(repoPath(a.file))))
    if (open.length) return { rerun: true, why: 'gate line(s) no passing run of the repair answers: ' + open.join('; ') }
  }
  return { rerun: false, runs: passing, answered: lines.length ? repair.failingAnswered : [], why: testPathsOf(changed).length ? 'test files and records only' : 'records only' }
}

const COMMIT_SCHEMA = {
  type: 'object',
  properties: {
    mainHead: { type: 'string' },
    pushed: { type: 'array', items: { type: 'string' } },
    containerBranchAtMain: { type: 'boolean' },
    cleanedUp: { type: 'array', items: { type: 'string' } },
    pushHeld: { type: 'boolean', description: 'true when the script held the push on a stop met and not lifted' },
    heldBy: { type: 'array', items: { type: 'string' }, description: 'the stops that held the push, as the role gave them; empty if pushed' },
    summary: { type: 'string' },
  },
  required: ['mainHead', 'pushed', 'containerBranchAtMain', 'pushHeld', 'summary'],
}

// ---------------------------------------------------------------------------
// An agent that comes back with nothing, and the retry.
//
// agent() gives the script nothing in two ways (the workflow-authoring
// reference, agent(), parallel(), pipeline() and budget): it returns null when
// the subagent dies on a terminal API error or the user skips it, and it throws
// when the token budget is spent, when its options are malformed, or when the
// run is aborted. In climb batch 6 (run wf_b262c534-337, 2026-09-27, 03:34:03
// UTC) rung R's second skeptic returned its verdict, approved, through the
// structured-output tool; the API's safety filter then blocked its next
// message, a false positive, the harness marked the agent failed, agent()
// returned null, and the stage below recorded R as dropped. Pavol asked for a
// retry in the script.
//
// callAgent is the one door to agent(). It treats null, undefined and a thrown
// error alike, runs the role again up to two more times, and logs every attempt
// that came back with nothing by the role's label; only after the last attempt
// does it return null, which every call site already reads as a dead agent. A
// user's skip returns the same null as a death, so a skipped agent is retried
// too. A retry's prompt opens with retryHead: an earlier attempt ended without
// its result, and what that attempt may have left, per stage (the recover*
// functions below), so that it continues rather than redoes the work.
//
// Cache keys. The run's journal keys each call by a hash over the previous
// call's key, the prompt and the options, and journals a null result as failed,
// never as a result, so resumeFromRunId has no empty result to hand back. On
// top of that, attempt n > 1 opens its prompt with a head that names n and
// carries a label ending ":attempt<n>", so no two attempts of a role share a
// prompt, options or key. Attempt 1 passes the call's prompt and options
// unchanged, byte for byte, so its key is the one the unwrapped call had.
//
// A stop that decides nothing (climb batch 7b's review, finding 1; approved by
// Pavol on 2026-09-30). At the account's weekly limit, at 02:16 UTC on 2026-09-30,
// every agent of run wf_61521277-479 came back with nothing: agent() returned
// null, the harness logging "[skeptic:C] failed: You've hit your weekly limit".
// callAgent ran each role three times within seconds; the stage below read each
// null skeptic as a refusal and each null judge as a drop, and the script marked
// C, S and L dropped and started the gather with W alone, which failed on the
// limit too, the only thing that kept W from landing alone
// (explorations/reviews/batch-7b-review.md, section 3). A limit stops every agent
// at once, and the script has no clock to wait it out with. So the run stops,
// before anything more is started or decided, in two cases: agent() throws an
// error that names a usage or rate limit (LIMIT_ERROR), and the role is not run
// again; or a skeptic or a judge (callAgent's needed) comes back with nothing
// after its attempts, whatever the cause, since a null does not say it. Once the
// run stops, callAgent throws at every attempt before it starts an agent, a stage
// of the scatter that throws drops its rung to null, and the script throws below
// the scatter. The journal holds every agent that finished, and each empty attempt
// as failed, so resumeFromRunId with the same script and args returns the finished
// agents from it and runs the stopped role again. A worker, the gather, the
// review, the gate and the commit that come back with nothing, and no limit error
// thrown, keep their paths (worker-died, gather unresolved, review-missing, the
// gate run once more, not landed).
// ---------------------------------------------------------------------------

const ATTEMPTS = 3   // the first attempt and up to two more: Pavol asked for the retry on 2026-09-27, the coordinator's brief set the count
const LIMIT_ERROR = /usage limit|rate limit|rate_limit|ratelimit|weekly limit|daily limit|hit your .{0,30}limit|limit reached|reached your .{0,30}limit|too many requests|\b429\b/i
let runStop = null   // why the run stops, once it does

// The error that stops the run, and its one log line, written when the stop is first met.
function stopRun(why) {
  if (!runStop) {
    runStop = why
    log('The run stops here, nothing decided: ' + why + '. No agent starts after this. Resume it with resumeFromRunId, the same script and the same args, once the cause is gone (a usage limit reset): the agents that finished come back from the journal, and this role runs again.')
  }
  return new Error('Run stopped, nothing decided: ' + runStop + '. Resume it with resumeFromRunId, the same script and the same args, once the cause is gone; the agents that finished come back from the journal, and the role that stopped it runs again.')
}

// What every retry is told first, at the head of its prompt, before the shared
// prefix. recovery is the stage's own list of what the earlier attempt may have
// left and how to take it over.
function retryHead(role, attempt, recovery) {
  const earlier = attempt === 2 ? 'The first attempt' : 'The first ' + ['', 'one', 'two', 'three', 'four'][attempt - 1] + ' attempts'
  return [
'# Attempt ' + attempt + ' of ' + ATTEMPTS + ' at the role ' + role + ': read this first',
'',
earlier + ' at this same role ended without returning a result to the script: a false positive of the API\'s safety filter, or an agent that died. This retry was built after such a case in climb batch 6, on 2026-09-27: rung R\'s second skeptic wrote and returned its verdict, the filter then blocked its next message, and the verdict never reached the script. So what came before you may have done none of this role\'s work, part of it, or all of it. What it left is yours. Read it first, continue from where it stopped rather than redo it, and then return the result your role asks for, in the structured form the tool requires. Say in your summary that you are attempt ' + attempt + ', what you found, and what you took over as it was.',
'',
'What ' + (attempt === 2 ? 'the earlier attempt' : 'the earlier attempts') + ' may have left, and how to take it over (below, "the earlier attempt" means ' + (attempt === 2 ? 'it' : 'them together') + '):',
'',
...recovery.map(s => '- ' + s),
'',
'The brief below is the one the first attempt received, word for word. Where it assumes a fresh start - a clean tree, a first run, a file not yet written - read it as continuing from the state you found.',
'',
  ].join('\n')
}

// needed: a skeptic's or a judge's call, whose nothing after its attempts stops the run.
async function callAgent(prompt, opts, recovery, needed) {
  const role = opts.label
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    if (runStop) throw stopRun()
    const retry = attempt > 1
    let result = null
    let why = 'no result (null: the agent died, was blocked, or was skipped)'
    try {
      result = await agent(retry ? retryHead(role, attempt, recovery) + prompt : prompt,
                           retry ? Object.assign({}, opts, { label: role + ':attempt' + attempt }) : opts)
    } catch (e) {
      const msg = String((e && e.message) || e).slice(0, 300)
      if (LIMIT_ERROR.test(msg)) throw stopRun(role + ', attempt ' + attempt + ' of ' + ATTEMPTS + ', failed on a usage or rate limit (' + msg + '), and is not run again now')
      result = null
      why = 'an error thrown by agent(): ' + msg
    }
    if (result !== null && result !== undefined) {
      if (retry) log(role + ': attempt ' + attempt + ' of ' + ATTEMPTS + ' returned its result')
      return result
    }
    log(role + ': attempt ' + attempt + ' of ' + ATTEMPTS + ' ended with ' + why
        + (attempt < ATTEMPTS
          ? '; running the role again as attempt ' + (attempt + 1) + ', told to take over what this one left'
          : needed ? '; no attempt left' : '; no attempt left, so the script takes its path for a dead agent'))
  }
  if (needed) throw stopRun(role + ' returned nothing after ' + ATTEMPTS + ' attempts, and a skeptic or judge that returns nothing is read neither as a refusal nor as a drop')
  return null
}

// A command started with run_bg (nohup) may outlive the agent that started it.
const bgCheck = (tree) => 'A command the earlier attempt started with run_bg (nohup) may still be running. Before you start a build, a test or any long run, list what runs: ps -eo pid,etime,args | grep -E "ant|java|fortress" | grep -v grep, and readlink /proc/<pid>/cwd for the tree each runs in (other agents of this batch run in their own trees). A step still running in ' + tree + ' is the earlier attempt\'s: wait for its log with wait_for and use its result; never start the same step, or a second ant, beside it.'

// The rung worker's first pass: its branch, its worktree, its own directory.
function recoverRung(rung) {
  return [
    'Your worktree is ' + rung.path + ', on ' + rung.branch + '. Set up the shell as the shared prefix says, then run git log --oneline ' + BASE + '..HEAD, git status --short, git status -sb (commits not yet pushed show as ahead) and ls -lt tmp/ | head -20, and read what exists of explorations/compile-ladder/' + rung.slug + '/, REPORT.md and record.md, and of its scratch under tmp/' + rung.slug + '/.',
    'The shared prefix\'s section "If your branch already carries commits" applies in full: committed work is yours to verify, not to redo; uncommitted edits are yours once you have read them; a log whose last step failed or was cut off is a step still to do.',
    'Test first still holds: the test is seen failing on the base before the edit. If the earlier attempt made the edit and no test-only commit precedes it, set the edit aside (git stash), see the test fail and commit it alone, restore the edit (git stash pop), and say so in REPORT.md.',
    bgCheck(rung.path),
    'Commit what you took over once you have read it, push what is committed and not pushed, and go on with the order of work from the first step not done.',
  ]
}

// The rung worker's continuation after a judge's ruling: on a stop (resume) or
// on a skeptic's refusal (repair).
function recoverRungRepair(rung, afterRefusal) {
  return [
    'Your worktree is ' + rung.path + ', on ' + rung.branch + '. Run git log --oneline ' + BASE + '..HEAD, git status --short, git status -sb and ls -lt tmp/ | head -20, and read explorations/compile-ladder/' + rung.slug + '/JUDGE.md' + (afterRefusal ? ', SKEPTIC.md' : '') + ', REPORT.md and record.md. The commits after the one that carries the judge\'s ruling are the earlier attempt\'s, and so are uncommitted edits.',
    'Take the judge\'s numbered instructions one at a time and check each against the tree before acting: a step already done is not done again. An assertion already in the test is not added a second time, a line already in REPORT.md or record.md is not written twice, and a harness run already made after the edit is not made again unless it was cut off. Continue at the first step not done.',
    bgCheck(rung.path),
    'Commit what you took over once you have read it, push what is committed and not pushed, and finish as the repair round below says, with reportText, recordText and stopsMet describing the rung as it now stands.',
  ]
}

// A skeptic, first or second judgement: SKEPTIC.md and its scratch under tmp/<slug>/skeptic/.
function recoverSkeptic(rung, round) {
  const f = 'explorations/compile-ladder/' + rung.slug + '/SKEPTIC.md'
  return [
    'The worktree is ' + rung.path + ', on ' + rung.branch + '. Run git log --oneline ' + BASE + '..HEAD, git status --short, git status -sb and ls -lt tmp/ | head -20, and read ' + f + ' and the scratch under tmp/' + rung.slug + '/skeptic/.',
    round > 1
      ? 'SKEPTIC.md already held the first judgement, which refused, before the repair round. Only a second-judgement section written after the repair round\'s last commit on the branch is the earlier attempt\'s work; the first judgement is not your verdict.'
      : 'This is the rung\'s first judgement, so whatever SKEPTIC.md and tmp/' + rung.slug + '/skeptic/ hold is the earlier attempt\'s work.',
    'If the earlier attempt\'s verdict is complete (a verdict, the checks of the role below, the differentials with their outputs under tmp/' + rung.slug + '/skeptic/), it is your verdict. Confirm that each output it quotes is there and says what the verdict quotes it for, commit and push SKEPTIC.md if it is not committed and pushed, and return it, with skepticText ' + (round > 1 ? 'this second judgement\'s text' : 'the file\'s text') + ' word for word. It may have been returned already and lost on the way, which is the case this retry exists for.',
    'If it is partial, finish the checks and differentials it has not done and complete the file in place: never a second copy of a section. A differential whose output exists and is whole is not run again.',
    bgCheck(rung.path),
  ]
}

// A judge on one rung, on a stop or a refusal: JUDGE.md on the rung's branch.
function recoverJudgeRung(rung, kind) {
  const f = 'explorations/compile-ladder/' + rung.slug + '/JUDGE.md'
  return [
    'The worktree is ' + rung.path + ', on ' + rung.branch + '. Run git log --oneline ' + BASE + '..HEAD, git status --short and git status -sb, and read ' + f + ' with git log --format="%h %ci %s" -- ' + f + '.',
    'JUDGE.md may already hold an earlier ruling on this rung on another question (a ruling on a stop comes before one on a refusal). The earlier attempt\'s is a ruling on this question, the ' + kind + ', written after the ' + (kind === 'refusal' ? 'skeptic\'s' : 'worker\'s') + ' last commit on the branch.',
    'If that ruling is complete, it is your ruling: commit and push it if it is not yet committed and pushed, and return the decision it records, with its numbered instructions as the file numbers them. If it is partial, complete it in place, then commit and push once.',
  ]
}

// A judge on the merged tree, on a blocking review or a red gate.
function recoverJudgeMain(kind) {
  const f = BATCH_DIR + '/JUDGE-' + kind + '.md'
  return [
    'You are in the main tree, ' + MAIN + '. Run git log --oneline ' + BASE + '..HEAD and git status --short, and read ' + f + ' with git log --format="%h %ci %s" -- ' + f + '. Whatever that file holds is the earlier attempt\'s.',
    'If its ruling is complete, it is your ruling: commit it locally if it is not committed (one commit, retrying on index.lock), and return the decision it records, with its numbered instructions as the file numbers them. If it is partial, complete it in place and commit once. Do not push.',
  ]
}

// The gather: it applies patches to main and folds the record, so a retry must
// never apply a rung twice or fold a line twice.
function recoverGather() {
  return [
    'You are in the main tree, ' + MAIN + ', and it need not be clean. The precondition that git status --porcelain is empty held for the first attempt; a dirty tree now is the earlier attempt\'s work in progress and your starting point, not a failed precondition. Check only that ' + BASE + ' is still an ancestor of HEAD.',
    'Read git log --format="%h %s" ' + BASE + '..HEAD, git status --short, git diff --cached --stat, git diff --stat, and ' + BATCH_DIR + '/RECORD.md if it exists. An approved rung whose commit is already on main (one per rung, carrying its source change and explorations/compile-ladder/<slug>/) is done: never apply its patch again, and name it in your result with its hash.',
    'Before you apply any other rung\'s patch, regenerate it (git diff ' + BASE + '...<branch>) and run git apply --reverse --check on it. If that succeeds, the patch is already in the tree, applied and not committed; applying it again is the one thing this retry must not do. Continue that rung from the step after the apply. A file with conflict markers (git diff --check, grep -n "^<<<<<<<") is a 3-way apply the earlier attempt left half resolved: resolve it by the rules of the role, or return the conflict as the role says.',
    'The three record files may already carry a rung\'s fold. Before you fold a rung, grep FACTS.md, the ledger and the handover for its lines and for each ledger row it opens, and fold only what is missing: never a line or a row twice. The same holds for the batch record\'s "Not landed" sections, for a rung\'s three files written from the run\'s journal (a file its command already wrote stands, and the command is not run again), and for PLAN.md\'s entries for the items for Pavol: grep PLAN.md for each item before you write it.',
    'Scratch patches the earlier attempt wrote may still be where it put them; regenerate them rather than trust them. Retry a git command that fails on index.lock, as the role says.',
  ]
}

// The merged-diff review: its one corrections commit and the head it records
// before it.
function recoverReview() {
  return [
    'You are in the main tree, ' + MAIN + ', with the gate running beside you or finished. Read git log --format="%h %s" ' + BASE + '..HEAD and git status --short. A commit titled "Fold the review\'s corrections" made after the gather\'s last rung commit is the earlier attempt\'s. Then headBefore is that commit\'s parent, not the HEAD you find, so that pathsOutsideExplorations covers both attempts\' corrections; headAfter is HEAD when you finish.',
    'Uncommitted edits under explorations/ are the earlier attempt\'s corrections in progress: read them, keep what is right, and commit them with your own, in one commit of the same title, or in one more such commit if the earlier attempt already made its own. Do not fix a finding twice.',
    'Never touch ' + GATE_OUT + '/ or ' + LOG_DIR + '/.',
  ]
}

// The repair on the merged tree, after a blocking review or a red gate.
function recoverMergedRepair(kind) {
  return [
    'You are in the main tree, ' + MAIN + ', and it need not be clean. Read git log --format="%h %s" ' + BASE + '..HEAD, git status --short, git diff --stat, ' + BATCH_DIR + '/JUDGE-' + kind + '.md, and ' + BATCH_DIR + '/REPAIR-' + kind + '.md if it exists. A commit after the one that carries JUDGE-' + kind + '.md is the earlier attempt\'s repair, uncommitted edits are its repair in progress, and the tree as you find it is your starting point.',
    'Take the judge\'s instructions one at a time and check each against the tree before acting: an edit already in place is not applied again, an assertion already in a test is not added twice, and a record line already written is not written again. Continue at the first step not done.',
    bgCheck(MAIN),
    'The role asks for one commit. If the earlier attempt made it already, what you finish goes in one further commit, and your result says so; headBefore is then the parent of the earlier attempt\'s first commit, so that pathsChanged covers both attempts, and a test run it captured under ' + LOG_DIR + '/repair-' + kind + '-tests/ on the tree as it still is stands and is not run again. Do not push.',
  ]
}

// The gate: its logs under LOG_DIR and its outputs under GATE_OUT. It commits
// nothing, so what a retry must not do is repeat a finished step or append a
// line to the summary twice.
function recoverGate() {
  return [
    'You are in the main tree, ' + MAIN + '. The earlier attempt\'s logs are under ' + LOG_DIR + '/ and its outputs under ' + GATE_OUT + '/: ls -lt both. A log is the earlier attempt\'s only if it is newer than the newest commit that touches a path outside explorations/ (git log -1 --format=%ci -- . ":(exclude)explorations"); an older one is from a gate run on an earlier tree of this batch and counts for nothing.',
    bgCheck(MAIN),
    'Steps 2 to 4 each leave a log: compileAll.txt, library.txt, testFast.txt, testSystem.txt. One that is the earlier attempt\'s and ends in EXIT=0 with BUILD SUCCESSFUL (library.txt: EXIT=0) is a step done: do not run it again. Above all, do not repeat step 2 once step 4 has finished, since its rm -rf ProjectFortress/TEST-RESULTS deletes the suites\' results. Continue at the first of those steps whose log is missing, cut off or failed. Step 3\'s two copies stand only if library.txt finished and both copies exist; otherwise redo step 3 whole, copies included.',
    'The distance stage that step 2 starts in the background leaves ' + LOG_DIR + '/distance.txt, its run_bg log, which ends in an EXIT= line when the run is over, and writes ' + GATE_OUT + '/distance.txt at the end, a table whose last row is #shadow. If that log is the earlier attempt\'s, the stage was started: when the log ends in EXIT=, it finished; when it does not and a java DistanceMulti runs in ' + MAIN + ' (the ps and readlink above), it is still running. Either way do not start it again; wait for it at step 9. Only when the log has no EXIT= line and no such process runs did the run die with the earlier attempt: remove the log and start it again as step 2 says, before going on.',
    'Steps 5 to 9 write into summary.txt: step 5 rewrites it, and steps 6, 7e, 8 and 9 append to it. A step whose output is all there is done: step 6 when the summary carries its # atomic lines (39 and one ABSENT line, or 42, as step 6 says), step 7 when ' + GATE_OUT + '/ladder/ holds ladder.tsv, microgpt-phase.md and the comparison, step 8 when checker-count.txt ends in its #shadow row and the summary carries the # checker lines, step 9 when the summary carries the # distance lines. Continue at the first of them not done; if one stopped partway, with some of its lines already in the summary, run again from step 5, which rewrites the file, so that no line lands in it twice; the distance stage itself is not run again for that, only its comparison.',
    'Return the result, as the role says, from the logs and tables as they stand when you finish.',
  ]
}

// The commit: its local commits, the microGPT programs started in the background,
// and the push or the held push.
function recoverCommit(held) {
  return [
    'You are in the main tree, ' + MAIN + '. Read git log --format="%h %s" ' + BASE + '..HEAD and git status --short, and run grep -rn "<short hash>" explorations/. A commit titled "' + COMMIT_TITLE + '" is the earlier attempt\'s step 1: do not make it again, and finish what it left uncommitted, if anything, in one further commit. If the role has a step 1a and ' + GATE_DIR + '/summary.txt already carries "# repair-tests" lines, they are the earlier attempt\'s: do not copy the gate\'s summary over that file again and do not append them twice.',
    'If ' + LOG_DIR + '/microgpt-walk.txt exists, the earlier attempt took step 4: do not start the two programs again.',
    held
      ? 'The push is held. Look for the "Not pushed." paragraph in ' + BATCH_DIR + '/RECORD.md: if the earlier attempt wrote it, do not append it again, and commit it if it is not committed. Push nothing, as the role says.'
      : 'Check what is already pushed: git fetch origin, then git rev-parse HEAD origin/main origin/' + CONTAINER_BRANCH + '. A push the earlier attempt made is not made again; push only what origin lacks. git worktree list and git branch --list "wip/*" show which worktrees and branches step 5 has already removed; confirm that each one left shows nothing ahead of its origin before removing it.',
    'Return the result for the state you leave, counting the earlier attempt\'s commits' + (held ? ' as done.' : ' and pushes as done: pushed lists every commit of this batch that origin/main now carries, whichever attempt pushed it.'),
  ]
}

// ---------------------------------------------------------------------------
// The run.
// ---------------------------------------------------------------------------

log('Climb batch ' + BATCH + ': ' + RUNGS.length + ' rungs (' + RUNGS.map(r => r.id).join(', ') + '), two at a time in the order '
    + SCATTER.map(r => r.id).join(', ') + ' (longest expected worker first), each judged by its own skeptic before the merge; then gather, review beside the gate, commit. Base ' + BASE + '.')

const results = await pipeline(
  SCATTER,

  // Stage 1: the rung worker.
  (rung) => callAgent(PREFIX + rungRole(rung) + rung.tail, {
    label: 'rung:' + rung.id,
    phase: 'Rung',
    schema: RUNG_SCHEMA,
    model: OPUS,
  }, recoverRung(rung)),

  // Stage 2: the skeptic, with one repair round; the judge on a stop or a refusal.
  async (worker, rung) => {
    let judgeOnStop = null
    const out = (state, extra) => Object.assign({ rung: rung.id, slug: rung.slug, branch: rung.branch, state, stopJudge: judgeOnStop }, extra)
    if (!worker) return out('worker-died', { worker: null, verdict: null })

    if (worker.stopped) {
      log(rung.id + ' stopped and is reporting: ' + (worker.stopReason || '(no reason given)') + '; the judge decides whether it is a fork')
      judgeOnStop = await callAgent(PREFIX + judgeRole('stop', rung, worker, null, null), Object.assign({
        label: 'judge:' + rung.id + ':stop',
        phase: 'Judge',
        schema: JUDGE_SCHEMA,
      }, judgeTier(null)), recoverJudgeRung(rung, 'stop'), true)
      if (!judgeOnStop || judgeOnStop.decision !== 'repair') {
        return out('stopped', { worker, verdict: null, judge: judgeOnStop })
      }
      const resumed = await callAgent(PREFIX + rungRole(rung) + rung.tail + repairPrompt(rung, null, judgeOnStop), {
        label: 'resume:' + rung.id,
        phase: 'Rung',
        schema: RUNG_SCHEMA,
        model: OPUS,
      }, recoverRungRepair(rung, false))
      if (!resumed || resumed.stopped || !resumed.landed) {
        return out('stopped', { worker: resumed || worker, verdict: null, judge: judgeOnStop })
      }
      worker = resumed
    }

    const verdict = await callAgent(PREFIX + skepticRole(rung, worker, 1), {
      label: 'skeptic:' + rung.id,
      phase: 'Skeptic',
      schema: SKEPTIC_SCHEMA,
      model: OPUS,
    }, recoverSkeptic(rung, 1), true)

    if (verdict && verdict.approved) {
      return out('approved', { worker, verdict, repaired: false, judge: judgeOnStop })
    }

    log(rung.id + ' refused by its skeptic: ' + ((verdict && verdict.refusalReason) || 'no reason returned') + '; the judge rules before the one repair round')

    const decision = await callAgent(PREFIX + judgeRole('refusal', rung, worker, verdict, null), Object.assign({
      label: 'judge:' + rung.id,
      phase: 'Judge',
      schema: JUDGE_SCHEMA,
    }, judgeTier(judgeOnStop)), recoverJudgeRung(rung, 'refusal'), true)
    if (!decision || decision.decision === 'drop') {
      return out('dropped', { worker, verdict, firstVerdict: verdict, judge: decision, repaired: false })
    }
    if (decision.decision === 'stop') {
      return out('stopped', { worker, verdict, firstVerdict: verdict, judge: decision, repaired: false })
    }

    const repaired = await callAgent(PREFIX + rungRole(rung, true) + rung.tail + repairPrompt(rung, verdict, decision), {
      label: 'repair:' + rung.id,
      phase: 'Rung',
      schema: RUNG_SCHEMA,
      model: OPUS,
    }, recoverRungRepair(rung, true))

    const verdict2 = await callAgent(PREFIX + skepticRole(rung, repaired || worker, 2), {
      label: 'skeptic2:' + rung.id,
      phase: 'Skeptic',
      schema: SKEPTIC_SCHEMA,
      model: OPUS,
    }, recoverSkeptic(rung, 2), true)

    return out((verdict2 && verdict2.approved) ? 'approved-after-repair' : 'dropped', {
      worker: repaired || worker,
      verdict: verdict2,
      firstVerdict: verdict,
      judge: decision,
      repaired: true,
    })
  },
)

// A run stopped inside the scatter (callAgent, "A stop that decides nothing") has a
// rung whose stage threw and came back null: nothing is read from the scatter, so
// no rung is marked dropped, withheld or not landed, and the gather does not start.
if (runStop) throw stopRun()

// Back into manifest order: the ledger numbers and the record are ordered by the
// manifest, never by the order the scatter happened to run in.
const byId = {}
for (const r of results.filter(Boolean)) byId[r.rung] = r

// landsOnlyWith (CLIMB-BATCH-6.md section 8, item 4): a rung whose manifest entry
// names rungs it lands only with is withheld when any of them was not approved,
// and the check repeats until nothing moves, so a rung resting on a withheld one
// is withheld too. It reaches the gather on the not-landed list with the reason,
// and the gather never applies it. Batch 6's T names F; batch 5 carried such a
// rule for Z in its intro alone.
const isApproved = (r) => r.state === 'approved' || r.state === 'approved-after-repair'
function applyLandsOnlyWith(rungs, manifest) {
  const needs = {}
  for (const m of manifest) needs[m.id] = m.landsOnlyWith || []
  let out = rungs
  for (;;) {
    const stateOf = {}
    for (const r of out) stateOf[r.rung] = r.state
    let moved = false
    out = out.map(r => {
      const missing = isApproved(r) ? (needs[r.rung] || []).filter(id => !isApproved({ state: stateOf[id] })) : []
      if (!missing.length) return r
      moved = true
      return Object.assign({}, r, { state: 'withheld', approvedAs: r.state,
        withheldReason: r.rung + ' lands only with ' + needs[r.rung].join(', ') + ' (landsOnlyWith in the manifest), and '
          + missing.map(id => id + (stateOf[id] ? ' is ' + stateOf[id] : ' did not report')).join(', ') + ': not applied, its findings folded' })
    })
    if (!moved) return out
  }
}

const rungs = applyLandsOnlyWith(RUNGS.map(r => byId[r.id]).filter(Boolean), RUNGS)
const approved = rungs.filter(isApproved)
const notLanded = rungs.filter(r => !isApproved(r))
const withheld = rungs.filter(r => r.state === 'withheld')
if (withheld.length) log('Withheld by landsOnlyWith: ' + withheld.map(r => r.withheldReason).join('; '))
const expectedMoves = [].concat.apply([], RUNGS.filter(m => approved.some(a => a.rung === m.id)).map(m => (m.expectedMoves || []).map(x => m.id + ': ' + x)))
// The checker-count stage's declarations, gathered the same way: only an approved
// rung's declaration counts, because a rung that did not land changed nothing.
const expectedChecker = {
  counts: RUNGS.filter(m => approved.some(a => a.rung === m.id) && m.expectedCheckerCount !== undefined)
               .map(m => m.id + ': ' + m.expectedCheckerCount),
  crashes: RUNGS.filter(m => approved.some(a => a.rung === m.id) && m.expectedCheckerCrash !== undefined)
                .map(m => m.id + ': ' + m.expectedCheckerCrash),
}
const report = { batch: BATCH, base: BASE, rungs }

// The items for Pavol: the rungs' now, the merged tree's as its stages return.
// Every return carries each item with the PLAN.md entry that holds it, or none.
const rungItems = [].concat.apply([], rungs.map(pavolItemsOf))
const routers = []           // every stage result that may carry pavolItems
const mergedItems = []       // the reviews' and the merged-tree judges' items
function pavolStatus() {
  const routed = routedIds(routers)
  return rungItems.concat(mergedItems).map(i => Object.assign({}, i, { inPlan: routed.has(i.id) }))
}
const finish = (extra) => Object.assign(report, { forPavol: pavolStatus() }, extra)

if (approved.length === 0) {
  log('No rung approved; nothing to gather. ' + rungs.map(r => r.rung + ': ' + r.state).join(', '))
  return finish({ landed: false, reason: 'no rung approved' })
}
log('Approved: ' + approved.map(r => r.rung + ' (' + r.state + ')').join(', ')
    + (notLanded.length ? '. Not landed, findings folded anyway: ' + notLanded.map(r => r.rung + ' (' + r.state + ')').join(', ') : '')
    + '. Gathering onto main.')

// Gather: one composed local commit per approved rung, plus the not-landed findings.
const gather = await callAgent(PREFIX + gatherRole(approved, notLanded, rungItems), { label: 'gather', phase: 'Gather', schema: GATHER_SCHEMA, model: OPUS }, recoverGather())
report.gather = gather
routers.push(gather)
if (!gather || gather.unresolved) {
  log('Gather stopped: ' + ((gather && gather.summary) || 'agent died'))
  return finish({ landed: false, reason: 'gather unresolved' })
}
// The gather's own points for Pavol, a text mismatch the decisions do not settle
// among them (gatherRole, "A text mismatch is not blocking"); the reviews check
// their PLAN.md entries with the rungs'.
const gatherItems = numbered('gather', gather.forPavol)
mergedItems.push(...gatherItems)
const reviewItems = rungItems.concat(gatherItems)

// Review BESIDE the gate. The review reads the merged diff and never builds; the
// gate builds and never reads the record. Batch 1 ran them one after the other
// and the review's 14.7 minutes were serial for nothing
// (process-decisions-review-1.md, decision 2(a), "What buys time in the same
// place"). The named risk is two agents committing in this tree at once, and it
// is closed by the gate committing nothing: the commit stage adds its summary.
// When the review blocks, its judge rules at once, while the gate runs on: in
// batch 3 the judge waited 4.5 minutes for the gate, in batch 2 the gate outlasted
// the review by 8.2 (climb-batch-3-redesign.md, (e); Pavol, 2026-09-24). The
// repair waits for the gate, because both work in this tree. Since the post-mortem
// of 2026-09-29 the judge rules only on the review's blockingCode findings, those
// whose repair touches code; its routed findings, settled by tests and records
// only, take the path of a judge's land ruling with no judge call (synthesis.md,
// section 4, item 34).
const gateRun = callAgent(PREFIX + gateRole(expectedMoves, expectedChecker), { label: 'gate', phase: 'Gate', schema: GATE_SCHEMA, model: OPUS }, recoverGate())
gateRun.catch(() => null)   // a run stopped beside the review throws from the review's call first; the gate's own stop is thrown where it is awaited
let review = await callAgent(PREFIX + reviewRole(gather, 'review', reviewItems), { label: 'review', phase: 'Review', schema: REVIEW_SCHEMA, model: OPUS }, recoverReview())
report.review = review
routers.push(review)
mergedItems.push(...numbered('review', review && review.forPavol))
// A review that returned nothing: the batch lands on its gate without one, and the
// result says so as an item for the coordinator's landing report; nothing holds the
// push for it (the script review of 2026-09-29, finding 12, as the coordinator took it).
if (!review) {
  log('The merged-diff review returned nothing after ' + ATTEMPTS + ' attempts: the batch lands on its gate without one, listed as review-missing.1 for the landing report; nothing holds the push for it')
  report.reviewMissing = true
  mergedItems.push(...numbered('review-missing', ['The merged-diff review returned nothing after ' + ATTEMPTS + ' attempts, so no review read this batch\'s merged diff and folded record beside its gate; the post-batch review is the first to read them.']))
}
const routedFindings = strings(review && review.routed)
if (routedFindings.length) {
  log('The review routed ' + routedFindings.length + ' finding(s) settled by tests and records only to the next batch, listed for Pavol; no judge runs for them')
  report.reviewRouted = { findings: routedFindings }
  mergedItems.push(...numbered('review-routed', routedFindings))
}
const reviewBlocks = !!(review && strings(review.blockingCode).length)
let reviewDecision = null
if (reviewBlocks) {
  log('Review found ' + strings(review.blockingCode).length + ' finding(s) that touch code; the judge rules while the gate runs on')
  reviewDecision = await callAgent(PREFIX + judgeRole('review', null, null, null, review), Object.assign({ label: 'judge:review', phase: 'Judge', schema: REVIEW_JUDGE_SCHEMA }, judgeTier(null)), recoverJudgeMain('review'), true)
  report.reviewJudge = reviewDecision
  mergedItems.push(...numbered('judge-review', reviewDecision && reviewDecision.forPavol))
}
let gate = await gateRun
report.gate = gate

// A blocking review means a judge, and on a repair ruling a repair on the merged
// tree; the gate that ran beside it is discarded when the repair changed code under
// it; after a repair of tests and records only its tables stand (repairRerun). On a
// land ruling nothing runs after the judge but what a green gate always leads to.
let gateIsStale = !!(review && review.pathsOutsideExplorations && review.pathsOutsideExplorations.length)
const beside = []   // the repairs whose runs stand beside the gate's summary instead of a second gate
if (gateIsStale) {
  log('The review\'s corrections touched ' + review.pathsOutsideExplorations.length + ' path(s) outside explorations/ ('
      + review.pathsOutsideExplorations.join(', ') + '); the gate that ran beside it is stale and runs again')
}
// A red gate beside the review, which that review's repair may already answer: its
// lines go to the review's repair, and when that repair changed test files and
// records only and its passing runs answer every line, no gate judge and no gate
// repair run (Pavol's rule of 2026-09-29 on rerunning the gate after a repair that
// only added tests, extended; in climb batch 6.5b the review's repair had fixed and
// run the one test the gate failed on, and a gate judge and its repair ran the same
// pair again, 42 minutes and 0.38M tokens: reviews/batch-6.5b-review.md, finding 2).
const redBeside = !!(gate && !gate.stopped && !gate.green && !gateIsStale)
let redAnswered = false

if (reviewBlocks) {
  const decision = reviewDecision
  if (decision && decision.decision === 'land') {
    // Pavol, 2026-09-29 (POSITIONS.md, rerunning the gate: the same weighing of cost
    // against what a rule protects applies to the other rules): a ruling settled by
    // tests and records only does not hold the batch. No repair runs; the batch lands
    // on its gate, and the ruling's steps go to the next batch, listed for him, as the
    // review's routed findings do (LAND_RULE).
    log('The review\'s judge ruled land: its ' + strings(decision.instructions).length + ' step(s) of tests and records go to the next batch with the review\'s findings, listed for Pavol (' + BATCH_DIR + '/JUDGE-review.md); no repair runs, and the batch lands on its gate')
    report.reviewRouted = { findings: routedFindings.concat(strings(review.blockingCode)), instructions: strings(decision.instructions), ruling: BATCH_DIR + '/JUDGE-review.md' }
    mergedItems.push(...numbered('judge-review-land', decision.instructions))
  } else if (!decision || decision.decision !== 'repair') {
    return finish({ landed: false, reason: 'review blocking, judge did not order a repair' })
  } else {
    report.repairReview = await callAgent(PREFIX + mergedRepairRole(decision, 'review', redBeside ? gate.failing : undefined), { label: 'repair:review', phase: 'Review', schema: MERGED_REPAIR_SCHEMA, model: OPUS }, recoverMergedRepair('review'))
    routers.push(report.repairReview)
    // A repair that returned nothing, stopped, or did not land leaves the code findings
    // the judge upheld unsettled: they go to the next batch, listed for Pavol, and do
    // not hold the push (Pavol, POSITIONS.md 2026-09-29, a review that still blocks
    // after its repair does not hold a green batch; the script review, finding 1).
    const rr = report.repairReview
    if (!rr || rr.stopped || rr.landed === false) {
      log('The review\'s repair ' + (!rr ? 'returned nothing' : rr.stopped ? 'stopped (' + (rr.stopReason || 'no reason given') + ')' : 'did not land') + ': its ' + strings(review.blockingCode).length + ' code finding(s) go to the next batch as review-unrepaired, listed for Pavol; they do not hold the push')
      report.reviewUnrepaired = strings(review.blockingCode)
      mergedItems.push(...numbered('review-unrepaired', review.blockingCode))
    }
    // Pavol, 2026-09-29 (POSITIONS.md, rerunning the gate after a repair that only
    // added tests): the gate runs again only when the repair, or the review's
    // corrections, changed a path outside explorations/ that is not a test file, or
    // a test path no passing run of the repair's exercised (repairRerun); otherwise
    // the repair's own runs verify its tests and the first gate's tables stand.
    const after = repairRerun(report.repairReview, strings(review && review.pathsOutsideExplorations), null)
    report.repairReviewRerun = after
    if (after.rerun) {
      log('After the review\'s repair the gate runs again: ' + after.why)
      gateIsStale = true
    } else {
      const red = redBeside ? repairRerun(report.repairReview, strings(review && review.pathsOutsideExplorations), gate) : null
      if (red) report.repairReviewRed = red
      if (red && !red.rerun) {
        redAnswered = true
        log('The review\'s repair changed ' + red.why + ' and its runs answer the ' + strings(gate.failing).length + ' line(s) the gate beside the review was red on; by Pavol\'s rule of 2026-09-29 the gate does not run again, no gate judge or gate repair runs, and its tables stand beside the runs')
        beside.push({ kind: 'review', runs: red.runs, answered: red.answered })
      } else {
        if (red) log('The gate beside the review was red, and the review\'s repair does not answer it (' + red.why + '); the gate judge rules on it as before')
        if (strings(rr && rr.pathsChanged).length) {
          log('The review\'s repair changed ' + after.why + ' (' + after.runs.length + ' test file(s) run in the harness by the repair); by Pavol\'s rule of 2026-09-29 the gate does not run again and its tables stand')
          beside.push({ kind: 'review', runs: after.runs, answered: [] })
        } else {
          log('The review\'s repair changed nothing: the gate\'s tables are the tree\'s, and no repair runs stand beside them')
        }
      }
      gateIsStale = false
    }
  }
}

if (gateIsStale || !gate) {
  gate = await callAgent(PREFIX + gateRole(expectedMoves, expectedChecker), { label: 'gate:after-review', phase: 'Gate', schema: GATE_SCHEMA, model: OPUS }, recoverGate())
  report.gateAfterReview = gate
  beside.length = 0   // this gate ran on the repaired tree, the repair's tests among its counts
}

if (!gate || gate.stopped) {
  return finish({ landed: false, reason: 'gate could not run' })
}
if (!gate.green && !redAnswered) {
  log('Gate red: ' + gate.failing.length + ' failing; the judge diagnoses on the merged tree')
  const decision = await callAgent(PREFIX + judgeRole('gate', null, null, null, gate), Object.assign({ label: 'judge:gate', phase: 'Judge', schema: JUDGE_SCHEMA }, judgeTier(report.reviewJudge)), recoverJudgeMain('gate'), true)
  report.gateJudge = decision
  mergedItems.push(...numbered('judge-gate', decision && decision.forPavol))
  if (!decision || decision.decision !== 'repair') {
    return finish({ landed: false, reason: 'gate red, judge did not order a repair' })
  }
  report.repairGate = await callAgent(PREFIX + mergedRepairRole(decision, 'gate', gate.failing), { label: 'repair:gate', phase: 'Gate', schema: MERGED_REPAIR_SCHEMA, model: OPUS }, recoverMergedRepair('gate'))
  routers.push(report.repairGate)
  // The same rule after the gate's repair: when it changed test files and records
  // only and its passing runs answer every line the gate was red on, the gate is
  // not run again. A red gate after its repair still stops the batch.
  const after = repairRerun(report.repairGate, [], gate)
  report.repairGateRerun = after
  if (after.rerun) {
    log('After the gate\'s repair the gate runs again: ' + after.why)
    gate = await callAgent(PREFIX + gateRole(expectedMoves, expectedChecker), { label: 'gate2', phase: 'Gate', schema: GATE_SCHEMA, model: OPUS }, recoverGate())
    report.gate2 = gate
    beside.length = 0
    if (!gate || !gate.green) {
      log('Gate red after one repair: the batch stops here, nothing pushed; the failing tests and the diagnosis are the record')
      return finish({ landed: false, reason: 'gate red twice' })
    }
  } else {
    log('The gate\'s repair changed ' + after.why + ' and its runs answer the ' + strings(gate.failing).length + ' line(s) the gate was red on; by Pavol\'s rule of 2026-09-29 the gate does not run again and its tables stand beside the runs')
    beside.push({ kind: 'gate', runs: after.runs, answered: after.answered })
  }
}

// Commit: hashes into the notes, the gate summary added, push, fast-forward the
// container branch, the microGPT programs started in the background, clean up; or, while a landed rung carries a stop that was met
// and not lifted, the same without the push and the clean-up (pushHeldBy).
// The items for Pavol that no stage put into PLAN.md, for the coordinator: the
// commit stage does not wait on them, and the result carries each with inPlan.
const notInPlan = pavolStatus().filter(i => !i.inPlan)
if (notInPlan.length) log('Items for Pavol not in PLAN.md, for the coordinator: ' + notInPlan.map(i => i.id).join(', ')
    + ((gather && Array.isArray(gather.pavolUnrouted) && gather.pavolUnrouted.length) ? '; the gather says why: ' + gather.pavolUnrouted.map(u => u && (u.id + ': ' + u.why)).join('; ') : ''))

const heldBy = pushHeldBy(approved, review, { 'repair:review': report.repairReview, 'repair:gate': report.repairGate })
if (heldBy.length) log('Push held: ' + heldBy.length + ' stop(s) met and not lifted: ' + heldBy.join('; '))
const commit = await callAgent(PREFIX + commitRole(gather, gate, heldBy, beside), { label: 'commit', phase: 'Commit', schema: COMMIT_SCHEMA, model: OPUS }, recoverCommit(heldBy.length > 0))
report.commit = commit
return finish({ landed: !!(commit && commit.pushed && commit.pushed.length), pushHeld: heldBy.length > 0, heldBy, besideGate: beside })
