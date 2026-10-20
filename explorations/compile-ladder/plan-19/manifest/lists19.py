#  The briefing and checks lists of climb batch 19's two rungs, P and S
# (CLIMB-BATCH-19.md, section 3), in batch 18's form (explorations/compile-ladder/plan-18/manifest/lists18.py) for
# the batch workflow (explorations/coordinator/process-engineering/batch-redesign.md, "The brief"): each list holds
# what the rung's section cites, the decisions, the ledger rows, the specification's sections, the notes and the
# code it rests on, and no process position or harness fact, which the brief's role text and the fortress-repo skill
# carry. POSITIONS and FACTS entries are keyed by their numbers. Each briefing entry is a pair: its facts-extract.sh
# key and one line on why it is there. A checks list is a sub-list of its briefing's keys, read by the skeptic, a
# repair round and a judge. The record's section 5, "The briefings", holds the same keys.
# `python3 -B lists19.py` checks every key with facts-extract.sh --check (each must match exactly one place) and every
# reason's form; it is run again on the tree the batch is cut from.
SRC = 'ProjectFortress/src/com/sun/fortress'
EV = SRC + '/interpreter/evaluator'
SC = SRC + '/scala_src'

CHG = "doc:Specification/appendices/changes.tex#"
ER = "doc:explorations/perf-probes/existential-reduction/REPORT.md#"
SO = "doc:explorations/perf-probes/symbolic-operators/REPORT.md#"
OVL = "doc:Specification/advanced/overloading.tex#Declarations with Static Parameters"
OF = "code:" + EV + "/values/OverloadedFunction.java#"

P_BRIEFING = [
  ("P-152", "The decision your rung builds: exclusion between two generic declarations read over the whole parameter type, on both paths, rows 740 and 741 closed."),
  ("P-45", "Walk reads a pair of generic declarations on its declared domains by the checker's rules, so that walk and the checker accept the same pairs."),
  ("P-26", "The type group's later word outweighs the early text: the paper of 2011 decides the reading, and the tint question leans on it."),
  ("P-148", "The decision every checker change follows: the count stage timed before and after, then a second pass that keeps every result."),
  ("F-238", "Walk's reading of two generic declarations over their own instances by the three rules; its sentence on row 740 becomes false."),
  ("F-252", "Walk's reading of a pair of functions with static parameters on their declared domains, with its limits, row 740 among them."),
  ("F-257", "The names of the rules in walk's refusals: the guard you add is keyed on the Meet Rule's."),
  ("F-26", "Walk chooses on declared domains; a generic trait's functional method is still compared on its instances, which your rung leaves."),
  ("ledger:740", "Your first row: two generic declarations whose parameter types exclude only together, refused by walk and by the checker."),
  ("ledger:741", "Your second row: the checker refuses a pair that excludes through a shared supertype's one instance; its tint pair stays and needs a row of its own."),
  ("ledger:759", "The pair the checker accepts and walk refuses, which the Appendix I entry you edit does not name: the text fix that goes with your edit."),
  ("ledger:539", "The Meet Rule's search that matches only some domains: the neighbour of your new branch in the same method."),
  ("ledger:159", "microGPT's old pair of this shape and the Diag workaround: the program walk refused, which now loads."),
  (ER + "1. In short", "The probe in one page: the algorithm, the two changes, the rows closed, the suites and stages unchanged."),
  (ER + "2. What the paper says, and the specification's passage", "The paper's rule and its gap where the constraint is False, and the specification's passage, narrower in one word."),
  (ER + "3. Walk: the change", "walk.patch's method and its two call sites, its tests and their failing and passing runs: your walk half."),
  (ER + "4. The compiled checker: the change", "checker.patch's emptyED beside reduceED, its tests and its runs, and the stages' tables equal: your checker half."),
  (ER + "5. Old against new, and whether the paths agree", "The eleven shapes on both paths before and after, and the one pair where the paths still disagree, tint."),
  (ER + "8. Decisions", "The probe's decisions and the ways not taken: the plain-declaration branch, the local exclusion test, the bounds left out, no speed pass yet."),
  (ER + "9. Questions for the curator, and points for the rung", "The tint question with its default, the sentence of overloading.tex you revise, and the Appendix I sentences made false."),
  (OVL, "The rule your rung builds, with the passage on existential reduction whose one word you revise."),
  (CHG + "Overloading with static parameters", "The Appendix I entry whose sentences on rows 740, 741 and 759 your rung corrects."),
  (OF + "static private DomainReading validOnDeclaredDomains(", "The reading of a generic beside a plain declaration on declared domains, whose Meet branch takes the new method."),
  (OF + "static private DomainReading genericPairValid(", "The reading of two own generics by the three rules, whose Meet branch takes the new method."),
  (OF + "static private boolean genericMeetCovered(", "The Meet Rule's search position by position, which the new method stands beside and does not change."),
  (OF + "static private List<FType> meetParams(FGenericFunction f, List<FType> fArgs, FGenericFunction g,", "The file's maker of the meet, which takes one output parameter more."),
  ("code:" + SC + "/overloading/OverloadingOracle.scala#def excludes(fa: ArrowType, ga: ArrowType): Boolean", "The checker's one exclusion test, where emptyED joins subtypeED."),
  ("code:" + SC + "/types/TypeSchemaAnalyzer.scala#private def reduceED(ed: Type, debug:Boolean=false)", "The existential reduction that cannot unify False and leaves the meet as it is: the cause on the checker."),
  ("doc:explorations/compile-ladder/climb-batch-17/JUDGE-review.md#4. Finding 3", "The replacement text for ownGeneric's comment, which waits for the next rung that edits OverloadedFunction.java: yours."),
  ("doc:ProjectFortress/tests/GenericPairExcludingWalk.fss", "Rung G's walk test of generic pairs that exclude: copyOf's pair of row 741, which the checker now accepts, and tint's, which it still refuses."),
]
P_CHECKS = [
  "P-152", "P-45", "P-148", "F-238",
  "ledger:740", "ledger:741",
  ER + "2. What the paper says, and the specification's passage",
  ER + "3. Walk: the change",
  ER + "4. The compiled checker: the change",
  ER + "8. Decisions",
  ER + "9. Questions for the curator, and points for the rung",
  OVL,
]

S_BRIEFING = [
  ("F-246", "The measurement your rung builds: the three String sites clear by the library's own conversion and two lines of FlatString's api, nothing new."),
  ("F-245", "Why the device of top-level operators waits: it answers errors only a check of symbolic operators would report, item 38's, later."),
  ("P-91", "What an object with no asString prints: its bare type name, which the conversion's Object branch gives."),
  ("ledger:743", "Your row: an object that extends Any is not an Object on either path, so the conversion would stop the team test extendAny."),
  ("ledger:726", "FlatString's api declares a pair that duplicates String's: the api line you drop."),
  (SO + "2.2 The ways, as shadow patches", "The conversion C and FlatString's lines F, as patches; the device's forms J, JC, JCp and JH, which are not yours."),
  (SO + "2.3 The distance and the full check, per way", "The sites each way frees: C frees all three with nothing new."),
  (SO + "2.5 What moves under walk, and what does not", "The walk values the conversion moves, the tests whose messages change, and microGPT's quick pair."),
  (SO + "2.6 The library's own way to turn any value into a string", "The library's own way, concatenation with the empty string, and cast at the bottom: the precedent for your bodies."),
  (SO + "5. Decisions, defects, hand-overs", "The probe's decisions, the defect that became row 743, and its question (c), which PLAN answers by repairing the row beside."),
  ("doc:Specification/basic/traits.tex#Trait Declarations", "The rule row 743 breaks: every trait but Any and Object extends Object, implicitly where it does not explicitly."),
  ("code:Library/FortressLibrary.fss#opr ||(self, b:Number):String..opr ||(self, b:Any):String", "String's concatenation members over every type, the two over Any at the two sites among them."),
  ("code:Library/FortressLibrary.fss#print(a:Any):() = print", "The library's own way to turn a value into a string, with the team's reason in its comment."),
  ("code:Library/FlatString.fsi#object FlatString extends { String }", "FlatString's api object, whose header and duplicate pair your two lines change."),
  ("code:Library/FlatString.fss#object FlatString extends { String, DelegatedIndexed", "FlatString's component object, whose header the api then states."),
  ("code:" + SRC + "/compiler/desugarer/PreDisambiguationDesugaringVisitor.java#private List<TraitTypeWhere> rewriteExtendsClause(", "Where both paths give a declaration with no extends clause the parent Object: row 743's site."),
  ("code:" + SRC + "/compiler/desugarer/PreDisambiguationDesugaringVisitor.java#public Node forTraitDecl(TraitDecl that)", "The trait case that leaves Any's own declaration alone, as Object's must be left too."),
  ("code:ProjectFortress/tests/extendAny.fss#object Infinity extends Any", "The team's test of an object that extends Any, which must keep printing Infinity."),
]
S_CHECKS = [
  "F-246", "ledger:743",
  SO + "2.2 The ways, as shadow patches",
  SO + "2.3 The distance and the full check, per way",
  SO + "2.5 What moves under walk, and what does not",
  "doc:Specification/basic/traits.tex#Trait Declarations",
  "code:Library/FortressLibrary.fss#opr ||(self, b:Number):String..opr ||(self, b:Any):String",
  "code:" + SRC + "/compiler/desugarer/PreDisambiguationDesugaringVisitor.java#private List<TraitTypeWhere> rewriteExtendsClause(",
]

IDS = ('P', 'S')
LISTS = {
  'P': ([k for k, _ in P_BRIEFING], P_CHECKS),
  'S': ([k for k, _ in S_BRIEFING], S_CHECKS),
}
REASONS = {'P': P_BRIEFING, 'S': S_BRIEFING}


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
            if len(set(keys)) != len(keys):
                print('   PROBLEM duplicate key in', rid, name); bad += 1
            badk = [k for k in keys if not k.strip() or k.startswith('-') or re.search(r'["`$\\\n]', k) or any(ord(ch) > 127 for ch in k)]
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
