# The briefing and checks lists of climb batch 36's rungs (CLIMB-BATCH-36.md, section 1, "The manifest, rung by
# rung"), for the batch workflow (explorations/coordinator/climb-batch-workflow.md, "The manifest and the scatter"),
# made from plan-35/manifest/lists35.py: each list holds what the rung's section cites, the decisions, the ledger
# rows, the notes and the code it rests on, and no process position or harness fact, which the brief's role text and
# the fortress-repo skill carry. POSITIONS and FACTS entries are keyed by their numbers. Each briefing entry is its
# facts-extract.sh key, one line on why it is there, and CHECK where the record marks it (check): the checks list,
# read by the skeptic, a repair round and a judge, is those keys in order. No key holds a backslash, a backtick, a
# dollar sign or a double quote, which the script refuses; facts-extract matches a heading without its backticks.
# The record's two runs (section 6, "The generator"): run 1, climb batch 36, the rungs K, G, N and C; run 2, climb
# batch 36b, the rungs F, Y, B and T, written on run 1's landed tree (RUNS; gen36.py and check36.js take --run).
# The keys are each rung's briefing bullets in section 1, in their order, each as the record writes it, its backticks
# dropped and REC, PRB, SPEC and SRC spelled out as section 1's opening paragraph gives them, each with the record's
# reason, its backticks dropped and its first letter capitalized but where it opens with a code name; a check is
# marked on its entry. The forks: the record's one forks key, REC "Forks the batch takes", section 3's forks whole,
# in every briefing once, as a check.
# KEY_FIXES: a key of the record that this file holds in another form, each with the reason; check36.js reads the
# record's key through it. None in this record: no key of section 1 holds a backtick, a backslash or a double quote
# (the record's section 6, "The generator"). Run 2's lists are read again with its sections against run 1's landed
# tree before its launch (the record's section 6, "Before the launch").
# lists(ids) gives the lists of the rungs ids; LISTS and REASONS are lists(IDS).
# `python3 -B lists36.py [--run 1|2]` checks every key with facts-extract.sh --check (each must match exactly one
# place) and every reason's form, in $FORTRESS_HOME (this checkout by default), for the rungs of that run, or of both
# runs without --run, and prints the bytes of each rung's forks key; it is run again on the tree the batch is cut from.
import os
SRC = 'ProjectFortress/src/com/sun/fortress/'
REC = "doc:explorations/coordinator/CLIMB-BATCH-36.md#"
PRB = "doc:explorations/compile-ladder/plan-36/probes/fixes-36.md#"
SPEC = "doc:Specification/"
_ROOT = os.environ.get('FORTRESS_HOME', os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../..')))
CHECK = True
# The record's one forks key, section 3's "Forks the batch takes" whole, which every rung reads.
FORKS_SECTION = REC + 'Forks the batch takes'

K_BRIEFING = [
  ('ledger:1100', "The tie that self's type makes, which closes.", CHECK),
  ('ledger:935', "The order of a call's candidates, which closes.", CHECK),
  ('ledger:1112', "The trait's return type taken at a call on self, which closes.", CHECK),
  ('ledger:1127', "An object's narrower return type refused, which closes.", CHECK),
  ('ledger:543', 'A coverage tie typed by its first candidate, which closes.', CHECK),
  ('P-146', 'The signatures keep the plain trait type, in a self-typed trait.', CHECK),
  ('P-60', 'The coverage tie, typed by the intersection.'),
  ('F-377', "The code generator's cast of self, where it stops."),
  (SPEC + 'basic/overloading.tex#Overloading Resolution', 'Which declaration is more specific.', CHECK),
  ('code:' + SRC + 'compiler/index/FunctionalMethod.java#public List<Param> parameters() {', 'Where self keeps the meet in a signature.', CHECK),
  ('code:' + SRC + 'scala_src/typechecker/impls/Functionals.scala#def takesSelfAtTrait(c: Ranked) = {', "The gate repair's case, at the tie.", CHECK),
  ('doc:explorations/compile-ladder/climb-batch-35/REPAIR-gate.md#The site', 'The trace of the tie at QQ.'),
  (PRB + "4. The checker's choice among equally specific candidates, counted", 'The ties, by kind, and the 22 that the rules leave.', CHECK),
  (FORKS_SECTION, 'The defaults you build.', CHECK),
]

G_BRIEFING = [
  ('ledger:1125', 'The methods that differ only in their bounds, which closes.', CHECK),
  ('ledger:1122', 'The tuple result between two generic declarations, which closes.', CHECK),
  ('ledger:1124', 'The numeral type written, which closes.', CHECK),
  ('ledger:1123', 'Two generic functional methods, a sibling that stays.'),
  ('F-405', "Walk's generic dotted methods of one name, as climb batch 35b built them.", CHECK),
  (SPEC + 'advanced/overloading.tex#Declarations with Static Parameters', 'Which of two generic declarations is more specific.', CHECK),
  ('code:' + SRC + 'interpreter/evaluator/values/Constructor.java#private static String genericKey(String s, GenericMethod g) {', 'The key that two bounds share.', CHECK),
  ('code:' + SRC + 'interpreter/evaluator/values/OverloadedFunction.java#static private boolean belowAtObjectArguments(FType rIn, FType rOut, FType p,', 'The tuple read element by element, the precedent.'),
  ('code:' + SRC + 'interpreter/evaluator/BuildEnvironments.java#public static void checkNumeralTypesWritten(List<? extends CUWrapper> units) {', 'The load check that leaves the three forms out.', CHECK),
  (PRB + '1. Under walk, on the base', 'The failures on the base.'),
  (FORKS_SECTION, 'The defaults you build.', CHECK),
]

N_BRIEFING = [
  ('P-174', "The coercion's body, Byte(v), and the four numbers.", CHECK),
  ('P-173', 'A numeral converts where it stands.', CHECK),
  ('F-341', "Walk's numeral and its coercion, run with the four numbers bound.", CHECK),
  ('F-342', "The checker's numeral, and the four numbers read as ZZ.", CHECK),
  ('F-347', 'The compiled coercion, folded or run once.'),
  ('F-345', 'The literals chapter, which reads the four numbers as ZZ.'),
  (SPEC + 'basic/expressions/literals.tex#Literals', 'The numeral types and their coercions.'),
  ('code:' + SRC + 'interpreter/evaluator/values/Numerals.java#private static FValue convert(FType target, Site s, SingleFcn c) {', 'Where walk binds the four numbers.', CHECK),
  ('code:' + SRC + 'scala_src/typechecker/staticenv/KindEnv.scala#def getType(x: Name): Option[Type] = lookup(x).flatMap(b =>', 'Where the checker types them.', CHECK),
  ('code:' + SRC + 'compiler/codegen/NumeralCoercionFold.java#public static Object fold(FnRef ref, Expr numeral, Component current) {', "The code generator's fold of a coercion."),
  ('code:Library/FortressLibrary.fss#= numeralRR64(v, r.asZZ32, m.asZZ32)', "The library's coercions, the first of six.", CHECK),
  (PRB + '7. The counts for rungs N and F', 'The coercions and tests to rewrite.', CHECK),
  (FORKS_SECTION, 'The defaults you build.', CHECK),
]

C_BRIEFING = [
  ('ledger:994', 'The bare api name, which closes.', CHECK),
  ('ledger:1091', 'The default method written twice, which closes.', CHECK),
  ('ledger:1099', 'The bridge written twice, which closes.', CHECK),
  ('ledger:1098', 'println of a number, which stays and may stop a promoted program.'),
  ('F-396', "The one library's jars and the onelibrary track.", CHECK),
  ('code:' + SRC + 'compiler/OverloadSet.java#String owner = Naming.dotToSep(f.tagA.getText());', 'One of the four bare names.', CHECK),
  ('code:' + SRC + 'compiler/codegen/CodeGen.java#Set<Functional> bridged = Collections.newSetFromMap(new java.util.IdentityHashMap<Functional, Boolean>());', 'The bridges of a class, where a second one is written.'),
  ('code:explorations/compile-ladder/plan-34/probes/programs/Arr.fss#component Arr', "The rehearsal's array program."),
  (PRB + '3. Compiled, against the one library, on the old code', 'The failures on the base.', CHECK),
  (FORKS_SECTION, 'The defaults you build.', CHECK),
]

F_BRIEFING = [
  ('P-165', 'The getter asRR64, and why.', CHECK),
  ('P-161', 'The integer conversions, getters named for their target.'),
  ('P-79', 'Every team demo kept running.', CHECK),
  ('F-324', "The one library's asFloat, the departure that closes.", CHECK),
  ('code:Library/FortressLibrary.fss#coerce(x: ZZ32) = asFloat(x)', 'The first use in the library.'),
  (PRB + '7. The counts for rungs N and F', 'The declarations and uses to rewrite.', CHECK),
  (FORKS_SECTION, 'The defaults you build.', CHECK),
]

Y_BRIEFING = [
  ('ledger:1101', 'asString in a generic body, which closes.', CHECK),
  ('ledger:1102', 'The placeholder report, which closes.', CHECK),
  ('ledger:1103', 'The second instance, which closes.', CHECK),
  ('F-396', 'The second set of run-time classes.'),
  ('F-388', 'The payload classes.'),
  ('code:' + SRC + 'compiler/runtimeValues/Utility.java#public static FException makeFortressException(String name, String msg) {', "Where a helper's raise makes its object."),
  (PRB + '3. Compiled, against the one library, on the old code', 'The failures on the base.', CHECK),
  (FORKS_SECTION, 'The defaults you build.', CHECK),
]

B_BRIEFING = [
  ('ledger:1121', 'The four missing, which closes.', CHECK),
  ('F-403', 'EQV and NEQV as built, the precedent.', CHECK),
  ('P-37', 'The prelude gains no declaration.'),
  ('code:Library/FortressLibrary.fsi#opr EQV(a: Boolean, b:Boolean):Boolean', 'Where the four go.', CHECK),
  ('code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#opr OPLUS(self, other:Boolean):Boolean', "The prelude's three."),
  (PRB + '1. Under walk, on the base', 'The failure on the base.'),
  (FORKS_SECTION, 'The defaults you build.', CHECK),
]

T_BRIEFING = [
  ('ledger:1110', 'The exit wrapped, which closes.', CHECK),
  ('ledger:1111', 'The exception wrapped, which closes.', CHECK),
  ('F-401', 'An exit out of an atomic block, as climb batch 35 built it.'),
  (SPEC + 'basic/expressions/atomic.tex#Atomic Expressions', 'What a tryatomic does.', CHECK),
  ('code:' + SRC + 'interpreter/evaluator/Evaluator.java#public FValue forTryAtomicExpr(TryAtomicExpr x) {', 'Where the wrapping is.', CHECK),
  (PRB + '1. Under walk, on the base', 'The failures on the base.'),
  (FORKS_SECTION, 'The defaults you build.', CHECK),
]

# A key of the record's section 1 that this file holds in another form: {record's key: (this file's key, reason)}.
KEY_FIXES = {}

# The two runs of the record, each in the manifest's order (section 1's table).
RUNS = {'1': ('K', 'G', 'N', 'C'), '2': ('F', 'Y', 'B', 'T')}
ORDER = RUNS['1'] + RUNS['2']
_B = {'K': K_BRIEFING, 'G': G_BRIEFING, 'N': N_BRIEFING, 'C': C_BRIEFING, 'F': F_BRIEFING, 'Y': Y_BRIEFING, 'B': B_BRIEFING, 'T': T_BRIEFING}
IDS = tuple(r for r in ORDER if _B[r])
assert all([e[0] for e in _B[r]].count(FORKS_SECTION) == 1 for r in IDS), 'each briefing names the forks once'


def lists(ids=IDS):
    """(LISTS, REASONS) for the rungs ids: LISTS[r] is (briefing keys, checks keys), REASONS[r] the (key, reason) pairs."""
    assert all(r in IDS for r in ids), ids
    out_l, out_r = {}, {}
    for r in ids:
        es = [(e[0], e[1], len(e) > 2 and e[2]) for e in _B[r]]
        out_l[r] = ([k for k, _, _ in es], [k for k, _, c in es if c])
        out_r[r] = [(k, why) for k, why, _ in es]
    return out_l, out_r


LISTS, REASONS = lists(IDS)


def reason_problems(rid, reasons=None):
    out = []
    for k, r in (reasons or REASONS)[rid]:
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
    run = sys.argv[sys.argv.index('--run') + 1] if '--run' in sys.argv else None
    assert run is None or run in RUNS, 'usage: lists36.py [--run 1|2]'
    CHECKED = RUNS[run] if run else IDS
    print('rungs', ', '.join(CHECKED), '(run ' + run + ')' if run else '(both runs)')
    LISTS, REASONS = lists(IDS)

    def check(keys):
        r = subprocess.run(['bash', 'explorations/coordinator/tools/facts-extract.sh', '--check'] + list(keys), capture_output=True, text=True, cwd=root)
        return r, [int(x) for x in re.findall(r'\[([0-9]+) bytes\]', r.stdout)]
    # Each fixed key and the record's key it stands for: the same one place, file and lines.
    def place(key):
        r, _ = check([key])
        m = re.search(r'\s(\S+:[0-9]+-[0-9]+)\s+\[[0-9]+ bytes\]', r.stdout)
        return m.group(1) if r.returncode == 0 and m else None
    for rk, (lk, why) in KEY_FIXES.items():
        pr, pl = place(rk), place(lk)
        print('key fixed:', rk, '->', lk, '|', pr, 'and', pl, '|', why)
        if not pr or pr != pl:
            print('   PROBLEM the fixed key and the record\'s key are not one place'); bad += 1
    for rid in CHECKED:
        b, c = LISTS[rid]
        rp = reason_problems(rid, REASONS)
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
            r, _ = check(keys)
            lines = r.stdout.strip().splitlines()
            probs = [l for l in lines if 'not one' in l or 'NOT FOUND' in l or 'no match' in l.lower() or 'no line of' in l or 'no such file' in l]
            total = [l for l in lines if l.startswith('Total')]
            print(rid, name, 'keys', len(keys), 'exit', r.returncode, '|', total[0] if total else r.stderr.strip()[:200])
            for l in probs: print('   PROBLEM', l[:300])
            if r.returncode or probs:
                bad += 1
                if os.environ.get('VERBOSE'): print(r.stdout)
        # The forks key alone: what the rung reads of section 3.
        fk = [k for k in b if k == FORKS_SECTION]
        r, sizes = check(fk)
        total = [l for l in r.stdout.strip().splitlines() if l.startswith('Total')]
        print(rid, 'forks', ', '.join(k.split('#')[-1] for k in fk), '(whole) |', ' + '.join(map(str, sizes)), '=', sum(sizes), 'bytes |', total[0] if total else r.stderr.strip()[:200])
        if r.returncode or len(sizes) != len(fk) or len(fk) != 1:
            print('   PROBLEM the forks key is not held once, or matches no one place'); bad += 1
    print('bad lists', bad)
    sys.exit(1 if bad else 0)
