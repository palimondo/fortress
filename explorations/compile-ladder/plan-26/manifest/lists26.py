# The briefing and checks lists of climb batch 26's rungs (CLIMB-BATCH-26.md, section 3), made from
# plan-25/manifest/lists25.py for the batch workflow (explorations/coordinator/process-engineering/batch-redesign.md,
# "The brief"): each list holds what the rung's section cites, the decisions, the ledger rows, the notes and the code
# it rests on, and no process position or harness fact, which the brief's role text and the fortress-repo skill carry.
# POSITIONS and FACTS entries are keyed by their numbers. Each briefing entry is a pair: its facts-extract.sh key and
# one line on why it is there. A checks list is a sub-list of its briefing's keys, read by the skeptic, a repair
# round and a judge. No key holds a backslash, a backtick or a double quote, which the script refuses; facts-extract
# matches a heading without its backticks.
# Changed from lists25.py: the keys are the record's section 5, "The briefings, rung by rung", in its order, each
# with the record's reason for it, its backticks dropped, its first letter capitalized and a full stop added, and
# the checks those the record marks (check); check26.js compares the reasons and the counts of keys and checks with
# the record. Where the record gives a key no reason (W's forks and OverloadedFunction.java, S's probes and forks,
# L's forks and the map), the reason is this file's, from lists25.py's or from the rung's section 3, and OWN_REASONS
# names the key. The rungs, in the manifest's order, which is the gather's applied order: W, S, L (the record's fork 1);
# a string rung, if a resume of the planner adds one, goes after them. No rung has a planner's text or sample, so no
# key names plan-26/probes/; the shared guards of the native rungs are gone.
# `python3 -B lists26.py` checks every key with facts-extract.sh --check (each must match exactly one place) and every
# reason's form, in $FORTRESS_HOME (this checkout by default); it is run again on the tree the batch is cut from.
import os
SRC = 'ProjectFortress/src/com/sun/fortress/'
REC = "doc:explorations/coordinator/CLIMB-BATCH-26.md#"
_ROOT = os.environ.get('FORTRESS_HOME', os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../..')))
PROBES = REC + "The planner's probes"
FORKS = (REC + "Forks the batch takes, none consequential", "The defaults your rung builds, each with the ways not taken.")

W_BRIEFING = [
  ("P-160", "The decision whose first step you build."),
  ("P-157", "The checker's reading of self and the bounds, which walk's follows."),
  ("P-152", "Exclusion over the whole parameter types on both paths."),
  ("F-277", "The checker's reading as built, and row 804's refusal."),
  ("F-258", "Walk's existential reduction, the code you extend, and its departures."),
  ("F-252", "Walk's reading of generic pairs on their declared domains."),
  ("ledger:804", "The row you close."),
  ("ledger:713", "The contested pair whose walk verdict stays."),
  (PROBES, "Row 804's refusal on the base among them."),
  FORKS,
  ("doc:explorations/reviews/number-closure-2026-11-05.md#6. The options", "P-160's two steps and the files of each."),
  ("code:" + SRC + "interpreter/evaluator/values/OverloadedFunction.java#static private DomainReading validOnDeclaredDomains(Overload o1, Overload o2, Collection<Overload> all)", "The code of OverloadedFunction.java that your reading changes."),
  ("doc:Specification/advanced/overloading.tex#Declarations with Static Parameters", "The rules walk applies."),
  ("doc:ProjectFortress/tests/XXXExclusionVectorScalarWalk.fss", "The test you promote."),
]
W_CHECKS = ["P-160", "P-157", "P-152", "F-277", "ledger:804", PROBES,
  "code:" + SRC + "interpreter/evaluator/values/OverloadedFunction.java#static private DomainReading validOnDeclaredDomains(Overload o1, Overload o2, Collection<Overload> all)",
  "doc:Specification/advanced/overloading.tex#Declarations with Static Parameters",
  "doc:ProjectFortress/tests/XXXExclusionVectorScalarWalk.fss"]

S_BRIEFING = [
  ("P-159", "The decision whose edit you make."),
  ("P-96", "The revision form."),
  ("P-95", "Why every change keeps its original."),
  ("ledger:672", "The row you close."),
  ("ledger:440", "Walk's departure your entry names."),
  ("doc:explorations/reviews/nan-comparison-2026-11-05.md#(a) Keep", "The option the decision took, the heading's first words, since a key holds no backtick."),
  ("doc:explorations/reviews/nan-comparison-2026-11-05.md#2.4", "The values on both paths."),
  ("doc:Specification/basic/operators/opr-overview.tex#Comparisons Operators", "The passage you revise."),
  ("doc:Specification/appendices/changes.tex#choice of a coercion", "An Appendix I entry's form."),
  ("doc:explorations/compile-ladder/rung-spec-route-a/decision-record.md#3.3", "A decision record's form."),
  (PROBES, "The planner's measurements on this base."),
  FORKS,
  ("doc:ProjectFortress/tests/TupleOrderBounds.fss", "The guard whose message you change and the form of your walk test."),
]
S_CHECKS = ["P-159", "P-96", "ledger:672", "ledger:440", "doc:explorations/reviews/nan-comparison-2026-11-05.md#(a) Keep",
  "doc:Specification/basic/operators/opr-overview.tex#Comparisons Operators"]

L_BRIEFING = [
  ("F-34", "The code generator's refusals and their measure."),
  ("F-233", "The checker's typing of a local function's group."),
  ("F-135", "Closures and tasks generic over free static parameters."),
  ("F-117", "A closure in a mutable variable's cell."),
  ("ledger:304", "The row you close or narrow."),
  ("ledger:497", "The also arm's slot that Matrix's mma may meet."),
  ("ledger:865", "The rewrite's limit that stays."),
  (PROBES, "The six programs, the code generator's table and the nine."),
  (REC + "The question for the curator", "Question 1 and its default (a)."),
  FORKS,
  ("map:compile-path-walkthrough.md#5. Code generation", "The territory map's walkthrough of code generation."),
  ("doc:Specification/basic/functions.tex#Local Function Declarations", "What a local function may be."),
  ("code:" + SRC + "compiler/codegen/CodeGen.java#public void forFnExpr(FnExpr x)", "The closure your case reuses."),
  ("code:" + SRC + "interpreter/evaluator/BuildLetEnvironments.java#public FValue forLetFn(LetFn x)", "Walk's binding of the group."),
  ("doc:ProjectFortress/compiler_tests/ForbidClauseCompiled.fss", "Climb batch 25's compiled run test, the form of yours."),
]
L_CHECKS = ["F-34", "F-233", "ledger:304", PROBES, REC + "The question for the curator",
  "doc:Specification/basic/functions.tex#Local Function Declarations",
  "code:" + SRC + "compiler/codegen/CodeGen.java#public void forFnExpr(FnExpr x)"]

ORDER = ('W', 'S', 'L')
_B = {'W': (W_BRIEFING, W_CHECKS), 'S': (S_BRIEFING, S_CHECKS), 'L': (L_BRIEFING, L_CHECKS)}
IDS = tuple(r for r in ORDER if _B[r][0])
LISTS = {r: ([k for k, _ in _B[r][0]], _B[r][1]) for r in IDS}
REASONS = {r: _B[r][0] for r in IDS}
# The keys whose reason the record does not give (above); check26.js finds every other reason in the record.
OWN_REASONS = {
  'W': [FORKS[0], "code:" + SRC + "interpreter/evaluator/values/OverloadedFunction.java#static private DomainReading validOnDeclaredDomains(Overload o1, Overload o2, Collection<Overload> all)"],
  'S': [PROBES, FORKS[0]],
  'L': [FORKS[0], "map:compile-path-walkthrough.md#5. Code generation"],
}
assert all(k in LISTS[r][0] for r in OWN_REASONS for k in OWN_REASONS[r]), 'OWN_REASONS names a key not in its briefing'

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
    import subprocess, re, sys
    root = _ROOT
    bad = 0
    print('tree', root)
    print('rungs', ', '.join(IDS))
    for rid in IDS:
        b, c = LISTS[rid]
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
