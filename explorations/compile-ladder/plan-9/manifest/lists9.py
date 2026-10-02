# The briefing and checks lists of climb batch 9's four rungs, W, K, R and S (CLIMB-BATCH-9.md, section 3), in batch
# 8's form (explorations/compile-ladder/plan-8/manifest/lists8.py). Each briefing entry is a pair: its facts-extract.sh
# key and one line on why it is there and what the rung does with it, naming what to take from the entry and what to
# check in the rest. gen9.py renders the lines at the end of each rung's tail, in the order of the briefing. A checks
# list is a sub-list of its briefing's keys. POSITIONS.md and FACTS.md entries are keyed by their bold titles, which
# survive the consolidations. `python3 lists9.py` checks every key with facts-extract.sh --check (each must match
# exactly one place) and every reason's form; it is run again on the tree the batch is cut from.
SRC = 'ProjectFortress/src/com/sun/fortress'
EV = SRC + '/interpreter/evaluator'
OVF = EV + '/values/OverloadedFunction.java'
FT = SRC + '/tests/unit_tests/FileTests.java'

STOPS = "Every stop reserved for Pavol is reversible: finish, list it in stopsMet with liftedBy citing this entry, and land."
GATE_BEFORE = "Your before is the last landed gate's tables (batch 8's), not a run of the stage on your unchanged base; run only the after, into tmp/."
TESTF = "Write the core problem as a clean minimal test first, see it fail through the harness, commit it alone; your skeptic reads that order in your transcript and builds nothing."
TWICE = "One build per code state and one whole-suite run after your last edit; your skeptic reads your run and your tables, and builds and re-runs nothing."

PIR = "positions:A type parameter the arguments do not fix"
BOUND = "positions:The implicit bound of an unbounded type parameter"
WALKCO = "positions:Walk chooses coercions on the value, for now"
CONV = "positions:Conversions never change which declaration runs"
SUMP = "positions:SUM and PROD without the Number catch-all"
DEMOS = "positions:The team demos that write no static argument"
SPECREC = "positions:Every change to the specification is recorded with its reason"
S1 = "positions:The S1 form"
STD = "positions:The specification stays the standard"
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
REC = "doc:explorations/reviews/decisions-review/popl-recheck.md#"
EXT = "doc:research/extracts/ParkPOPL2019-extract.md#"
P2 = "doc:explorations/compile-ladder/plan-7b/probes/P2.md#"
B8R = "doc:explorations/reviews/batch-8-review.md#"
L8 = "doc:explorations/coordinator/PLAN.md#Climb batch 8, listed for his review@"
ANS = "doc:explorations/coordinator/PLAN.md#Pavol's answers, in the order they are needed@"

W_BRIEFING = [
  (PIR, "The rule you build under walk: the declared bound, never Bottom, for a parameter nothing fixes whose bound does not mention it; take its words and its Later sentence."),
  (BOUND, "The bound an unbounded parameter takes is Any; the bound walk must give a lone parameter whose arguments have no narrowest type."),
  (WALKCO, "Walk's limit, kept: you change an instance, never the coercion walk chooses on the value."),
  (CONV, "No change of yours may alter which declaration runs; only the instance it runs at."),
  (SUMP, "Why a clause form writes its static argument today, and why walk accepting an unwritten one is the later work P1 decides; not yours without P1."),
  (DEMOS, "R10's read of the demos, which you make only under P1's answer: run each once, report it, edit none."),
  (SPECREC, "Why the inference chapter's notes on walk change with walk in your rung."),
  (S1, "The form of your text changes: the note revised in place as a revision callout, the Appendix I entry updated."),
  (TESTP, TESTF),
  (NOTWICE, TWICE),
  (REVSTOP, STOPS),
  ("ledger:424", "The erasure to Bottom: its plain-bound half is yours; its F-bounded half, SUM with nothing written and the walk smoke test, only under P1's answer."),
  ("ledger:516", "The lone parameter's walk half is yours: the bound in place of the arguments' common supertype; promote its expected failure."),
  ("ledger:555", "The join of several minimal supertypes stops walk; the decision gives the bound, and its expected failure is yours to promote."),
  ("ledger:558", "The commented-out MatchFailure; the specification settles it, and its expected failure is yours to promote."),
  ("ledger:567", "Missing type R for a generic functional method of a generic trait; find where walk instantiates it, and promote its expected failure."),
  ("ledger:553", "The library's openRange reaches the typecase failure path; check it after row 558's change, and append a note."),
  ("ledger:425", "The checker's half of the unwritten reduction: not yours; it shows what the checker does for the case P1 decides."),
  (REC + "1.8 Row 447", "The paper's case against the Bottom binding and its line for a walk rung for row 424; the source your notes cite."),
  (REC + "1.9 Row 516", "The bound in place of the union for a lone parameter; the rule walk's candidates must follow."),
  (EXT + "4.2 The dynamic choice", "The paper's solving step, the intersection of the upper bounds; walk has no static return type, so only the declared bound."),
  (EXT + "8. Bearing on the decisions on record@F-bounded functions", "Why an F-bounded parameter is outside the paper: the reason that half waits for P1."),
  ("doc:Specification/basic/inference.tex#Type Inference", "The chapter whole: the two notes on the interpreter you revise, and the rule they describe walk against."),
  ("doc:Specification/appendices/changes.tex#The inference of a call's static arguments", "Its entry: revise its sentences on the interpreter to what walk then does, the F-bounded case named."),
  ("doc:Specification/basic/expressions/typecase.tex#Typecase Expressions", "The text row 558 follows: with no matching clause MatchFailure, an unchecked exception, is thrown."),
  ("code:" + EV + "/EvaluatorBase.java#public static Simple_fcn inferByUnification(", "Walk's unification of a call's static arguments; the recheck that erases a self-typed parameter to Bottom is here, and the bounding map beside it."),
  ("code:" + EV + "/EvaluatorBase.java#private static FType narrowest(", "Walk's candidates for a lone parameter, every supertype of each argument; the bound replaces the common supertype here."),
  ("code:" + EV + "/types/FType.java#public Set<FType> join(FType t2)", "The join that returns every minimal common supertype; row 555's crash starts here."),
  ("code:" + EV + "/types/TypeLatticeOps.java#public class TypeLatticeOps", "The lattice whose join calls bug on more than one; decide where the bound is taken, not here alone."),
  ("code:" + EV + "/Evaluator.java#public FValue forTypecase(Typecase x)", "The typecase evaluator with the team's throw commented out; row 558's one change."),
  ("Under walk, a generic call's static arguments are inferred with coercion", "What batch N's rung K built under walk, the promotion and the candidates your change sits on."),
  ("Walk chooses between a generic declaration and another on their declared domains", "Batch 7b's dispatch, which you leave as it is: which declaration runs does not change."),
  ("The specification gives the run-time instance of a dispatched declaration", "The text's bound for dispatch and for a lone parameter, which walk departs from until your rung."),
  ("The compiled checker instantiates a type parameter that nothing at a call fixes", "The checker's half as batch 8 built it, its refusal of an F-bounded parameter among it; the other path to compare."),
  ("A numeral's type depends on the path and on the library in scope", "Only x.one and the witness typecase produce a T in generic code; the witness is how your test sees the instance."),
  ("Three heaps run the interpreter", "A gated test can pass at two heaps and die at the third; run your tests through the harness."),
  ("testSystem's four shards are one suite split by sorted index", "Your new test moves the shards; the gate compares their sum."),
  ("ant compileAll deletes a tracked file", "Restore default_repository/caches/global.map after every ant compileAll."),
  ("map:README.md#Touch this@interpreter/", "What a walk edit moves and what guards it."),
  ("index:inference", "The notes on file on inference; open those your change touches."),
]
W_CHECKS = [
  PIR, BOUND, WALKCO, CONV,
  "ledger:424", "ledger:516", "ledger:555", "ledger:558", "ledger:567",
  REC + "1.8 Row 447", EXT + "4.2 The dynamic choice",
  "doc:Specification/basic/inference.tex#Type Inference",
  "doc:Specification/appendices/changes.tex#The inference of a call's static arguments",
  "doc:Specification/basic/expressions/typecase.tex#Typecase Expressions",
  "code:" + EV + "/EvaluatorBase.java#private static FType narrowest(",
]

K_BRIEFING = [
  (STD, "The text is the standard: walk refuses at load what the text refuses and loads what it allows."),
  (VERDICT, "The key is a mechanism of the interpreter suite, as compile_err_contains is of the compiled one: a value that matters is asserted in the test."),
  (ANSWER9, "Walk compares declarations on their declared domains and its load check reads a generic beside a plain one on them; your overlap reading widens that, nothing else."),
  (ANYINT, "The 2012 reading of a comprises clause your closure check follows, so AnyIntegral's clause stays accepted."),
  (COMPRISES, "Closed families must be closed for the proof to hold; walk trusting the clauses unchecked is row 551, yours."),
  (TESTP, TESTF),
  (NOTWICE, TWICE),
  (REVSTOP, STOPS),
  ("ledger:551", "Walk's unchecked closure: the repair is a closure check at load, as the checker reads a clause; yours, with a test by the key."),
  ("ledger:552", "The lifted load check's narrow overlap reading; its expected failure is yours to promote, the reading widened to every shape the row names."),
  ("ledger:534", "A naked type parameter with a written bound Any beside an overload: give it a home-2 test with the key, not its repair."),
  ("ledger:544", "The Meet Rule for functional methods under walk: a home-2 test with the key; its repair waits for rung R's meets, since it would refuse the library."),
  ("ledger:549", "A generic beside a plain declaration with equal domains: a home-2 test with the key; its repair is the rung that settles duplicate domains."),
  ("ledger:550", "The lift's return-type limit, row 552's neighbour; not yours, keep its verdict."),
  ("ledger:22", "Walk never checking a comprises clause: your closure check covers its program; append a note."),
  ("ledger:487", "The checker's hole across components; walk's check at load sees the whole program, so say what it refuses there."),
  ("doc:explorations/reviews/batch-7b-review.md#Findings@cannot gate", "Why the key: a program walk wrongly loads fails on its call today and still would once refused, so its XXX file can never go red."),
  ("doc:Specification/advanced/overloading.tex#Declarations with Static Parameters", "The rules for a generic beside a plain declaration that your widened overlap reading follows."),
  ("doc:Specification/advanced/overloading.tex#Meet Rule", "The Meet Rule for Functional Methods, row 544's refusal, which your home-2 test asserts."),
  ("doc:Specification/advanced/overloading.tex#Subtype Rule", "The strict subtype the rule asks for, row 549's refusal, which your home-2 test asserts."),
  ("code:" + OVF + "#static private boolean genericOverlapCovered(", "The overlap reading row 552 narrows to whole parameter types with one bound; widen it here."),
  ("code:" + OVF + "#static private boolean validOnDeclaredDomains(", "Batch 7b's lift on declared domains that calls the overlap reading; its precedent and its limits."),
  ("code:" + OVF + "#static private List<Set<FType>> overlapPieces(", "The overlap covered through comprises clauses walk trusts unchecked; the closure check makes that trust sound."),
  ("code:" + EV + "/BuildEnvironments.java#public void finishTrait(", "Where walk records a comprises clause at load; one place your closure check can read it."),
  ("code:" + SRC + "/scala_src/typechecker/TypeHierarchyChecker.scala#private def everyKnownSubtypeListed(", "The checker's 2012 reading of a closed trait's generic child, the precedent your walk check follows."),
  ("code:" + FT + "#protected String generalTestFailed(String pfx", "The compiled harness's keys, the precedent for the key you give the interpreter's."),
  ("code:" + FT + "#public abstract static class SourceFileTest", "How a file of tests/ is judged today, by a throw alone; where your key is read."),
  ("Walk's load check reads a generic declaration beside a plain one on declared domains", "What batch 7b built at load, the overlap reading and its limits; your widening sits on it."),
  ("The compiled checker reads a comprises clause as the 2012 texts do", "The checker's reading your walk check must agree with, the generic child eligible when every known type is listed."),
  ("The specification reads a comprises clause as the later Types chapter does", "The text your closure check enforces at load."),
  ("The compiled checker judges two functional methods by the Meet Rule for Functional Methods", "What the checker refuses per providing type; row 544's home-2 test asserts walk's refusal of the same."),
  ("An XXX compile test pinned by compile_err_contains whose program compiles", "The compiled harness's limit for an over-acceptance; design your key so an XXX file goes red when the refusal appears."),
  ("The XXX expected-failure mechanism in compiler_tests/ and library_tests/", "How expected failures gate on the compiled side; the model for yours."),
  ("testSystem's four shards are one suite split by sorted index", "Your new tests move the shards; the gate compares their sum."),
  ("ant compileAll deletes a tracked file", "Restore default_repository/caches/global.map after every ant compileAll."),
  ("map:README.md#Touch this@interpreter/", "What a walk edit moves and what guards it."),
  ("index:comprises", "The notes on file on comprises clauses; open those your closure check touches."),
]
K_CHECKS = [
  STD, VERDICT, ANSWER9, ANYINT, COMPRISES,
  "ledger:551", "ledger:552", "ledger:534", "ledger:544", "ledger:549",
  "doc:Specification/advanced/overloading.tex#Declarations with Static Parameters",
  "code:" + OVF + "#static private boolean genericOverlapCovered(",
  "code:" + SRC + "/scala_src/typechecker/TypeHierarchyChecker.scala#private def everyKnownSubtypeListed(",
  "code:" + FT + "#protected String generalTestFailed(String pfx",
  "The compiled checker reads a comprises clause as the 2012 texts do",
]

R_BRIEFING = [
  (LIBP, "Each pair's device is the library's: a declaration on the meet where a type provides both; each slip repaired to what its body and callers already do."),
  (ANSWER9, "The checker applies the Meet Rule for Functional Methods per providing type, so these pairs are what the text asks of the library."),
  (ROUTEA, "Every device states a meet the exclusion rule reads; none states an exclusion false of a library type."),
  (RANGES, "Scalar ranges are over ZZ32 and the public range traits stay generic in their index type; your devices keep both."),
  (ROUTE, "No declaration goes into the compiler's prelude; the one library alone."),
  (MODEL, "No line of the model or its vocabulary."),
  (COUNTP, "The count and the distance are reported and never red; your test is both stages, read by class."),
  (TESTP, TESTF),
  (REMEASURE, GATE_BEFORE),
  (REVSTOP, STOPS),
  ("ledger:580", "A numeral IN a range refused: the same IN pair as three of your sites, met from the call side; a declaration on FullRange's meet serves both."),
  ("ledger:583", "The full sequential ranges' map needs a type below both; the library's precedent is a new object at the meet exported from the api."),
  ("ledger:586", "UniformDistribution's lower and upper on a FullRange: its gated walk test is yours to promote where your repair lands."),
  ("ledger:569", "The meet compared without self wherever it sits: why a declaration on the meet clears an IN pair with self second."),
  ("ledger:577", "The class rows misfile moved lines: read your after through the per-site list mapped through your diff."),
  ("ledger:582", "isLeftZero, Pavol's choice: not yours, leave it."),
  ("ledger:560", "Three of its sites sit in your files and are item 36's, not yours; leave them."),
  (L8 + "58 sites in the apis", "The per-provider pairs rung O's check finds, type by type: your list of CAP and IN pairs."),
  (B8R + "1. The Meet Rule class: 103 to 99, though the rule cleared what it was meant to", "Why the 95 are real library gaps by the text's own rule, and that they are rung M's kind of work."),
  (P2 + "2. The devices and what each clears", "P2's devices; M, a declaration on the meet, is yours for these pairs."),
  ("doc:Specification/advanced/overloading.tex#Meet Rule", "The rule your declarations satisfy: a type that provides both functional methods provides their meet."),
  ("code:Library/FortressLibrary.fsi#trait BoundedRange[", "BoundedRange's CAP, one side of the 64 CAP pairs."),
  ("code:Library/FortressLibrary.fsi#trait FullRange[", "FullRange, providing Range's and Generator's IN with no meet: row 580's place."),
  ("code:Library/RangeInternals.fsi#trait ScalarRange extends", "ScalarRange's CAP, the other side of 12 CAP pairs, and the scalar range types below it."),
  ("code:Library/RangeInternals.fsi#trait Range2D", "Range2D's two CAP and its IN, the other side of the 2D pairs; Range3D's are its twins."),
  ("code:Library/FortressLibrary.fss#object SimpleMappedIndexed[", "A new object at a meet exported from the api: row 583's precedent."),
  ("code:Library/Random.fss#object UniformDistribution", "Row 586's object; its parameter or its bodies are the repair."),
  ("The one library's scalar ranges are over ZZ32 alone", "How batch 7R left the ranges, the shape your devices keep."),
  ("The compiled checker judges two functional methods by the Meet Rule for Functional Methods", "The per-provider check that finds your pairs, and what it reads in an api and a component."),
  ("The one library's Meet Rule pairs inside one type are repaired by declarations on the meet", "Batch 8's rung M's devices and slips, your precedent."),
  ("The checker-count and distance stages read only the compiler's phases", "What your stages read and what they cannot see, Random.fss among it."),
  ("The true distance to the switch-over", "The distance stage your devices move; read it by class through the per-site list."),
  ("Every functional-method name of the library is reserved", "A new name can collide with a program's own; choose names the library already uses."),
  ("testSystem's four shards are one suite split by sorted index", "Your new test moves the shards; the gate compares their sum."),
  ("The interpreter's overload-ambiguity message names its two declarations", "The ambiguity message's order is not the program's; do not compare it verbatim."),
  ("map:README.md#Touch this@Library/FortressLibrary.fss", "What a library edit moves: walk, the stages and the commit stage's PDF."),
  ("index:ranges", "The notes on file on ranges; open those your devices touch."),
]
R_CHECKS = [
  LIBP, ANSWER9, ROUTEA, RANGES,
  "ledger:580", "ledger:583", "ledger:586",
  L8 + "58 sites in the apis",
  B8R + "1. The Meet Rule class: 103 to 99, though the rule cleared what it was meant to",
  P2 + "2. The devices and what each clears",
  "doc:Specification/advanced/overloading.tex#Meet Rule",
  "code:Library/FortressLibrary.fsi#trait BoundedRange[",
  "code:Library/FortressLibrary.fss#object SimpleMappedIndexed[",
]

S_BRIEFING = [
  (LIBP, "Each repair the way the library's other string types write it; a call the checker cannot type gets the declaration the library would write, never a cast."),
  (ROUTE, "No declaration goes into the compiler's prelude; the one library alone."),
  (MODEL, "No line of the model or its vocabulary."),
  (COUNTP, "The count and the distance are reported and never red; your test is both stages, read by class."),
  (BOUND, "Under Q1 = (1) only: with the written Object gone the implicit bound is Any, whose instance at () is ()."),
  (PIR, "Under Q1 = (1) only: why a written Object bound refuses a call where () is expected, and why dropping it is the repair."),
  (TESTP, TESTF),
  (REMEASURE, GATE_BEFORE),
  (REVSTOP, STOPS),
  ("ledger:585", "String's four symbolic families: item 38, Pavol's; leave their shape and bodies."),
  ("ledger:584", "The checker skips symbolic operators, so those families show on no table; not yours."),
  ("ledger:560", "Its first part is item 20, yours under Q1 = (1) only; its second part, item 36, is not yours."),
  ("ledger:316", "The compiler world's String, with self on the left only; context for String's declarations, not yours."),
  (ANS + "rung B wrote, as decided", "Item 20 read again: the three written bounds, now harmful; yours to drop under Q1 = (1) only."),
  (ANS + "symbolic operators", "Item 38: the four families' device is Pavol's question; you leave them."),
  (B8R + "2. The bodies' kind, 386 to 404, and whether rung I's refusals are in the spirit", "The 29 refusals, the 18 the drop clears and the 11 item 36 holds; read under Q1 = (1)."),
  ("doc:Specification/basic/objects.tex#Field Declarations", "A field declares a getter; why CatString's fields collide with String's getters of the same names."),
  ("code:Library/String.fss#object CatString(", "CatString's fields left and right, which the checker reads as String's getters."),
  ("code:Library/FortressLibrary.fsi#trait String extends", "String's api: its getters left and right, the first and last character, and its indices, a range with lower and upper."),
  ("code:Library/String.fss#object BalancingForest(", "add declared per kind of string and called with a String: one of your CV sites."),
  ("code:Library/Stream.fss#trait WriteStream", "print and println passing their varargs to writes over a Generator: another CV site."),
  ("code:Library/FlatString.fss#object FlatString extends", "FlatString's flatConcat and size; your sites in FlatString.fss."),
  ("The one library's Meet Rule pairs inside one type are repaired by declarations on the meet", "Batch 8's rung M's devices, String's juxtaposition among them; your precedent."),
  ("The checker-count and distance stages read only the compiler's phases", "What your stages read and what they cannot see."),
  ("The true distance to the switch-over", "The distance stage your repairs move; read it by class through the per-site list."),
  ("Every functional-method name of the library is reserved", "A new name can collide with a program's own; choose names the library already uses."),
  ("testSystem's four shards are one suite split by sorted index", "Your new test moves the shards; the gate compares their sum."),
  ("map:README.md#Touch this@Library/FortressLibrary.fss", "What a library edit moves: walk, the stages and the commit stage's PDF."),
  ("index:string", "The notes on file on strings; open those your repairs touch."),
]
S_CHECKS = [
  LIBP, ROUTE, MODEL, BOUND,
  "ledger:585", "ledger:560",
  ANS + "rung B wrote, as decided",
  "doc:Specification/basic/objects.tex#Field Declarations",
  "code:Library/String.fss#object CatString(",
  "code:Library/FortressLibrary.fsi#trait String extends",
]

IDS = 'WKRS'
BRIEFINGS = {'W': W_BRIEFING, 'K': K_BRIEFING, 'R': R_BRIEFING, 'S': S_BRIEFING}
CHECKS = {'W': W_CHECKS, 'K': K_CHECKS, 'R': R_CHECKS, 'S': S_CHECKS}
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
