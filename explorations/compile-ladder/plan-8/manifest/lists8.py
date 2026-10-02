# The briefing and checks lists of climb batch 8's four rungs, I, O, Q and M (CLIMB-BATCH-8.md, section 3), in batch
# 7b's form (explorations/compile-ladder/plan-7b/manifest/lists7b.py). Each briefing entry is a pair: its facts-extract.sh
# key and one line on why it is there and what the rung does with it (the process review's measure 5, approved by
# Pavol on 2026-09-28), naming what to take from the entry and what to check in the rest (batch 6.5's review, measure 4).
# gen8.py renders the lines at the end of each rung's tail, in the order of the briefing. A checks list is a sub-list
# of its briefing's keys. POSITIONS.md and FACTS.md entries are keyed by their bold titles, which survive the
# consolidations (their headers say how). `python3 lists8.py` checks every key with facts-extract.sh --check (each must
# match exactly one place) and every reason's form; it is run again on the tree the batch is cut from.
SRC = 'ProjectFortress/src/com/sun/fortress'
FUN = SRC + '/scala_src/typechecker/impls/Functionals.scala'
OVC = SRC + '/scala_src/typechecker/OverloadingChecker.scala'

STOPS = "Every stop reserved for Pavol is reversible: finish, list it in stopsMet with liftedBy citing this entry, and land."
GATE_BEFORE = "Your before is the last landed gate's tables (batch 7b's), not a run of the stage on your unchanged base; run only the after, into tmp/."
TESTF = "Write the ledger row's core problem as a clean minimal test first, see it fail through the harness, commit it alone; your skeptic sees it fail again."

PIR = "positions:A type parameter the arguments do not fix"
ORDER = "positions:The order of the checker's attempts at a call"
CONV = "positions:Conversions never change which declaration runs"
BOUND = "positions:The implicit bound of an unbounded type parameter"
SPECREC = "positions:Every change to the specification is recorded with its reason"
S1 = "positions:The S1 form"
STD = "positions:The specification stays the standard"
LATE = "positions:The type group's late positions outweigh the early text"
LIBP = "positions:The library's own practice is the standard"
ROUTE = "positions:The library route"
TESTP = "positions:Test first, the test kept"
REMEASURE = "positions:No re-measuring what the record holds"
REVSTOP = "positions:Reversible stops do not hold a batch"
ANSWER9 = "positions:The static-parameter sentence goes"
ROUTEA = "positions:The exclusion rule stays and the tower is flat"
ANYINT = "positions:AnyIntegral's closure and how the checker reads comprises"
COMPRISES = "positions:The comprises passages read at the level of values"
NUMSW = "positions:The numeral switch, split by where the static types are"
NN32 = "positions:NN32 coerces into RR64"
ANS8 = "positions:Mixed widths convert by declared coercions"
MINMAX = "positions:Each integer type declares its own MIN, MAX and MINMAX"
MODEL = "positions:The model's text is the notation"
COUNTP = "positions:The checker count is measured, never red"
REC = "doc:explorations/reviews/decisions-review/popl-recheck.md#"
EXT = "doc:research/extracts/ParkPOPL2019-extract.md#"
P2 = "doc:explorations/compile-ladder/plan-7b/probes/P2.md#"
NSJ = "doc:explorations/reviews/numeral-switch-judgement.md#"
L7B = "doc:explorations/coordinator/PLAN.md#Climb batch 7b, listed for his review@"

I_BRIEFING = [
  (PIR, "The rule you build: the bound under the expected type, never Bottom, never the union; take its words and its In batch 8 sentence, and check that no case you build departs from them."),
  (ORDER, "The order you build: subtyping without the expected type first, kept when its result converts, then coercion with the context; XXXInferContextKeepsFit is its test."),
  (CONV, "The rule the new order serves: a conversion never changes which declaration runs when one already fits; answer 8's promotion stays the number case, untouched."),
  (BOUND, "The bound an unbounded parameter takes is Any, the top, which holds tuples, functions and (); the bound your rule gives where none is written."),
  (LATE, "Why the POPL 2019 paper's rule outweighs the chapter's earlier union and the team's open draft note; cite it in the decision record."),
  (SPECREC, "Why the inference chapter changes with the checker in your rung: no discrepancy between the text and what the checker builds stays unrecorded."),
  (S1, "The form of your text changes: the passage revised in place with a revision callout, the Appendix I entry updated, the team's draft note kept."),
  (TESTP, TESTF),
  (REMEASURE, GATE_BEFORE),
  (REVSTOP, STOPS),
  ("ledger:447", "A result-only parameter bound to Bottom, and the compiled run dying at load; its run test and link test pair is yours to promote, the overloaded shape beside it."),
  ("ledger:505", "The solver's two behaviours for a result-only parameter by its bound; both give the bound under your rule, and its pair is yours to promote."),
  ("ledger:425", "A big operator's clause form with an unwritten static argument refused at Bottom; find whether a compiled test can hold it, and whether the desugaring's bounds are needed too."),
  ("ledger:516", "The lone parameter's union: its compiled half, the unbounded case, is yours; the walk half stays for the walk rung, and you append that note."),
  ("ledger:515", "A lone parameter beside a coerced argument refused; the bound in place of the union fallback is its repair, and its expected failure is yours to promote."),
  ("ledger:518", "An instance at a union refused as an argument; it goes once no union is built, and its expected failure is yours to promote."),
  ("ledger:535", "The union of a closed trait's types reaching code generation; under the bound the call is a static error, so its link test is rewritten to the refusal."),
  ("ledger:541", "Inference keeping one conjunct of an intersection; its repair is in the solver beside 515 and 518, and its expected failure is yours to promote."),
  ("ledger:508", "The attempt order's defect and its three gated faces, a call, an operator and a method invocation; promote each the new order reaches, and say why for any it does not."),
  ("ledger:424", "Walk's erasure to Bottom, not yours: the chapter's callout keeps saying what walk does until the walk rung, and you append a note."),
  (REC + "1.8 Row 447", "The paper's case against the Bottom binding, its fix and its tests, and where the solver binds Bottom today; your rung is its section 3, item 3."),
  (REC + "1.9 Row 516", "The union replaced by the bound in the checker's candidates; the few checker lines this names are yours, with the bound under the expected type."),
  (REC + "1.13 Row 508", "The paper is silent on coercion, so the attempt order rests on decision 1 alone; do not cite the paper for it."),
  (EXT + "4.2 The dynamic choice", "The paper's solving step, the intersection of the upper bounds under the static return type; the source your callout and entry cite."),
  ("doc:explorations/reviews/batch-N-review.md#Findings@Item 34's default is against decision 1", "Why the landed order runs against decision 1 and the landed chapter; the ground of your order and its decision record."),
  ("doc:explorations/reviews/conversion-overloading-judgement.md#1. The rule", "Decision 1's text for the specification, the order the chapter states and your checker must follow."),
  ("doc:Specification/basic/inference.tex#Type Inference", "The chapter whole: its rule, the list of what it does not describe, the callout on Bottom and the team's draft note, the passages you revise."),
  ("doc:Specification/appendices/changes.tex#The inference of a call's static arguments", "Its entry: remove from its Effect the departures you close, name those left, and record the bound's case in its Change and Rationale."),
  ("doc:Specification/appendices/changes.tex#The instance at which a dispatched declaration runs", "The paper's rule as batch 7b stated it for dispatch; your static rule matches it and cites it."),
  ("doc:Specification/appendices/changes.tex#Passages not yet revised", "Its sentence on the inference chapter's item and callout goes once you revise them; leave every other sentence."),
  ("doc:Specification/basic/conversions-coercions.tex#Coercion Resolution", "The set of declarations applicable to a call and the coercion order; the attempt order must give what this section gives."),
  ("code:" + SRC + "/scala_src/useful/STypesUtil.scala#def killIvars", "Where an open inference variable becomes BOTTOM; one site of the change, but check every caller before you change it."),
  ("code:" + SRC + "/scala_src/typechecker/Formula.scala#def solve(c: CFormula)..private def slv(c: CFormula)", "The solver the checker shares; the bound for a variable with no lower bound, and row 541's conjunct, are decided here."),
  ("code:" + FUN + "#def checkApplicableWithCoercion(", "The candidates a lone parameter gets, the union fallback among them; the bound replaces the union here."),
  ("code:" + FUN + "#def typedApplication(", "The attempts list and the fallback without the context; the new order goes here, and its ambiguity check below stays batch N's."),
  ("The compiled checker infers a generic's static arguments with coercion", "What batch N built: inference with coercion and the promotion, the expected type kept with a retry; your change sits on it."),
  ("Keeping the expected type at a call written", "Why keeping the expected type cleared the natives only by binding Bottom; your bound is the end of that story."),
  ("The specification gives the run-time instance of a dispatched declaration", "The text's bound for dispatch and for a lone parameter since batch 7b; the checker departs from it until your rung."),
  ("The specification's type-inference chapter states the rule of climb batch N", "The chapter's rule and its claim to state what the checker builds; keep the claim true after your edit."),
  ("The XXX expected-failure mechanism in compiler_tests/ and library_tests/", "How your promoted and rewritten tests gate: a run defect needs its run test and its link test, a refusal one compile test."),
  ("An XXX compile test pinned by compile_err_contains whose program compiles", "What a refusal test reports on the base; that is its failure before your edit."),
  ("ant compileAll deletes a tracked file", "Restore default_repository/caches/global.map after every ant compileAll."),
  ("The true distance to the switch-over", "The distance stage your rule moves; read your after by class against the landed table."),
  ("map:modules-and-phases.md#B.6 Type checking", "Where inference sits in the checker's phases and which files hold it."),
  ("map:README.md#Touch this@scala_src/typechecker/", "What a checker edit moves and what guards it."),
  ("index:inference", "The notes on file on inference; open those your change touches."),
]
I_CHECKS = [
  PIR, ORDER, CONV, BOUND, S1,
  "ledger:447", "ledger:505", "ledger:425", "ledger:516", "ledger:535", "ledger:541", "ledger:508",
  REC + "1.8 Row 447", REC + "1.9 Row 516", EXT + "4.2 The dynamic choice",
  "doc:Specification/basic/inference.tex#Type Inference",
  "doc:Specification/appendices/changes.tex#The inference of a call's static arguments",
  "code:" + FUN + "#def typedApplication(",
  "The XXX expected-failure mechanism in compiler_tests/ and library_tests/",
]

O_BRIEFING = [
  (STD, "The text is the standard; where the checker is stricter than the text, the checker moves, which is row 556's first way."),
  (ANSWER9, "The 2011 model the text states, the Meet Rule for functional methods among it; answer 9's positional and return-type rules are not yours to change."),
  (COMPRISES, "The coverage check stays local to overload checking and generic families' coverage is left; your rule changes neither."),
  (LIBP, "No fix routed round the checker in the library: the capture is fixed in the checker, never by renaming the library's R."),
  (ROUTE, "No declaration goes into the compiler's prelude; row 477 is fixed by pointing the checker at the one library's Char."),
  (TESTP, TESTF),
  (REMEASURE, GATE_BEFORE),
  (REVSTOP, STOPS),
  (COUNTP, "The count and the distance are reported and never red; declare what you measure, and name every crash row that goes."),
  ("ledger:556", "Row 556, under Q1 = (a): the checker applies the function rule to functional methods; its first way is yours, the per-provider check kept, its test promoted."),
  ("ledger:545", "A family mixing a top-level function with functional methods: the text does not say which rule governs, so its check stays as today; not yours."),
  ("ledger:546", "The Meet Rule's case for generic families, refused by the checker; Pavol's question, not yours: keep its expected failure."),
  ("ledger:557", "The kind environment crash under a generic excludes clause; promote its test, and the verdict after the crash is today's check of a mixed family."),
  ("ledger:477", "Character typed by a name only the compiler's library declares; the shadow's measured fix and the world switch's pattern are evidence, list the ways before you take one, and note Types.REGION, not yours."),
  ("ledger:547", "A verdict carried between compilations in one JVM; not yours, not traced; the memo you rekey is made per unit, so do not claim it."),
  ("ledger:544", "Walk applies no Meet Rule for functional methods; the walk rung's, so nothing of walk changes in your rung."),
  (L7B + "The rest of the one library's seq family", "Row 556's three ways and its default, (1), which Q1 = (a) makes yours; the per-provider check stays."),
  (P2 + "The answers", "Probe P2's library devices for the Meet Rule class; under Q1 = (a) the top-level pairs are yours by rule and rung M builds only the per-provider ones."),
  ("doc:explorations/perf-probes/nat/triage.md#3. The classification", "The capture, (e2), and the memo as the triage found them; their mechanisms, and the rename that only routed round the capture."),
  ("doc:explorations/perf-probes/nat/triage.md#1. The two copies, reproduced, and why the count moves", "How the memo makes the count move with the build order; the evidence your memo test or stage run replaces."),
  ("doc:Specification/advanced/overloading.tex#Meet Rule", "The Meet Rule for functions and for functional methods as batch 7b left them; your rule follows the second for functional methods."),
  ("code:" + OVC + "#private def getFunctionalMethods(", "Where functional methods are gathered; follow where they join the top-level set and where the per-provider check reads them."),
  ("code:" + OVC + "#private def toFunctionalMethodArrows(..private def toMethodArrows(", "Where an inherited method is instantiated by its trait's replacer; the capture happens here."),
  ("code:" + OVC + "#private val validOverloadingMemo..private def validOverloadingInner(", "The memo keyed on the two declarations alone, so its answer carries from one trait's context into another's; how it stops is yours to choose and report."),
  ("code:" + SRC + "/compiler/Types.java#public static void useFortressLibraries()", "The world switch, which re-points String and Exception and not Character; row 477's fix goes beside them."),
  ("code:" + SRC + "/scala_src/types/TypeAnalyzer.scala#def staticParam(x: Id)", "Where row 557's crash is raised; find which caller extends the kind environment too little, and fix the caller."),
  ("The hidden layer, classified", "The memo, the capture and the classes of the overloading layer; name every class your edits move."),
  ("Crashes reach zero in the shadow", "Row 477's three-line fix measured in a shadow, and why a crash hides a declaration's whole body."),
  ("The compiled checker accepts the Meet Rule's comprises example by a coverage check", "Batch 7b's coverage check for functions and functional methods; your rule must keep its tests' verdicts."),
  ("The one library's refused overload families are repaired by its own exclusions", "What the library already repaired, and the seq pairs left for row 556."),
  ("The XXX expected-failure mechanism in compiler_tests/ and library_tests/", "How your promoted tests gate; a refusal is one compile test."),
  ("ant compileAll deletes a tracked file", "Restore default_repository/caches/global.map after every ant compileAll."),
  ("The true distance to the switch-over", "The distance stage your edits move; read your after by class and by crash row."),
  ("map:modules-and-phases.md#B.7 Overloading", "The overloading phase and its files."),
  ("map:README.md#Touch this@scala_src/typechecker/", "What a checker edit moves and what guards it."),
  ("index:overloading", "The notes on file on overloading; open those your rule touches."),
]
O_CHECKS = [
  STD, ANSWER9, COMPRISES, LIBP, ROUTE,
  "ledger:556", "ledger:545", "ledger:546", "ledger:557", "ledger:477",
  L7B + "The rest of the one library's seq family",
  "doc:explorations/perf-probes/nat/triage.md#3. The classification",
  "doc:Specification/advanced/overloading.tex#Meet Rule",
  "code:" + OVC + "#private def toFunctionalMethodArrows(..private def toMethodArrows(",
  "code:" + OVC + "#private val validOverloadingMemo..private def validOverloadingInner(",
  "The hidden layer, classified",
]

Q_BRIEFING = [
  (NUMSW, "Your rung is Q-lib: library and glue, the warning quoted, the one measurement; walk's numeral stays an Int, which is Q-walk's."),
  (NN32, "R9: RR64 coerces from NN32, one api line, one body line, a test, the callout reworded; with Q-lib because both add coerce declarations to RR64."),
  (ANS8, "Exact conversions implicit, lossy ones explicit; check every coerce you add against it."),
  (MINMAX, "Decision 2's device, each integer type's own declaration, which item 33 extends to CMP, MAXNUM and MINNUM."),
  (ROUTEA, "Each number type carries its own algebra under Number; IntLiteral is a sibling and excludes what the compiler library's excludes."),
  (ROUTE, "The compiler library is not edited; its IntLiteral is the model you copy, not a file you touch."),
  (LIBP, "Take the library's own device for each piece, the compiler library's model first."),
  (SPECREC, "The literals passage and the coercion and number chapters change with the library in your rung."),
  (S1, "The form of each text change: the passage in place, a revision callout, the Appendix I entry."),
  (MODEL, "No line of the model or its vocabulary; your measurement checks the two microGPT programs, it does not edit them."),
  (TESTP, TESTF),
  (REMEASURE, "Your before is the last landed gate's tables and the coordinator's base pass; run only your edit pass and your after."),
  (REVSTOP, STOPS),
  ("ledger:454", "A numeral at an NN32 or NN64 binding refused; your coerce from IntLiteral closes the checker's side, and walk's stays for Q-walk, which you note."),
  ("ledger:517", "MAXNUM and MINNUM tie under walk; the ten declarations close it and promote its expected failure."),
  ("ledger:484", "The per-type MIN, MAX and MINMAX, the precedent for your MAXNUM, MINNUM and CMP."),
  ("ledger:442", "The compiled prelude lacks the conversions the chapters state; the one library gains them in your rung, and you append a note."),
  ("ledger:79", "A numeral's typecase and dispatch split between the paths; Q-walk's, not yours, since walk's numeral stays an Int."),
  (NSJ + "4.4 What goes into each half", "The list of what Q-lib holds, piece by piece; build these and nothing of the walk half."),
  (NSJ + "4.5 The = device", "Why the numeral case goes into exactValue now and what it costs once walk's numeral is an IntLiteral; not paid in your rung."),
  ("doc:explorations/compile-ladder/plan-n/probe-q/PROBE-Q.md#The answers", "Probe Q's measured switch: the library loads, microGPT's values do not move; the evidence, not your brief."),
  ("doc:explorations/compile-ladder/plan-n/probe-q/PROBE-Q.md#5. Number's =, the named sites and the probe programs", "The library's numeral sites and the = device as measured; your test pins the sites."),
  ("doc:explorations/reviews/batch-N-review.md#Findings@Item 33's second half", "Why the ten MAXNUM and MINNUM declarations are yours: decision 2 and the specification's ZZ give them."),
  ("doc:explorations/reviews/batch-6.5b-review.md#Findings@Batch 8's R9 will make the passage V revised false", "The number chapter's passage R9 makes false; it changes in your rung, beside rung V's callout."),
  ("doc:Specification/basic/expressions/literals.tex#Literals", "The literals section, whose numeral passage you revise to name the library's IntLiteral."),
  ("doc:Specification/basic/conversions-coercions.tex#Principles of Coercion", "The paragraph and the callout on answer 8 that you reword for NN32, and the sentence on the interpreter."),
  ("doc:Specification/appendices/changes.tex#The single-precision floating-point type", "Rung V's entry on the number chapter's passage, beside whose callout R9's text goes; read the passage itself at numbers.tex:41-49."),
  ("doc:Specification/appendices/changes.tex#Integers in floating-point expressions", "The entry for the callout on answer 8; revise it for R9."),
  ("code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait IntLiteral", "The compiler library's IntLiteral, its exclusions, getters and operators; the model you take."),
  ("code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi#object IntLiteral", "The one library's IntLiteral below ZZ32 today; what you replace."),
  ("code:Library/FortressLibrary.fsi#trait RR64 extends", "RR64's coerce list, where coerce from NN32 and from IntLiteral go."),
  ("code:Library/FortressLibrary.fsi#trait ZZ64 extends", "ZZ64's comparisons stated on ZZ64 itself, the precedent for ZZ32's."),
  ("code:Library/FortressLibrary.fss#exactValue(x: Number)", "The typecase that gives a numeral Ratio(0, 0) today; the numeral case goes here."),
  ("code:" + SRC + "/interpreter/glue/prim/IntLiteral.java#public class IntLiteral", "The team's IntLiteral natives, beside which the five getters' natives go."),
  ("A numeral's type depends on the path and on the library in scope", "Why the checker sees IntLiteral and walk an Int, and what your model changes on each side."),
  ("The numeral switch, measured under walk", "Probe Q's measurement of the whole switch; the half you build changes no walk output by its reading."),
  ("The one library's number tower is flat", "The siblings under Number and their coerce lists, which you extend."),
  ("Under walk, the interpreter converts by coercion at its three kinds of type check", "Where walk applies a coerce you add: a typed binding, an argument, a return."),
  ("The coercions between number types carry a sum's zero", "Why the empty sums your test pins keep their identities across the coercions."),
  ("ant compileAll deletes a tracked file", "Restore default_repository/caches/global.map after every ant compileAll."),
  ("The true distance to the switch-over", "The distance stage your model moves, expected about 4 below the landed table; read it by class."),
  ("map:README.md#Touch this@Library/FortressLibrary.fss", "What a library edit moves: walk, the stages and the commit stage's PDF."),
  ("index:numeral", "The notes on file on numerals; open those your passages touch."),
]
Q_CHECKS = [
  NUMSW, NN32, ANS8, MINMAX, ROUTE,
  "ledger:454", "ledger:517",
  NSJ + "4.4 What goes into each half",
  "doc:explorations/reviews/batch-6.5b-review.md#Findings@Batch 8's R9 will make the passage V revised false",
  "code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait IntLiteral",
  "code:Library/FortressLibrary.fss#exactValue(x: Number)",
  "A numeral's type depends on the path and on the library in scope",
]

M_BRIEFING = [
  (LIBP, "Each pair's device is the library's own for the same kind of problem; list every way before you choose, the library's first."),
  (ANSWER9, "The library's families repaired by its own devices, with no checker step; the decision your devices extend."),
  (ANYINT, "The Meet Rule and the residue are batch 8's; your share is the pairs a type provides together and the slips."),
  (ROUTEA, "Every device states an exclusion or a meet the rule reads; none states an exclusion false of a library type."),
  (MODEL, "No line of the model or its vocabulary is yours."),
  (TESTP, TESTF),
  (REMEASURE, GATE_BEFORE),
  (REVSTOP, STOPS),
  ("ledger:556", "Row 556, under Q1 = (a) rung O's: every top-level pair of two functional methods is O's rule, not your device."),
  ("ledger:483", "UniformDistribution returning ZZ32 values as a declared T; one of the row's two ways is yours, with a test seen failing."),
  ("ledger:531", "avFlat declared RR32 over an RR64 body; narrow is the row's repair, and its expected failure is yours to promote."),
  ("ledger:421", "StandardMinMax's MIN and MAX, fixed in batch 7; the (T, T) slips in bodies are its neighbours and yours."),
  ("ledger:492", "The Meet Rule example both paths now accept; the review-routed messages that still call V the intersection are yours to reword."),
  (P2 + "The answers", "What the library's devices clear and what they leave; under Q1 = (a) take only the meet declarations and the two slips."),
  (P2 + "2. The devices and what each clears", "Devices M, Q, C and S as measured; their api halves, to which you add the component halves."),
  (P2 + "3. What it settles and leaves open", "The pairs P2 did not measure: the full sequential ranges' map, String's juxtaposition, cross and nest; yours to repair or report."),
  (L7B + "review-routed.1", "The two messages to reword in plain words to what the text now says, no assertion changed."),
  (L7B + "review-routed.2", "The walk file to rename with its component, no assertion changed."),
  ("doc:explorations/perf-probes/nat/triage.md#3. The classification", "The classes of the overloading layer, the meet rule and the library slips among them; generate's capture is rung O's."),
  ("doc:Specification/advanced/overloading.tex#Meet Rule", "The rule your devices satisfy: a declaration on the meet where a type provides both."),
  ("doc:Specification/advanced/overloading.tex#Principles of Overloading", "The Return Type Rule your slips break; repair each to what its body and callers already do."),
  ("code:Library/FortressLibrary.fsi#(** Potemkin exclusion traits..trait Rank3", "The library's plain exclusion traits; a device for a family told apart by a plain parent."),
  ("code:Library/FortressLibrary.fsi#trait Maybe[", "Maybe, the meet of Condition and Indexed, where its map and ivmap are declared under P2's device M."),
  ("code:Library/FortressLibrary.fsi#trait StandardMutableArrayType[", "The array diamond's meet, where copy goes under P2's device C, as fill and tabulate did."),
  ("code:Library/FortressLibrary.fss#object SimpleSeqFilterGenerator[", "A type below two generators that declares its own seq: the library's meet declaration, your precedent."),
  ("code:Library/Random.fsi#object UniformDistribution", "Row 483's object; its range parameter no longer ties its T."),
  ("The hidden layer, classified", "The overloading layer's classes; name every row your devices move by class."),
  ("The one library's refused overload families are repaired by its own exclusions", "Batch 7b's devices for the families, and what they left."),
  ("fill takes a value and tabulate a function, both defined where the array diamond meets", "The array diamond's meet as the library already uses it."),
  ("Every functional-method name of the library is reserved", "Why a new name can collide with a program's own; choose names the library does not already reserve."),
  ("testSystem's four shards are one suite split by sorted index", "Your new test moves the shards; the gate compares their sum."),
  ("The interpreter's overload-ambiguity message names its two declarations", "The ambiguity message's order is not the program's; do not compare it verbatim."),
  ("The true distance to the switch-over", "The distance stage your devices move; read it by family against the landed per-site list."),
  ("map:README.md#Touch this@Library/FortressLibrary.fss", "What a library edit moves: walk, the stages and the commit stage's PDF."),
  ("map:dormant-code.md#1.1 Commented-out declarations in", "The library's commented-out declarations; a device the team began may be there."),
  ("index:overloading", "The notes on file on overloading; open those your pairs touch."),
]
M_CHECKS = [
  LIBP, ANSWER9, ANYINT, ROUTEA,
  "ledger:556", "ledger:483", "ledger:531",
  P2 + "The answers", P2 + "2. The devices and what each clears",
  L7B + "review-routed.1", L7B + "review-routed.2",
  "doc:Specification/advanced/overloading.tex#Meet Rule",
  "code:Library/FortressLibrary.fsi#(** Potemkin exclusion traits..trait Rank3",
  "code:Library/FortressLibrary.fss#object SimpleSeqFilterGenerator[",
]

IDS = 'IOQM'
BRIEFINGS = {'I': I_BRIEFING, 'O': O_BRIEFING, 'Q': Q_BRIEFING, 'M': M_BRIEFING}
CHECKS = {'I': I_CHECKS, 'O': O_CHECKS, 'Q': Q_CHECKS, 'M': M_CHECKS}
LISTS = {rid: ([k for k, _ in BRIEFINGS[rid]], CHECKS[rid]) for rid in IDS}
REASONS = {rid: [(k, r) for k, r in BRIEFINGS[rid]] for rid in IDS}

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
