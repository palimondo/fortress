# The briefing and checks lists of climb batch 34's rungs (CLIMB-BATCH-34.md, section 1, "The manifest, rung by
# rung"), for the batch workflow (explorations/coordinator/climb-batch-workflow.md, "The manifest and the scatter"),
# made from plan-33/manifest/lists33.py: each list holds what the rung's section cites, the decisions, the ledger
# rows, the notes and the code it rests on, and no process position or harness fact, which the brief's role text and
# the fortress-repo skill carry. POSITIONS and FACTS entries are keyed by their numbers. Each briefing entry is its
# facts-extract.sh key, one line on why it is there, and CHECK where the record marks it (check): the checks list,
# read by the skeptic, a repair round and a judge, is those keys in order. No key holds a backslash, a backtick, a
# dollar sign or a double quote, which the script refuses; facts-extract matches a heading without its backticks.
# The record's two runs (section 6, "The generator"): run 1, climb batch 34, the rungs L, P, T, G and F; run 2,
# climb batch 34b, the rung C, written on run 1's landed tree (RUNS; gen34.py and check34.js take --run).
# The keys are each rung's briefing bullets in section 1, in their order, each as the record writes it, its backticks
# dropped and REC, PRB, PY, REH, CW, RN, SPEC and SRC spelled out as section 1's opening paragraph gives them, each
# with the record's reason, its backticks dropped and its first letter capitalized but where it opens with a code
# name; a check is marked on its entry. The forks: the record's one forks key, REC "Forks the batch takes", section
# 3's forks whole, in every briefing once, as a check.
# KEY_FIXES: a key of the record that this file holds in another form, each with the reason; check34.js reads the
# record's key through it. None in this record: no key of section 1 holds a backtick, a backslash or a double quote
# (the record's section 6, "The generator"). Run 2's lists are read again with its section against run 1's landed
# tree before its launch (the record's section 6, "Before the launch").
# lists(ids) gives the lists of the rungs ids; LISTS and REASONS are lists(IDS).
# `python3 -B lists34.py [--run 1|2]` checks every key with facts-extract.sh --check (each must match exactly one
# place) and every reason's form, in $FORTRESS_HOME (this checkout by default), for the rungs of that run, or of both
# runs without --run, and prints the bytes of each rung's forks key; it is run again on the tree the batch is cut from.
import os
SRC = 'ProjectFortress/src/com/sun/fortress/'
REC = "doc:explorations/coordinator/CLIMB-BATCH-34.md#"
PRB = "doc:explorations/compile-ladder/plan-34/probes/rehearsal.md#"
PY = "doc:explorations/compile-ladder/plan-31/probes/probe-y.md#"
REH = "doc:explorations/compile-ladder/plan-31/probes/switch-rehearsal.md#"
CW = "doc:explorations/reviews/carriers-ways-2026-11-13.md#"
RN = "doc:explorations/compile-ladder/rung-number-payload-objects/REPORT.md#"
SPEC = "doc:Specification/"
_ROOT = os.environ.get('FORTRESS_HOME', os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../..')))
CHECK = True
# The record's one forks key, section 3's "Forks the batch takes" whole, which every rung reads.
FORKS_SECTION = REC + 'Forks the batch takes'

L_BRIEFING = [
  ('ledger:1078', "The verifier's refusal, which closes.", CHECK),
  ('ledger:983', "A closure that captures every variable in scope, a sibling of the local's path."),
  (PRB + '3. The walls, in the order met', 'Wall 2, its message, and the two prelude copies that verify.', CHECK),
  (PRB + '2. The hacks, each marked PROBE 34 HACK in the patch', 'The scratch tree in which the wall reproduces.'),
  (PRB + "4. The verifier's count over the emitted library", "ASM's reading of the same method."),
  ('code:Library/FortressLibrary.fss#simplestRationalBetween(a:QQ, b:QQ): QQ = label done', "The one library's site.", CHECK),
  ('code:' + SRC + 'compiler/codegen/CodeGen.java#public void forLabel(com.sun.fortress.nodes.Label x)', "The label block's code.", CHECK),
  ('code:' + SRC + 'compiler/codegen/CodeGen.java#public void forExit(com.sun.fortress.nodes.Exit x)', "The exit's code."),
  (SPEC + 'basic/expressions/label.tex#Label and Exit', 'What a label block and an exit do.', CHECK),
  ('map:compile-path-walkthrough.md#5. Code generation', 'How the code generator writes a method body.'),
  (FORKS_SECTION, 'The defaults you build.', CHECK),
]

P_BRIEFING = [
  ('ledger:818', 'The refusal, which closes for the partial form.', CHECK),
  (SPEC + 'basic/expressions/type-annotation.tex#Type Assumption', 'What an assumption does to the call around it.', CHECK),
  (SPEC + 'basic/overloading.tex#Overloading Resolution', 'How the declaration of a call is chosen.', CHECK),
  ('code:' + SRC + 'compiler/codegen/CodeGen.java#private boolean assumedArgumentsCall(FunctionalRef x, ArrowType arrow, String pkgClass, String theFunction,', 'Where the code generator refuses the form.', CHECK),
  ('code:' + SRC + 'interpreter/evaluator/Evaluator.java#public FValue forAsIfExpr(AsIfExpr x)', "Walk's value of an assumption, the precedent."),
  ('code:Library/String.fss#concatAndBalanceIfNecessary(s1: CatString, s2: FlatString):String = do', "The one library's site."),
  (PRB + '3. The walls, in the order met', 'Wall 1, which the measure does not count.', CHECK),
  ('map:compile-path-walkthrough.md#4. Desugaring, overload rewriting, and the switches', 'Where an overloaded call is marked before the code generator.'),
  (FORKS_SECTION, 'The defaults you build.', CHECK),
]

T_BRIEFING = [
  ('ledger:1076', 'The crash, which closes.', CHECK),
  ('ledger:540', "Rung I's receiver typed by an intersection, the precedent."),
  ('F-34', 'The measure, whose one refused declaration this is.', CHECK),
  (SPEC + 'basic/expressions/method-invocation.tex#Dotted Method Invocations', 'What the call does.', CHECK),
  ('code:' + SRC + 'compiler/codegen/CodeGen.java#public void forMethodInvocation(MethodInvocation x)', 'The dotted call, and the cast that crashes.', CHECK),
  ('code:' + SRC + 'compiler/codegen/CodeGen.java#private TraitType intersectionMethodOwner(ASTNode x, IntersectionType it, IdOrOp method,', 'How the owner of a method is found for an intersection.'),
  ('code:Library/FortressLibrary.fss#resolvedouterBody=__resolveBottomArgumentType', "The one library's site, two lines above the call."),
  ('map:compile-path-walkthrough.md#5. Code generation', 'How the code generator walks a generic body.'),
  (FORKS_SECTION, 'The defaults you build.', CHECK),
]

G_BRIEFING = [
  ('P-148', "The checker's timing after a change."),
  ('ledger:993', "The two getters and the checker's acceptance, which closes.", CHECK),
  (SPEC + 'advanced/overloading.tex#Declarations with Static Parameters', 'The Return Type Rule (:555-559), the ground of fork G1.', CHECK),
  (SPEC + 'basic/traits.tex#Method Declarations', 'A method declared below one that it inherits.', CHECK),
  ('code:' + SRC + 'scala_src/typechecker/OverloadingChecker.scala#the return type of the overriding declaration', "Where the checker compares an override's return type today.", CHECK),
  ('code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#getter zero(): Number = unsigned(0)', "The library's two lines.", CHECK),
  ('code:Library/FortressLibrary.fss#getter zero(): I', 'The getter that NN32 inherits.'),
  (REH + "W4. NN32's zero and one return Number (no row)", 'The wall as the rehearsal met it.'),
  (PRB + '6. For the ledger', 'The reproducer against the prelude.', CHECK),
  ('map:compile-path-walkthrough.md#3. The checker', 'How the checker checks a declaration.'),
  (FORKS_SECTION, 'The defaults you build.', CHECK),
]

F_BRIEFING = [
  ('ledger:1090', "The line and walk's need for it, which closes.", CHECK),
  ('ledger:1082', "The compiled path's refusal of such a name, an open question on record that this rung leaves open."),
  ('code:Library/FlatString.fss#ignore(FlatString)', 'The line.', CHECK),
  ('code:' + SRC + 'interpreter/glue/prim/FlatString.java#protected FNativeObject makeNativeObject(List<FValue> args, NativeConstructor con)', "Where walk sets the strings' constructor today.", CHECK),
  ('code:' + SRC + 'interpreter/evaluator/BuildNativeEnvironment.java#public static Constructor nativeConstructor(Environment containing,', "Where walk makes a native object's constructor.", CHECK),
  ('code:' + SRC + 'interpreter/glue/prim/Boolean.java#FBool.setConstructor(this)', 'A sibling that sets its constructor the same way.'),
  (PRB + '3. The walls, in the order met', "Wall 4, the line on the compiled path and walk's failure without it."),
  ('map:modules-and-phases.md#B.12 Native code and Java interop', 'How walk binds a native component.'),
  (FORKS_SECTION, 'The defaults you build.', CHECK),
]

C_BRIEFING = [
  ('P-33', 'The slice first, one build serving both libraries, each wall a rung under the gate.', CHECK),
  ('P-37', 'The prelude stays until the switch-over and gains no declaration.', CHECK),
  ('P-178', 'Each number type one value object, and its detail.', CHECK),
  ('P-164', "The reader and the writer carried by classes of the one library's traits.", CHECK),
  ('P-169', "The array stores, by P-164's device."),
  ('F-388', "The prelude's seven over payload classes; the one library's seven have no rows.", CHECK),
  ('F-381', 'The selector, its caches folder and its track.', CHECK),
  ('F-353', 'One build, with a second set of classes in a second folder first on the class path.', CHECK),
  ('F-390', "Varargs under the selector, and the run that would fail at the array's indices."),
  ('ledger:874', 'The carriers, which closes.', CHECK),
  ('ledger:1062', 'No program runs, which closes.', CHECK),
  ('ledger:995', "A carried type's two names, open for the types other than the seven numbers."),
  ('ledger:1090', "The line of FlatString, which run 1's rung F takes out."),
  (PRB + '2. The hacks, each marked PROBE 34 HACK in the patch', 'Each piece as the probe built it in scratch.', CHECK),
  (PRB + '3. The walls, in the order met', 'What the probe met, and what it took out again.', CHECK),
  (PRB + '5. How the gate can build the jars', 'The compiles in the track, and row 757.', CHECK),
  (RN + "The one library's seven (fork N4, a point to report)", 'Where the entries of the seven go.', CHECK),
  (CW + "Way C. The object's class carries the value, and the trait stays an interface", 'Form 2, and the four other shapes.', CHECK),
  (PY + '2. How the library is selected', 'The second folder and the class path.', CHECK),
  (PY + '3. The hacks', 'The proper form of each shortcut, the raise strings and the stamp among them.'),
  (REH + 'W2. The wrappers of the helper classes (row 874)', 'The wall as first met.'),
  ('code:' + SRC + 'compiler/NamingCzar.java#private static final String[][] payloadObjects = {', 'The table of payload objects.', CHECK),
  ('code:' + SRC + 'compiler/runtimeValues/LibraryNames.java#public static String numberObjectClass(String t)', "The names of the objects' classes.", CHECK),
  ('code:' + SRC + 'compiler/runtimeValues/FZZ32.java#public abstract class FZZ32 extends FValue', 'A payload class, the precedent.'),
  ('code:ProjectFortress/compiler_tests/CompilerBuiltinComponent.test#tests=', 'How the compiler track compiles the prelude.'),
  ('map:compile-path-walkthrough.md#6. The run: the second JVM and the class loader', 'How a class is loaded and named at the run.'),
  (FORKS_SECTION, 'The defaults you build.', CHECK),
]

# A key of the record's section 1 that this file holds in another form: {record's key: (this file's key, reason)}.
KEY_FIXES = {}

# The two runs of the record, each in the manifest's order (section 1's table).
RUNS = {'1': ('L', 'P', 'T', 'G', 'F'), '2': ('C',)}
ORDER = RUNS['1'] + RUNS['2']
_B = {'L': L_BRIEFING, 'P': P_BRIEFING, 'T': T_BRIEFING, 'G': G_BRIEFING, 'F': F_BRIEFING, 'C': C_BRIEFING}
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
    assert run is None or run in RUNS, 'usage: lists34.py [--run 1|2]'
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
