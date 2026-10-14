# The briefing and checks lists of climb batch 14's five rungs, S, A, L, P and W (CLIMB-BATCH-14.md, section 3), in
# batch 13's form (explorations/compile-ladder/plan-13/manifest/lists13.py) for the batch workflow
# (explorations/coordinator/process-engineering/batch-redesign.md, "The brief"): each list holds what the rung's
# section cites, the decisions, the ledger rows, the specification's sections, the notes and the code it rests on,
# and no process position or harness fact, which the brief's role text and the fortress-repo skill carry. POSITIONS
# and FACTS entries are keyed by their numbers; P-146 and P-147, the decisions rungs S, L and W build, print word for
# word at the head of their briefings. Each briefing entry is a pair: its facts-extract.sh key and one line
# on why it is there and what the rung does with it. gen14.py renders the lines at the end of each rung worker's
# brief, in the order of the briefing. A checks list is a sub-list of its briefing's keys, read by the skeptic, a
# repair round and a judge. `python3 lists14.py` checks every key with facts-extract.sh --check (each must match
# exactly one place) and every reason's form; it is run again on the tree the batch is cut from.
SRC = 'ProjectFortress/src/com/sun/fortress'
EV = SRC + '/interpreter/evaluator'
SC = SRC + '/scala_src'
TC = SC + '/typechecker'

LIBRULE = "doc:explorations/coordinator/process-engineering/library-extension-rule-archaeology.md#5. Restatement"
CHG = "doc:Specification/appendices/changes.tex#"
STJ = "doc:explorations/reviews/self-typed-bodies-judgement.md#"
POPLC = "doc:explorations/reviews/array-judgements-popl-check.md#"
ACP = "doc:explorations/reviews/argument-context-probe.md#"
PEX = "doc:explorations/reviews/popl2019-examples.md#"

S_BRIEFING = [
  ("P-146", "The decision you build, word for word: way 6, rules (a) and (b), the signatures kept plain, the library and walk unchanged, and its reason, which the coordinator's default on a mixin's parameter follows."),
  ("P-27", "The library's 29 bodies are the team's and stay as written; the checker is brought to read them as walk runs them."),
  ("P-43", "Route A stands: no clause enters the library and no type is identified with another; the reading that no self type enters the library is what P-146 sets aside."),
  ("P-44", "The comprises decision: the clause's text and walk stay; under a comprises clause the self type is the clause's, so rule (a) is never reached there."),
  ("P-26", "The type group's late word: Naden's construct used only in bounds, and the 2019 paper's declared types without intersections, which give the confinement its reason."),
  ("P-95", "Why the self paragraph and the traits chapter change: an Appendix I entry with the reason, the original text and route C."),
  ("P-96", "The form of your text changes: each passage revised in place with a callout, the entry with its reason."),
  ("F-53", "The distance and the count at the last landed gate, and where your before comes from: 13b's tables and the per-site list."),
  ("F-54", "The distance's classes: S1's 28 and R4's 1 are your 29 sites; S1's twenty-ninth, numerator at :688, is rung L's and files under OT once your rule changes its message."),
  ("F-121", "The team's spelling of the tower closure stays a comment: way 5, the clause, is the way not taken."),
  ("ledger:695", "A compiled body that returns self dies at class load: your run test is its reproducer, an expected failure; no repair is yours."),
  ("F-103", "A run-time failure needs a plain link test and an XXX run test over one component: the form of row 695's reproducer."),
  ("ledger:407", "Walk overflows on a trait that comprises its own parameter: why the clause way needs walk first; untouched here, a note."),
  (STJ + "Way 6: the self type read from the F-bound", "Way 6 read against the sources: rule (a), rule (b), what each clears, and why every extender in the tree meets rule (b)."),
  (STJ + "4. The recommendation", "Why way 6, in order of weight, and the fallback that the measurement made unneeded."),
  (STJ + "5. What it changes", "The edit file by file: the disambiguator, the hierarchy check, the two passages and the entry; the library and walk untouched."),
  (STJ + "6. The rung, and the one measurement", "The rung as the judgement drew it: files, tests first, the specification and the overlaps, which your section takes over."),
  (STJ + "7. What it reverses or bends", "The reading on record that the rule bends, and what it does not reverse: your decision record names it."),
  (STJ + "Rule (a) alone, as section 6 asks", "The unconfined rule's 21 new sites and their cause in the Return Type Rule and call resolution: the regression your stage run watches."),
  (STJ + "Rule (a) confined to bodies", "The confinement in FunctionalMethod.java and its measured result: the 29 gone, none new, no stall."),
  (STJ + "The compiled run of a body that returns", "The VerifyError of row 695, its probe and its controls: the shape of your expected-failure run test."),
  (STJ + "What it means for the rung", "What the rung still writes beyond the patch: rule (b), the object expression's case, the text and the tests."),
  (STJ + "The patch", "The measured patch, two files, which git apply --check accepts on the base: apply it, read it and own it."),
  (POPLC + "5. Batch 14", "The 2019 paper against rules (a) and (b): no self types there, and the confinement's reason, which your decision record states."),
  ("doc:Specification/basic/expressions/var-ref.tex#Identifier References", "The self paragraph and the team's self-type idiom, where rule (a)'s sentence and its callout go."),
  ("doc:Specification/basic/traits.tex#Trait Declarations", "The extends and comprises passages, beside which rule (b)'s passage goes, and the revival's comprises callout as the form."),
  ("map:spec-to-implementation.md#Chapter 10, Traits; Chapter 11, Objects", "Where traits and objects live in the checker, walk and the code generator: the hierarchy checker is your rule (b)'s home."),
  ("code:" + SC + "/disambiguator/SelfParamDisambiguator.scala#case STraitDecl(_, STraitTypeHeader(sparams,_,name,_,_,_,_,_,_),", "Where a trait's self type is built today, from the comprises clause or the trait alone: rule (a)'s site."),
  ("code:" + SRC + "/compiler/index/FunctionalMethod.java#public FunctionalMethod(FnDecl ast, TraitObjectDecl traitDecl, List<StaticParam> traitParams)", "The index entry overloading, the Return Type Rule and call resolution read: the confinement's site."),
  ("code:" + TC + "/TypeHierarchyChecker.scala#def checkDeclComprises(", "The loop over extends clauses whose shape rule (b) follows, in a function of its own beside this one."),
  ("code:" + SC + "/useful/STypesUtil.scala#def getObjectExprType(obj: ObjectExpr): SelfType", "Where an object expression's type is formed: rule (b)'s object-expression case."),
  ("code:" + TC + "/TypeHierarchyChecker.scala#private def checkObjectExprComprises(", "The precedent for rule (b)'s object-expression case: a walk over every object expression with its static parameters in scope, in the same file."),
  ("code:Library/FortressLibrary.fss#trait Integral[", "Seven of your sites, the bodies that return self as I, and numerator's default, which is rung L's."),
  ("code:Library/FortressLibrary.fss#trait StandardTotalOrder[", "Nine of your sites, the total order's bodies, R4's tuple among them."),
  ("code:Library/FortressLibrary.fss#trait StandardMutableArrayType[", "Four of your sites, dotted methods that return self as T: rule (a) reaches dotted methods too."),
  ("code:Library/Containment.fsi#trait ContainmentBySubset[", "The team's mixin whose parameter is bounded by Containment, which it extends at that parameter: by the coordinator's default its self parameter, so rule (b) accepts it."),
  ("code:Library/Relation.fsi#trait Relation[", "The mixin's extender at itself, which rule (b) then checks and accepts."),
]
S_CHECKS = [
  "P-146", "P-27", "P-43", "P-44",
  "ledger:695",
  STJ + "4. The recommendation",
  STJ + "Rule (a) alone, as section 6 asks",
  STJ + "Rule (a) confined to bodies",
  "doc:Specification/basic/expressions/var-ref.tex#Identifier References",
  "code:" + SC + "/disambiguator/SelfParamDisambiguator.scala#case STraitDecl(_, STraitTypeHeader(sparams,_,name,_,_,_,_,_,_),",
  "code:" + SRC + "/compiler/index/FunctionalMethod.java#public FunctionalMethod(FnDecl ast, TraitObjectDecl traitDecl, List<StaticParam> traitParams)",
]

A_BRIEFING = [
  ("P-51", "Item 48 (b) decided, wide: an argument that is a call with inferred static arguments is retried against each declaration's parameter type; the two tests it promotes."),
  ("P-49", "The order of the checker's attempts: a declaration that fits as written is never passed over, which settles the probe's third fork."),
  ("P-50", "The label body's expected type, decided the same way: the contexts are one rule everywhere."),
  ("P-95", "Why the inference chapter and its Appendix I entry change: the entry gains the context with its reason."),
  ("P-96", "The form of your text changes: the context added in place with a callout, the entry amended."),
  ("F-87", "The contexts the checker already gives an expected type, and the one it does not, another call's argument: its last clause becomes false."),
  ("F-173", "The inference chapter states the rule the checker builds: your text keeps that true."),
  ("F-78", "The checker's attempts at a call and the instance of a parameter nothing fixes: what the retry builds on."),
  ("ledger:455", "Your row: the two argument faces, refused today; the loose juxtaposition face was repaired before."),
  ("ledger:535", "Closed, but its expected failure pins a refusal that the retry repairs: the test becomes a plain passing run."),
  (ACP + "The answers", "The probe in ten points: one file, the two triggers, the faces, 22 probe calls, the track, the distance and the forks."),
  (ACP + "The mechanism", "How the retry works and where it runs: only when no attempt is kept, never displacing a declaration that fits."),
  (ACP + "The patch (wide), against fe74fb738", "The patch you apply, which git apply --check accepts on the base at an offset of 13 lines: apply it, read it and own it."),
  (ACP + "2. The faces and my programs", "The 22 probe calls with their instances: the shapes your tests take, and the controls refused by every trigger."),
  (ACP + "3. The compiler track", "The two verdicts that change and why no other program of the track reaches the retry."),
  (ACP + "4. The distance", "The stage unmoved on batch 11's tree, the retry tried at 10 library sites and kept at none."),
  (ACP + "5. What the specification would need to say", "The text under the wide trigger: the context added to the list, the item trimmed, the entry amended."),
  (ACP + "6. Forks met, not decided", "The five forks: 1 decided wide, 3 by P-49, and 2, 4 and 5 built as the patch has them, on the review list."),
  ("doc:Specification/basic/inference.tex#The Static Arguments of a Call", "The chapter's list of contexts, which gains the argument of a call."),
  ("doc:Specification/basic/inference.tex#A Numeral Whose Conversions Tie", "The list of what the chapter does not yet describe, whose item on another call's argument you trim."),
  ("doc:Specification/basic/expressions/var-ref.tex#Identifier References", "Static arguments inferred from the context of the function call: the sentence your Appendix I Rationale cites."),
  (CHG + "The contexts that give a call an expected type", "The entry whose Effect says the checker gives another call's argument no expected type (row 455): you amend it."),
  ("map:compile-path-walkthrough.md#How it walks the tree", "The checker is bidirectional: an expected type pushed down drives inference, and Functionals takes every call form."),
  ("code:" + TC + "/impls/Functionals.scala#def typedApplication(preCandidates: List[PreAppCandidate],", "Where every call form meets and the attempts run: the retry goes here, after rung N's earlier hunk at :324-389."),
  ("code:" + TC + "/impls/Functionals.scala#def inferFnExprParams(unchecked: FnExpr,", "The checker's own way of checking an unchecked argument again under an expected type: the retry's precedent."),
  ("code:" + TC + "/impls/Operators.scala#case SJuxt(info, multi, infix, front::rest, false, true)..case SJuxt(SExprInfo(span,paren,optType)", "The loose juxtaposition's retry with the expected type: the same mechanism, a second precedent."),
]
A_CHECKS = [
  "P-51", "P-49",
  "ledger:455", "ledger:535",
  ACP + "5. What the specification would need to say",
  ACP + "6. Forks met, not decided",
  "doc:Specification/basic/inference.tex#A Numeral Whose Conversions Tie",
  CHG + "The contexts that give a call an expected type",
  "code:" + TC + "/impls/Functionals.scala#def typedApplication(preCandidates: List[PreAppCandidate],",
]

L_BRIEFING = [
  ("P-146", "The decision word for word; its last sentences give your numerator lines: the thirtieth site takes one numerator per integer type."),
  ("P-27", "Each repair in the library's own spelling: Array1's offset, ZZ's numerator, the singleton map's own SYMDIFF; name each precedent line."),
  (LIBRULE, "The library rule as it is read: the four numerator api lines are an extension the review list judges, shown ZZ's line; name it in your report."),
  ("F-42", "Item 47's refusal of an untyped local parameter, and why clearing an earlier error can change what the count shows."),
  ("F-53", "The count stops at a component's first error, now body(i): why it stays 1 by reading once body(i) is typed."),
  ("F-145", "Walk refuses at load an object that leaves an inherited abstract method without a body: what Integral's numerator without a default asks of every type below it."),
  ("F-141", "Under walk a big operator's plain-bounded parameter that nothing fixes stays at BottomType: why body(i: I) is refused on a list comprehension by reading."),
  ("ledger:679", "Array2's offset answers oops in two branches: your site at :2525."),
  ("ledger:671", "IntMap's node map SYMDIFF a singleton keeps one entry: your walk repair and the two pins its test holds."),
  ("ledger:680", "Array3's crash, the count's next error by reading once body(i) is typed: a note, not yours."),
  ("ledger:678", "Array2's two other sites, a size lost in a factory, a list of ways: not yours."),
  ("ledger:639", "No interpreter test can hold fail's FAIL: why the offset's out-of-bounds path has no walk test."),
  (STJ + ":685, shape C, apart", "Numerator's default at :688: why no self type reaches it and the per-type body in ZZ's shape, under P-146."),
  ("code:Library/FortressLibrary.fss#desugaredClauses:(Reduction", "__bigOperator, the count's one error at body(i): the type you write."),
  ("code:Library/FortressLibrary.fsi#trait BigOperator[", "The getters whose types make body(i: I) check: body I->R, unwrap R->O, reduction ActualReduction[R,L]."),
  ("code:" + EV + "/EvaluatorBase.java#private static ArrayList<FType> instanceOf(", "Walk's instance of a static parameter: a big operator's unfixed plain-bounded one stays BottomType, which body(i: I) would then check each element against."),
  ("code:" + SRC + "/Shell.java#private static Iterable<? extends StaticError> compilerPhases(Path path,", "Why a crash in the component's check counts as one error: the reading behind the count's declared 1."),
  ("code:Library/FortressLibrary.fss#offset(t1:(ZZ32,ZZ32)):(ZZ32,ZZ32) = do", "Array2's offset, row 679's site."),
  ("code:Library/FortressLibrary.fss#offset(i:ZZ32):ZZ32 = do", "Array1's offset, the precedent: each bound check a statement, then the value."),
  ("code:Library/FortressLibrary.fss#offset(t:(ZZ32,ZZ32,ZZ32)):(ZZ32,ZZ32,ZZ32) = do", "Array3's offset, the same shape at rank 3."),
  ("code:Library/FortressLibrary.fss#trait Integral[", "Integral, whose numerator loses its default body under P-146."),
  ("code:Library/FortressLibrary.fsi#trait ZZ extends", "ZZ's api, whose numerator line is the precedent for the four you add."),
  ("code:Library/IntMap.fss#opr SYMDIFF(self, other: SingletonIM", "Row 671's site, the node map's SYMDIFF with a singleton."),
  ("code:Library/IntMap.fss#other.updateWith(fn (mv) => if mv.holds then", "The singleton map's own SYMDIFF body, the precedent for row 671's repair."),
  ("code:ProjectFortress/tests/IntMapSymdiffSingleton.fss#run(): () = do", "The revival test that pins today's two wrong values: its lines 12 and 13 change."),
]
L_CHECKS = [
  "P-146", "P-27", LIBRULE, "F-42", "F-141",
  "ledger:679", "ledger:671",
  STJ + ":685, shape C, apart",
  "code:Library/FortressLibrary.fss#offset(i:ZZ32):ZZ32 = do",
  "code:Library/FortressLibrary.fss#trait Integral[",
]

P_BRIEFING = [
  ("P-26", "The type group's late word outweighs the early text: the 2019 paper's examples test the revival's rules, and its No Duplicates Rule is non-strict."),
  ("P-25", "The specification is the standard: a wording that refuses nothing is the text's defect, restated."),
  ("P-95", "Why the overloading chapter and its Appendix I entry change: the reason, both papers and route C."),
  ("P-96", "The form of your text change: the rule restated in place with a callout, the entry amended."),
  ("F-174", "The specification states the 2011 overloading model, a declaration with static parameters read over its instances."),
  ("F-175", "The run-time instance of a dispatched declaration follows the 2019 paper: what A-C4's tests test."),
  ("F-50", "The checker lets overloads differ in static parameters and refuses only pairs it cannot prove unambiguous."),
  ("F-27", "Walk's load check of a generic declaration beside a plain one, on declared domains: what A6 and A-B2 test under walk."),
  ("F-103", "An XXX compile test can express a compile-stage failure only: a run-time failure needs a link test and an XXX run test."),
  ("F-140", "A size beyond NN32 or ZZ32 is refused on both paths and walk reads a size exactly: the refusal your power case keeps."),
  ("F-147", "Walk reads an override by the strict subtype and checks a generic declaration's override at its declaration: row 693's lenience."),
  ("ledger:696", "Your text row: the No Duplicates Rule on a strict relation refuses no pair."),
  ("ledger:697", "Walk's load check reads a differing object type as excluding: A4's expected failure gates it."),
  ("ledger:698", "The compiler prelude's ZZ32 has no comprises clause: A10's expected failure gates it until the switch-over."),
  ("ledger:699", "A dispatched generic declaration whose parameter only its return type mentions fails verification: A-C4's pair gates it."),
  ("ledger:444", "Walk loads an inherited functional method with two bodies and no meet: A1's expected failure, a note."),
  ("ledger:373", "Walk runs two generic overloads whose domains overlap: A6's and B4's reproducers, a note."),
  ("ledger:537", "Two generic declarations with different bounds die compiled: A-B2's third shape, a note."),
  ("ledger:676", "Walk stops on a power in a size: your one walk repair, a fourth case in forIntBinaryOp."),
  ("ledger:693", "Walk accepts an override that overrides nothing over a static parameter: the owed expected failure of the generic object's shape."),
  (PEX + "How the examples were run", "How each example became a program and ran on both paths: the form your tests take."),
  (PEX + "Group A: rules the revival implements", "Each example, its source page, its Fortress form, what today's tree does and its test: your tests, written from these."),
  (PEX + "B4. The No Duplicates Rule", "B4's pair, refused by the checker's own duplicate check: row 696's close test and the note."),
  (PEX + "Candidate test rung (group A, new or failing)", "The fourteen tests by name, failing and green: your list."),
  (PEX + "Candidate ledger rows", "The rows filed as 697 to 699, the optional R4 and the notes on rows 444, 373, 537 and 696, as checked."),
  ("doc:Specification/advanced/overloading.tex#Declarations with Static Parameters", "The strict definition of more specific and the No Duplicates Rule you restate."),
  (CHG + "Overloading with static parameters", "The entry that recorded the passage: you amend it with the restatement's reason."),
  ("doc:Specification/basic/expressions/constant.tex#Static Expressions", "The text gives a power in a static expression; the note at its head says walk stops on a power (row 676), which your repair makes false: you correct it."),
  (CHG + "When two sizes are the same", "The entry whose Effect ends that the interpreter stops on a power (row 676): you correct that sentence."),
  ("code:" + EV + "/EvalType.java#public FType forIntBinaryOp(IntBinaryOp n)", "Walk's size arithmetic: plus, minus and juxtaposition computed exactly, the power missing."),
  ("code:" + SRC + "/runtimeSystem/Naming.java#public static java.math.BigInteger sizeOp(", "The compiled path's size arithmetic, the power with its exponent limit: the behaviour walk's case matches."),
]
P_CHECKS = [
  "P-26",
  "ledger:696", "ledger:676",
  PEX + "Candidate test rung (group A, new or failing)",
  PEX + "Candidate ledger rows",
  "doc:Specification/advanced/overloading.tex#Declarations with Static Parameters",
  CHG + "When two sizes are the same",
  "code:" + EV + "/EvalType.java#public FType forIntBinaryOp(IntBinaryOp n)",
]

W_BRIEFING = [
  ("P-147", "The decision you build, word for word: coverage defines an inherited abstract method; rows 668 and 669 repaired first, then row 666 closed and the traits sentence revised."),
  ("P-27", "Each library repair in the library's own way: the proxy delegating as its perturbed does, a parameter at the abstract declaration's type, Gen's own default for perturb."),
  ("P-60", "The specification reads a comprises clause at the level of values: covering is defined once, and your sentence uses it."),
  ("P-26", "The type group's late word, Steele's checker of 2012 and Welterweight's Covered rule, outweighs the Working Draft's sentence."),
  ("P-95", "Why the traits chapter and its Appendix I entry change: the reason, the original text and route C."),
  ("P-96", "The form of your text change: the sentence revised in place with a callout, the entry amended."),
  ("F-145", "What walk refuses at load today, the allowance of row 666 that goes, and why generic objects are skipped (row 665)."),
  ("F-27", "Walk's load check of an overloaded function covers an overlap through comprises clauses (overlapCoveredBy): the reader your coverage test shares."),
  ("ledger:666", "Your walk row: one narrower body passes today; XXXAbstractMethodPartlyDefinedWalk is promoted and the row closes."),
  ("ledger:668", "Your first library row: the distributed generator without seedSize and reseed, and MersenneTwisterInit's perturbed at a narrower type."),
  ("ledger:669", "Your second library row: AnyGen's abstract perturb at Any that the generators define only at their element type."),
  ("ledger:665", "The same check on generic objects, its abstract half: not yours, kept out for a measurement; its expected failures keep their verdicts."),
  ("ledger:628", "The Any device retired for simpleJoin by typing it at the implementer's type: the precedent row 669's repair weighs."),
  ("ledger:670", "The demos that leave a method with no body at all, refused under every reading: a note, no demo edited."),
  ("doc:explorations/reviews/walk-load-readings-check.md#2.2 The chapter's letter", "The traits chapter's sentence and the functions chapter's covering words, the two texts your revision joins."),
  ("doc:explorations/reviews/walk-load-readings-check.md#2.3 The team's later word", "Steele's checker, its comprises reading since 59fdeff62, and Welterweight's Covered rule: P-147's sources."),
  ("doc:explorations/reviews/walk-load-readings-check.md#2.4 The team's library and tests", "Pairs and FileConversion, which coverage keeps valid, and the two library sites, rows 668 and 669, which need repairs."),
  ("doc:explorations/reviews/walk-load-readings-check.md#2.5 Verdict", "The rule to build and where: definedBelow gathering every body and testing coverage with walk's comprises reader."),
  ("doc:explorations/reviews/walk-load-readings-check.md#2.6 What replacing it would change", "What coverage accepts and refuses, and why the library repairs come first: the tests that must keep their verdicts."),
  ("doc:explorations/compile-ladder/rung-walk-load-checks/REPORT.md#4. What the library, the team's tests and the demos meet", "The one measurement of the check on the library, at instances on batch 12's tree: what the exact reading refused."),
  ("doc:Specification/basic/traits.tex#Method Declarations", "The sentence at :579-581 you revise, beside the inheritance rule it rests on."),
  ("doc:Specification/basic/functions.tex#Abstract Function Declarations", "The covering words at :431-434 your sentence takes, and the callout already true of the compiled checker."),
  ("doc:Specification/basic/objects.tex#Object Declarations", "The objects chapter's sentence that an object defines every inherited abstract method: revise it or say why it stays true."),
  ("doc:Specification/appendices/changes.tex#Traits with comprises clauses read at the level of values", "The coverage reading's entry, which you amend: its affected sections, change, effect, original text and rationale."),
  ("code:" + EV + "/values/Constructor.java#private void checkForDef(", "The check that refuses an object leaving an inherited abstract method without a body."),
  ("code:" + EV + "/values/Constructor.java#private static boolean definedBelow(", "The allowance that goes: one body at or below the abstract types is enough today."),
  ("code:" + EV + "/values/OverloadedFunction.java#static private boolean overlapCoveredBy(", "Walk's own coverage test for the Meet Rule: parts through comprises clauses, every combination below one declaration; the shape to follow."),
  ("code:" + EV + "/values/OverloadedFunction.java#static private List<Set<FType>> overlapPieces(", "Walk's reader of comprises clauses, which splits a type into the types its clause lists, and gives no answer on a symbolic type."),
  ("code:" + SC + "/typechecker/AbstractMethodChecker.scala#private def checkObjectDeclaration(", "The compiled checker's coverage rule, Steele's of 2012: the rule walk now agrees with."),
  ("code:Library/Random.fss#trait SeededRandomGen[", "The abstract seedSize, reseed and perturbed, and the comment on what the distributed proxy does."),
  ("code:Library/Random.fss#object SeededRandomGenWithDistribution[", "Row 668's first site: no seedSize, no reseed; its perturbed delegates to gen, the shape the two new bodies take."),
  ("code:Library/Random.fss#object MersenneTwisterInit(", "Row 668's second site: perturbed at Indexed under the abstract at Generator."),
  ("code:Library/QuickCheck.fss#trait AnyGen", "Row 669's site: perturb abstract at Any."),
  ("code:Library/QuickCheck.fss#trait Gen[", "Gen's own default perturb, the body by reading AnyGen's takes."),
  ("code:Library/Pairs.fss#trait RunRanges", "The team's coverage shape in the library: RunRanges covered by its two listed types, which must stay valid."),
]
W_CHECKS = [
  "P-147", "P-27",
  "ledger:666", "ledger:668", "ledger:669",
  "doc:explorations/reviews/walk-load-readings-check.md#2.5 Verdict",
  "doc:explorations/reviews/walk-load-readings-check.md#2.6 What replacing it would change",
  "doc:Specification/basic/traits.tex#Method Declarations",
  "code:" + EV + "/values/Constructor.java#private static boolean definedBelow(",
]

IDS = ('S', 'A', 'L', 'P', 'W')
LISTS = {
  'S': ([k for k, _ in S_BRIEFING], S_CHECKS),
  'A': ([k for k, _ in A_BRIEFING], A_CHECKS),
  'L': ([k for k, _ in L_BRIEFING], L_CHECKS),
  'P': ([k for k, _ in P_BRIEFING], P_CHECKS),
  'W': ([k for k, _ in W_BRIEFING], W_CHECKS),
}
REASONS = {'S': S_BRIEFING, 'A': A_BRIEFING, 'L': L_BRIEFING, 'P': P_BRIEFING, 'W': W_BRIEFING}


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
    root = os.environ.get('FORTRESS_HOME', os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../..')))
    bad = 0
    for rid, (b, c) in LISTS.items():
        rp = reason_problems(rid)
        print(rid, 'reasons', len(REASONS[rid]), 'for', len(b), 'briefing keys |', 'problems', len(rp))
        for k, why in rp: print('   PROBLEM', why, ':', k[:200])
        if rp: bad += 1
        for name, keys in (('briefing', b), ('checks', c)):
            if len(set(keys)) != len(keys):
                print('   PROBLEM duplicate key in', rid, name); bad += 1
            badk = [k for k in keys if not k.strip() or k.startswith('-') or re.search(r'["`$\\\n]', k)]
            if badk:
                print('   PROBLEM keys the script refuses', rid, name, badk); bad += 1
            if name == 'checks':
                stray = [k for k in keys if k not in b]
                if stray:
                    print('   PROBLEM checks keys not in the briefing', rid, stray); bad += 1
            r = subprocess.run(['bash', 'explorations/coordinator/tools/facts-extract.sh', '--check'] + keys, capture_output=True, text=True, cwd=root)
            lines = r.stdout.strip().splitlines()
            probs = [l for l in lines if 'not one' in l or 'NOT FOUND' in l or 'no match' in l.lower() or 'no line of' in l or 'no such file' in l]
            total = [l for l in lines if l.startswith('Total')]
            print(rid, name, 'keys', len(keys), 'exit', r.returncode, '|', total[0] if total else r.stderr.strip()[:200])
            for l in probs: print('   PROBLEM', l[:300])
            if r.returncode or probs:
                bad += 1
                if os.environ.get('VERBOSE'): print(r.stdout)
    print('bad lists', bad)
    sys.exit(1 if bad else 0)
