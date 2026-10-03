# The briefing and checks lists of climb batch 10's four rungs, W, C, G and N (CLIMB-BATCH-10.md, section 3), in batch
# 9's form (explorations/compile-ladder/plan-9/manifest/lists9.py). Each briefing entry is a pair: its facts-extract.sh
# key and one line on why it is there and what the rung does with it, naming what to take from the entry and what to
# check in the rest. gen10.py renders the lines at the end of each rung's tail, in the order of the briefing. A checks
# list is a sub-list of its briefing's keys. POSITIONS.md and FACTS.md entries are keyed by their bold titles, which
# survive the consolidations. `python3 lists10.py` checks every key with facts-extract.sh --check (each must match
# exactly one place) and every reason's form; it is run again on the tree the batch is cut from.
SRC = 'ProjectFortress/src/com/sun/fortress'
EV = SRC + '/interpreter/evaluator'
OVF = EV + '/values/OverloadedFunction.java'
TC = SRC + '/scala_src/typechecker'

STOPS = "Every stop reserved for Pavol is reversible: finish, list it in stopsMet with liftedBy citing this entry, and land."
GATE_BEFORE = "Your before is the last landed gate's tables (batch 9's), not a run of the stage on your unchanged base; run only the after, into tmp/."
TESTF = "Write the core problem as a clean minimal test first, see it fail through the harness, commit it alone; your skeptic reads that order in your transcript and builds nothing."
TWICE = "One build per code state and one whole-suite run after your last edit; your skeptic reads your run and your tables, and builds and re-runs nothing."

PIR = "positions:A type parameter the arguments do not fix"
BOUND = "positions:The implicit bound of an unbounded type parameter"
CONV = "positions:Conversions never change which declaration runs"
SUMP = "positions:SUM and PROD without the Number catch-all"
DEMOS = "positions:The team demos that write no static argument"
SPECREC = "positions:Every change to the specification is recorded with its reason"
S1 = "positions:The S1 form"
STD = "positions:The specification stays the standard"
LATE = "positions:The type group's late positions"
VERDICT = "positions:The suite's verdict is the check"
LIBP = "positions:The library's own practice is the standard"
ROUTE = "positions:The library route"
TESTP = "positions:Test first, the test kept"
NOTWICE = "positions:Nothing is built or run twice on the same code"
REMEASURE = "positions:No re-measuring what the record holds"
REVSTOP = "positions:Reversible stops do not hold a batch"
ANSWER9 = "positions:The static-parameter sentence goes"
ROUTEA = "positions:The exclusion rule stays and the tower is flat"
ANYINT = "positions:AnyIntegral's closure and how the checker reads comprises"
COMPRISES = "positions:The comprises passages read at the level of values"
RANGES = "positions:Scalar ranges are over ZZ32 only"
MODEL = "positions:The model's text is the notation"
COUNTP = "positions:The checker count is measured, never red"
MAYBE = "positions:Maybe's empty case"
MIXED = "positions:Mixed widths convert by declared coercions"
EXT = "doc:research/extracts/ParkPOPL2019-extract.md#"
L9 = "doc:explorations/coordinator/PLAN.md#Climb batch 9, listed for his review@"
ANS = "doc:explorations/coordinator/PLAN.md#Pavol's answers, in the order they are needed@"
B8R = "doc:explorations/reviews/batch-8-review.md#"
TRIAGE = "doc:explorations/perf-probes/prelude/distance-triage.md#2.2 The component bodies' type errors (982 / 652), broken down"

W_BRIEFING = [
  (STD, "The text is the standard: walk refuses at load what the overloading chapter refuses, rows 544 and 534 among it, and loads what it allows."),
  (ANSWER9, "Walk chooses and checks at load on declared domains; your two checks join that load check and change no choice of declaration."),
  (COMPRISES, "The Meet Rule's covering declarations and its closed-trait case: a set that covers the meet satisfies it, and your check must accept it."),
  (PIR, "Row 588's rule, the intersection of the upper bounds and never Bottom; under P1, the decision the judgement reads for an F-bounded parameter."),
  (BOUND, "The implicit bound Any, which the naked-Any restriction does not reach: only a bound written Any counts."),
  (CONV, "No change of yours may alter which declaration runs for a set walk loads today."),
  (SUMP, "Why a clause form writes its static argument today; walk taking an unwritten one is the later work P1 decides, yours only under P1."),
  (DEMOS, "R10's read, which you make only under P1: each demo run once, its verdict and first error line, none edited."),
  (SPECREC, "Why the inference chapter's box on walk, the reductions callout and their Appendix I entries change with your rung."),
  (S1, "The form of your text changes: each box revised in place as a revision callout, the Appendix I entries updated."),
  (VERDICT, "Each refusal at load is asserted with the key batch 9 built, a Name.test beside the program, as the gated expected failures already are."),
  (TESTP, TESTF),
  (NOTWICE, TWICE),
  (REVSTOP, STOPS),
  ("ledger:544", "Your first repair: walk applies the Meet Rule for Functional Methods per providing type at load; promote its gated expected failure."),
  ("ledger:534", "Your second repair: the restriction on a single parameter written bounded by Any, as checkBoundAny applies it; promote its gated expected failure."),
  ("ledger:588", "Your third repair: a parameter an argument bounds only from above takes that upper end, not Bottom; promote its gated expected failure."),
  ("ledger:584", "The checker skips symbolic operators, so String's families never met this rule; if your check refuses a library type at load, that is the stop."),
  ("ledger:585", "String's four symbolic families, item 38, Pavol's: leave their shape; a refusal of them at load is a stop, not a library edit."),
  ("ledger:425", "The checker's side of the unwritten reduction: since batch 8 it takes the bound; correct the callout's sentence that says BottomType."),
  ("ledger:424", "The erasure of an F-bounded parameter to Bottom, SUM with nothing written and the walk smoke test: yours only under P1."),
  ("ledger:555", "Its F-bounded form waits for P1 as row 424's half does; yours only under P1."),
  ("ledger:591", "Several bounds walk cannot meet: Pavol's question, its expected failure kept; not yours."),
  ("ledger:592", "Decision D3, a departure kept and listed for Pavol; your repairs leave it as it is."),
  (L9 + "D5's reach", "D5's reach and the pin the review owes: a plain test of loneS and loneT over the two argument lists, and a row naming the open question."),
  (L9 + "Decision D2 of climb batch 9's rung W", "D2, a big operator's static parameters kept at BottomType; under P1 the judgement reads it beside the F-bounded case."),
  ("doc:explorations/compile-ladder/rung-walk-instance/decision-record.md#D5", "Why a lone parameter whose bound mentions a static parameter keeps the arguments' supertype; the reach your pin records."),
  ("doc:Specification/advanced/overloading.tex#Meet Rule", "The Meet Rule for Functional Methods per providing type, covering declarations among it: what your load check enforces."),
  ("doc:Specification/advanced/overloading.tex#Principles of Overloading", "The restriction on a single naked type parameter, stated against a written Any, and its callout: row 534's text."),
  ("doc:Specification/basic/inference.tex#The Static Arguments of a Call", "The rule and the box on the interpreter that names row 588, which you revise; the chapter's second box and Appendix I's entry you open in the file at the lines your section names, and under P1 the boxes that name rows 424 and 555's case."),
  ("doc:Specification/appendices/changes.tex#Reductions whose element type nothing fixes", "Its sentence that both implementations take BottomType: the checker's half false since batch 8, walk's under P1."),
  ("doc:Specification/basic/expressions/reductions.tex#Summations and Other Reduction Expressions", "The reductions callout with the same sentence; correct the checker's half, and under P1 walk's."),
  (EXT + "4.2 The dynamic choice", "The paper's solving step, the intersection of the upper bounds; row 588's upper end is that bound."),
  (EXT + "8. Bearing on the decisions on record@F-bounded functions", "Why an F-bounded parameter is outside the paper: why that half waits for P1."),
  ("code:" + OVF + "#public synchronized boolean finishInitializingSecondPart(", "Walk's load check of an overload set: where a set is refused, and where your two checks can join it."),
  ("code:" + OVF + "#static private boolean overlapCovered(", "The cover through declarations below both, which leaves out functional methods; their Meet Rule is the one you add."),
  ("code:" + TC + "/OverloadingChecker.scala#private def functionalMethodsAtOnePosition(", "The checker's Meet Rule for functional methods per providing type, the precedent for row 544 under walk."),
  ("code:" + TC + "/OverloadingChecker.scala#private def checkBoundAny(", "The checker's restriction on a naked type parameter written bounded by Any, the precedent for row 534 under walk."),
  ("code:" + EV + "/EvaluatorBase.java#private static ArrayList<FType> instanceOf(", "Walk's instance of each static parameter: row 588's lower end where the upper end is the answer, and D2's big operators."),
  ("code:" + EV + "/EvaluatorBase.java#public static Simple_fcn inferByUnification(", "Walk's unification; the recheck that erases a self-typed parameter to Bottom, P1's place, follows it in the file."),
  ("Walk's load check reads a generic declaration beside a plain one on declared domains", "What batch 7b and 9 built at load, the overlap reading and its limits; your checks sit beside it."),
  ("Walk checks at load the comprises clauses of the program's main component", "Batch 9's closure check and the key that gates a refusal at load, your tests' mechanism."),
  ("The compiled checker judges two functional methods by the Meet Rule for Functional Methods", "What the checker refuses per providing type; walk refuses the same at load after your rung."),
  ("Under walk, a type parameter that nothing at a call fixes takes its declared bound", "Batch 9's rung W, the rule your row 588 repair completes and P1's half extends."),
  ("The compiled checker instantiates a type parameter that nothing at a call fixes", "The checker's half, the upper bound where an argument bounds a parameter only from above; the other path to compare."),
  ("Three heaps run the interpreter", "A gated test can pass at two heaps and die at the third; run your tests through the harness."),
  ("testSystem's four shards are one suite split by sorted index", "Your new tests move the shards; the gate compares their sum."),
  ("ant compileAll deletes a tracked file", "Restore default_repository/caches/global.map after every ant compileAll."),
  ("map:README.md#Touch this@interpreter/", "What a walk edit moves and what guards it."),
]
W_CHECKS = [
  STD, ANSWER9, COMPRISES, PIR, BOUND, CONV,
  "ledger:544", "ledger:534", "ledger:588", "ledger:584", "ledger:424",
  L9 + "D5's reach",
  "doc:Specification/advanced/overloading.tex#Meet Rule",
  "doc:Specification/advanced/overloading.tex#Principles of Overloading",
  "doc:Specification/basic/inference.tex#The Static Arguments of a Call",
  "code:" + TC + "/OverloadingChecker.scala#private def functionalMethodsAtOnePosition(",
  "code:" + TC + "/OverloadingChecker.scala#private def checkBoundAny(",
]

C_BRIEFING = [
  (STD, "The text is the standard: each repair makes the checker give what its section gives, and a crash becomes the error or the check the text gives."),
  (LATE, "Where the implementers' code names a type the text does not, as the varargs type, their later word weighs; the text gets a callout, not a rewrite."),
  (PIR, "Row 593 under the inference rule: a lone parameter the arguments fix takes the narrowest candidate its bounds permit, not the bound."),
  (CONV, "The checker's inference with coercion and promotion and its order of attempts, which row 593's repair leaves as it is for every other call."),
  (ANSWER9, "The checker's overloading rules as batch 7b and 8 left them; row 574 is a message of that checker, nothing else of it yours."),
  (COMPRISES, "Closed families must be closed for the proof to hold; row 597's checker half reads an object expression against a clause."),
  (ANYINT, "The 2012 reading of a comprises clause, everyKnownSubtypeListed, which an object expression must meet as a declared object does."),
  (ROUTE, "No declaration goes into the compiler's prelude, and no library file is edited to route round a checker defect."),
  (VERDICT, "Each repaired defect is asserted by a compiled test with the harness's own keys."),
  (COUNTP, "The count and the distance are reported and never red; your checker edit moves both, and a crash repaired unmasks errors."),
  (SPECREC, "Why the varargs passage and Appendix I's closed-trait Effect change with your rung."),
  (S1, "The form of your text changes: a revision callout at the passage and an Appendix I entry."),
  (TESTP, TESTF),
  (NOTWICE, TWICE),
  (REVSTOP, STOPS),
  ("ledger:563", "The abstract-method capture: your first repair, by row 561's renaming before instantiation; promote its gated expected failure."),
  ("ledger:561", "The renaming the overloading checker already does for the same capture, the precedent for row 563."),
  ("ledger:593", "A lone parameter instantiated at its bound when another's bound mentions it; promote its gated pair."),
  ("ledger:604", "The checker's varargs, three faces: none, five or six arguments, and the body's type; promote its gated test and add the others."),
  ("ledger:605", "A naked field reference read as the inherited getter; promote its gated test."),
  ("ledger:574", "The message that drops the first element of the domain; repair it as the per-provider meet drops self, with a test of the message."),
  ("ledger:597", "Neither path reads an object expression against a comprises clause; the checker's half is yours, walk's is not."),
  ("ledger:572", "Abstract and concrete functional methods from two traits: three ways for Pavol; not yours."),
  ("ledger:425", "The checker's unwritten big operator: not yours; it shows what the bound rule does to a reduction."),
  ("ledger:560", "Its second part, item 36's expected type in four contexts, is a later checker rung's; not yours."),
  (L9 + "as the compiled checker's varargs (row 604)", "The ten string sites left as the checker's varargs, the stop batch 9's rung S met: your repair is theirs."),
  ("doc:Specification/basic/functions.tex#Function Declarations", "A varargs binding and its parameter's type, HeapSequence, which no library declares; the passage your callout revises."),
  ("doc:Specification/basic/functions.tex#Function Applications", "When a parameter list with a varargs binding is applicable: none, five or six arguments among it."),
  ("doc:Specification/basic/objects.tex#Field Declarations", "A naked field reference inside an object reads the field: row 605's text."),
  ("doc:Specification/basic/traits.tex#Trait Declarations", "What a comprises clause asks of every type that explicitly extends the trait, an object expression among them."),
  ("doc:Specification/basic/inference.tex#The Static Arguments of a Call", "The rule row 593 breaks: a type parameter that is the whole type of parameters takes the narrowest candidate its bounds permit."),
  ("doc:Specification/appendices/changes.tex#The traits that extend a closed trait", "Its Effect's sentences on the checker, which row 597's repair changes; the interpreter's stay."),
  ("code:" + TC + "/AbstractMethodChecker.scala#private def checkObjectDeclaration(", "Where row 563's replacer is applied to the method's own domain."),
  ("code:" + TC + "/AbstractMethodChecker.scala#private def checkObjectExpression(", "The object expression's check, commented out, and the team's plan to lift object expressions: row 597's place."),
  ("code:" + TC + "/impls/Functionals.scala#def checkApplicableWithCoercion(", "The coercion attempt's candidates, the parameter's upper bounds among them: row 593's first place to look."),
  ("code:" + TC + "/OverloadingChecker.scala#private def withoutSelf(", "How the per-provider meet drops self at its position, the precedent for row 574's message."),
  ("code:" + TC + "/TypeHierarchyChecker.scala#private def everyKnownSubtypeListed(", "The clause check for declared types, the precedent for an object expression."),
  ("code:" + SRC + "/compiler/Types.java#public static final TraitType makeVarargsParamType(", "The team's varargs parameter type, an ImmutableArray of T, with no caller: the body type row 604 needs."),
  ("code:" + SRC + "/nodes_util/NodeUtil.java#public static Type getParamType(Param p)", "Where a varargs parameter's type is built as a varargs tuple: row 604's first place to read."),
  ("code:" + EV + "/values/NonPrimitive.java#private Environment buildEnvFromParams(", "Walk binds a varargs parameter to the library's immutable array factory: the run-time value your type must hold."),
  ("The compiled checker instantiates a type parameter that nothing at a call fixes", "Batch 8's rung I, the bound rule and its order of attempts; your row 593 repair sits beside it."),
  ("The compiled checker infers a generic's static arguments with coercion", "Batch N's inference with coercion and promotion, which row 593's candidates belong to."),
  ("The compiled checker judges two functional methods by the Meet Rule for Functional Methods", "Batch 8's rung O, its capture fix the precedent for row 563, its per-provider meet for row 574."),
  ("The compiled checker reads a comprises clause as the 2012 texts do", "The checker's reading an object expression must meet, the generic child eligible when every known type is listed."),
  ("The XXX expected-failure mechanism in compiler_tests/ and library_tests/", "How your gated expected failures go red and how you promote them."),
  ("An XXX compile test pinned by compile_err_contains whose program compiles", "Why row 597's over-acceptance has no XXX test until the refusal exists."),
  ("A thrown CompilerError takes a third path through the test harness", "How a test keys on a crash, for the crash rows' programs."),
  ("The checker-count and distance stages read only the compiler's phases", "What your stages read: your checker edit moves both."),
  ("The true distance to the switch-over", "The distance and its four crash rows, your before; read the after by class through the per-site list."),
  ("ant compileAll deletes a tracked file", "Restore default_repository/caches/global.map after every ant compileAll."),
  ("map:README.md#Touch this@scala_src/typechecker/", "What a checker edit moves and what guards it."),
]
C_CHECKS = [
  STD, LATE, PIR, CONV, ANSWER9, COMPRISES, ANYINT,
  "ledger:563", "ledger:593", "ledger:604", "ledger:605", "ledger:574", "ledger:597",
  "doc:Specification/basic/functions.tex#Function Declarations",
  "doc:Specification/basic/functions.tex#Function Applications",
  "doc:Specification/basic/objects.tex#Field Declarations",
  "doc:Specification/basic/inference.tex#The Static Arguments of a Call",
  "code:" + SRC + "/compiler/Types.java#public static final TraitType makeVarargsParamType(",
]

G_BRIEFING = [
  (LIBP, "Each slip repaired the way the library writes the same thing elsewhere: a declared type to what its body answers, a static argument written, never a cast."),
  (ROUTE, "No declaration goes into the compiler's prelude; the one library alone."),
  (MODEL, "No line of the model or its vocabulary."),
  (ROUTEA, "Every device states a meet the exclusion rule reads; none states an exclusion false of a library type."),
  (SUMP, "The reductions as answer 7 left them: SUM and PROD over the algebra, MIN and MAX with no identity; your repairs keep that shape."),
  (MAYBE, "Maybe's empty case is Nothing of T, the team's spelling; the MB sites are Just and Nothing that must join to Maybe."),
  (BOUND, "The implicit bound Any, which declares no method; Object declares asString and asDebugString."),
  (COUNTP, "The count and the distance are reported and never red; your test is both stages, read by class."),
  (TESTP, TESTF),
  (REMEASURE, GATE_BEFORE),
  (REVSTOP, STOPS),
  ("ledger:433", "Six sites in your section that wait for where clauses: SumReduction's distribute pair and the fusion pairs; leave them."),
  ("ledger:563", "NoReductionPair's generate is the checker's capture, rung C's; leave that object."),
  ("ledger:488", "Big operators' sites can move with no edit; BIG MIN's site is one, so read a move there before you claim it."),
  ("ledger:577", "The class rows misfile moved lines: read your after through the per-site list mapped through your diff."),
  ("ledger:560", "Item 36's typecase branch sits in your section; not yours, leave it."),
  ("ledger:425", "The checker's unwritten big operator, P1's checker side: not yours."),
  (TRIAGE, "The classes your sites fall in, with their causes: D1, MB, BR, GB and the residue."),
  ("doc:Specification/basic/expressions/reductions.tex#Summations and Other Reduction Expressions", "What a reduction desugars to and the callout on its static argument; your reduction repairs keep both."),
  ("code:Library/FortressLibrary.fss#trait Condition[", "Condition's cond with a Just and a Nothing branch: three of your MB sites and three more beside them."),
  ("code:Library/FortressLibrary.fss#trait AssociativeReduction[", "AssociativeReduction's simpleJoin at Any, which eight reduction objects implement at their own types: your D1 sites."),
  ("code:Library/FortressLibrary.fss#object MinReduction[", "One of the eight: its simpleJoin at T beside the trait's at Any."),
  ("code:Library/FortressLibrary.fss#trait Generator2[", "The generators of generators, most of whose sites are names the static type's api lacks."),
  ("code:Library/FortressLibrary.fss#object SimpleMappedIndexed[", "A new object at a meet exported from the api, a device of the library's own; one of your sites is in it."),
  ("The one library's Meet Rule pairs inside one type are repaired by declarations on the meet", "Batch 8's rung M's devices and one-line slips, your precedent."),
  ("The one library's range types provide a declaration on the meet", "Batch 9's rung R's slips repaired to what their bodies answer, your precedent."),
  ("The string components' slips are repaired in the library's own spelling", "Batch 9's rung S's names and declared types, your precedent."),
  ("The checker-count and distance stages read only the compiler's phases", "What your stages read and what they cannot see."),
  ("The true distance to the switch-over", "The distance stage your repairs move; read it by class through the per-site list."),
  ("Every functional-method name of the library is reserved", "A new name can collide with a program's own; choose names the library already uses."),
  ("testSystem's four shards are one suite split by sorted index", "Your new test moves the shards; the gate compares their sum."),
  ("map:README.md#Touch this@Library/FortressLibrary.fss", "What a library edit moves: walk, the stages and the commit stage's PDF."),
  ("index:reduction", "The notes on file on reductions; open those your repairs touch."),
]
G_CHECKS = [
  LIBP, ROUTEA, SUMP, MAYBE,
  "ledger:433", "ledger:563", "ledger:488",
  TRIAGE,
  "code:Library/FortressLibrary.fss#trait AssociativeReduction[",
  "code:Library/FortressLibrary.fss#trait Condition[",
  "The one library's Meet Rule pairs inside one type are repaired by declarations on the meet",
]

N_BRIEFING = [
  (PIR, "Item 20 answered in its last sentence: the three written Object bounds go, each back to the team's text before de22fd928; yours to build."),
  (BOUND, "With the written Object gone the implicit bound is Any, whose instance where () is expected is ()."),
  (LIBP, "Each slip repaired the way the library writes the same thing elsewhere: a declared type to what its body answers, never a cast."),
  (STD, "The text settles rows 590 and 602: MatchFailure is unchecked, and an object defines every abstract method it inherits."),
  (RANGES, "Scalar ranges are over ZZ32; partition's api says so, and StridedFullRange3D keeps it."),
  (MIXED, "How mixed widths convert, the numeric slips' standard: by declared coercions, the narrowest type both sides coerce into."),
  (ROUTEA, "Every device states a meet the exclusion rule reads; none states an exclusion false of a library type."),
  (ROUTE, "No declaration goes into the compiler's prelude; the one library alone."),
  (MODEL, "No line of the model or its vocabulary."),
  (COUNTP, "The count and the distance are reported and never red; your test is both stages, read by class."),
  (TESTP, TESTF),
  (REMEASURE, GATE_BEFORE),
  (REVSTOP, STOPS),
  ("ledger:560", "Its first part, 18 sites, is the drop's, yours; its second part, item 36's 11, is a later checker rung's and stays."),
  ("ledger:590", "MatchFailure checked in the library and unchecked in the text and the compiler library: yours, with its gated test to promote."),
  ("ledger:602", "StridedFullRange3D's missing shifts: yours, the repair the gather measured, with its gated test to promote."),
  ("ledger:582", "isLeftZero in your section: Pavol's choice; leave it."),
  ("ledger:425", "List's comprehension and strToInt's reduction are its class: not yours."),
  ("ledger:577", "The class rows misfile moved lines: read your after through the per-site list mapped through your diff."),
  (ANS + "rung B wrote, as decided", "Item 20's history: why rung B wrote the bounds and why the instance rule makes them harmful; now answered."),
  (ANS + "pass an expected type to a call", "Item 36: the 11 sites that stay after the drop, and why; not yours."),
  (B8R + "2. The bodies' kind, 386 to 404, and whether rung I's refusals are in the spirit", "The 29 refusals, the 18 the drop clears and the 11 item 36 holds."),
  ("doc:Specification/basic/expressions/typecase.tex#Typecase Expressions", "MatchFailure, an unchecked exception: row 590's text."),
  ("doc:Specification/basic/objects.tex#Object Declarations", "An object declaration defines every abstract method it inherits: row 602's text."),
  ("doc:Specification/basic/trait-parameters.tex#Type Parameters", "The implicit bound Any of a type parameter declared without one, which the drop gives back."),
  (TRIAGE, "The classes your sites fall in, with their causes: G1, R4, I2, I3, X1 and the residue."),
  ("code:Library/FortressLibrary.fss#Shouldn't these operators have to extend something..(a1 CMP a2) LEXICO: (b1 CMP b2) LEXICO: (c1 CMP c2)", "The tuples' comparisons with unbounded A, B and C under the team's own comment: 17 of your G1 sites."),
  ("code:Library/FortressLibrary.fss#trait LexicographicOrder[", "a CMP b on an unbounded E, the 18th G1 site; List extends this trait at every element type."),
  ("code:Library/List.fss#object ArrayList[", "ArrayList, ten of your List sites."),
  ("code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object UnsignedLong", "UnsignedLong's getters declared UnsignedLong and answering NN64: two of your sites."),
  ("code:Library/FortressLibrary.fsi#object MatchFailure", "The one library's declaration, row 590."),
  ("code:Library/CompilerLibrary.fsi#object MatchFailure", "The compiler library's declaration, unchecked: row 590's precedent."),
  ("code:Library/RangeInternals.fss#object StridedFullRange2D(", "StridedFullRange2D's shifts, row 602's precedent for the rank-3 object."),
  ("code:Library/Writer.fsi#object BufferedWriter", "The api's constructor header the component's parameters do not match: Writer's export site."),
  ("The written bound Object on the three result-only parameters", "What rung B's bounds bought under the old solver; the drop undoes them."),
  ("The compiled checker instantiates a type parameter that nothing at a call fixes", "Why the bounds are harmful now: the instance under Object where () is expected."),
  ("The one library's number tower is flat", "The numeric types your slips sit in, siblings under Number each with its own algebra."),
  ("The one library's Meet Rule pairs inside one type are repaired by declarations on the meet", "Batch 8's rung M's devices and one-line slips, your precedent."),
  ("The string components' slips are repaired in the library's own spelling", "Batch 9's rung S's names and declared types, your precedent."),
  ("The checker-count and distance stages read only the compiler's phases", "What your stages read and what they cannot see."),
  ("The true distance to the switch-over", "The distance stage your repairs move; read it by class through the per-site list."),
  ("Every functional-method name of the library is reserved", "A new name can collide with a program's own; choose names the library already uses."),
  ("testSystem's four shards are one suite split by sorted index", "Your new tests move the shards; the gate compares their sum."),
  ("map:README.md#Touch this@Library/FortressLibrary.fss", "What a library edit moves: walk, the stages and the commit stage's PDF."),
]
N_CHECKS = [
  PIR, BOUND, LIBP, STD, RANGES, ROUTEA,
  "ledger:560", "ledger:590", "ledger:602", "ledger:582",
  ANS + "rung B wrote, as decided",
  "doc:Specification/basic/expressions/typecase.tex#Typecase Expressions",
  "doc:Specification/basic/objects.tex#Object Declarations",
  "code:Library/FortressLibrary.fss#Shouldn't these operators have to extend something..(a1 CMP a2) LEXICO: (b1 CMP b2) LEXICO: (c1 CMP c2)",
  "code:Library/CompilerLibrary.fsi#object MatchFailure",
]

IDS = 'WCGN'
BRIEFINGS = {'W': W_BRIEFING, 'C': C_BRIEFING, 'G': G_BRIEFING, 'N': N_BRIEFING}
CHECKS = {'W': W_CHECKS, 'C': C_CHECKS, 'G': G_CHECKS, 'N': N_CHECKS}
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
            probs = [l for l in lines if 'not one' in l or 'NOT FOUND' in l or 'no match' in l.lower()]   # not 'nothing': titles hold the word
            total = [l for l in lines if l.startswith('Total')]
            print(rid, name, 'keys', len(keys), 'exit', r.returncode, '|', total[0] if total else r.stderr.strip()[:200])
            for l in probs: print('   PROBLEM', l[:300])
            if r.returncode or probs:
                bad += 1
                if os.environ.get('VERBOSE'): print(r.stdout)
    print('bad lists', bad)
    sys.exit(1 if bad else 0)
