# The briefing and checks lists of climb batch 35's rungs (CLIMB-BATCH-35.md, section 1, "The manifest, rung by
# rung"), for the batch workflow (explorations/coordinator/climb-batch-workflow.md, "The manifest and the scatter"),
# made from plan-34/manifest/lists34.py: each list holds what the rung's section cites, the decisions, the ledger
# rows, the notes and the code it rests on, and no process position or harness fact, which the brief's role text and
# the fortress-repo skill carry. POSITIONS and FACTS entries are keyed by their numbers. Each briefing entry is its
# facts-extract.sh key, one line on why it is there, and CHECK where the record marks it (check): the checks list,
# read by the skeptic, a repair round and a judge, is those keys in order. No key holds a backslash, a backtick, a
# dollar sign or a double quote, which the script refuses; facts-extract matches a heading without its backticks.
# The record's two runs (section 6, "The generator"): run 1, climb batch 35, the rungs R, W, S, O and A; run 2,
# climb batch 35b, the rungs E, L and M, written on run 1's landed tree (RUNS; gen35.py and check35.js take --run).
# The keys are each rung's briefing bullets in section 1, in their order, each as the record writes it, its backticks
# dropped and REC, PRB, SPEC and SRC spelled out as section 1's opening paragraph gives them, each with the record's
# reason, its backticks dropped and its first letter capitalized but where it opens with a code name; a check is
# marked on its entry. The forks: the record's one forks key, REC "Forks the batch takes", section 3's forks whole,
# in every briefing once, as a check.
# KEY_FIXES: a key of the record that this file holds in another form, each with the reason; check35.js reads the
# record's key through it. None in this record: no key of section 1 holds a backtick, a backslash or a double quote
# (the record's section 6, "The generator"). Run 2's lists are read again with its sections against run 1's landed
# tree before its launch (the record's section 6, "Before the launch").
# lists(ids) gives the lists of the rungs ids; LISTS and REASONS are lists(IDS).
# `python3 -B lists35.py [--run 1|2]` checks every key with facts-extract.sh --check (each must match exactly one
# place) and every reason's form, in $FORTRESS_HOME (this checkout by default), for the rungs of that run, or of both
# runs without --run, and prints the bytes of each rung's forks key; it is run again on the tree the batch is cut from.
import os
SRC = 'ProjectFortress/src/com/sun/fortress/'
REC = "doc:explorations/coordinator/CLIMB-BATCH-35.md#"
PRB = "doc:explorations/compile-ladder/plan-35/probes/fixes-35.md#"
SPEC = "doc:Specification/"
_ROOT = os.environ.get('FORTRESS_HOME', os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../..')))
CHECK = True
# The record's one forks key, section 3's "Forks the batch takes" whole, which every rung reads.
FORKS_SECTION = REC + 'Forks the batch takes'

R_BRIEFING = [
  ('ledger:960', 'The digit count, which closes.', CHECK),
  ('P-174', "A numeral's type and its four numbers, n the count of its digits.", CHECK),
  (SPEC + 'basic/expressions/literals.tex#Literals', 'The numeral types and their static arguments.'),
  ('code:' + SRC + 'nodes_util/ExprFactory.java#public static FloatLiteralExpr makeFloatLiteralExpr(Span span, String s)', 'Where the leading zeros are trimmed.', CHECK),
  ('code:' + SRC + 'nodes_util/NumeralNumbers.java#public static NumeralNumbers of(FloatLiteralExpr x)', 'Where both paths count the digits.'),
  ('code:ProjectFortress/compiler_tests/FloatLiteralValuePrint.fss#value object Dec(src: String)', 'A compiled coercion that reads the four numbers, the precedent of the compiled test.'),
  (PRB + '1. Under walk, on the base', "The walk test's failure on the base.", CHECK),
  ('map:compile-path-walkthrough.md#1. Parsing and the syntax tree', 'Where the node is made, before both paths.'),
  (FORKS_SECTION, 'The defaults you build.', CHECK),
]

W_BRIEFING = [
  ('ledger:1', 'The subscript before a superscript, which closes.', CHECK),
  ('ledger:1026', 'The tuple binding, which closes.', CHECK),
  ('ledger:152', "Its notes say that an earlier model program's corpus loads once, which row 1026 contradicts."),
  ('F-387', "The compiled path's reading of the same primary, the answer walk must give."),
  ('F-369', 'The compiled tuple binding, whose right side runs once.'),
  (SPEC + 'basic/variables.tex#Top-Level Variable Declarations', 'What a top-level tuple binding does.', CHECK),
  ('code:' + SRC + 'interpreter/evaluator/Evaluator.java#private FValue mathItemApplication(NonExprMI opr, FValue front, MathItem loc)', 'Where the subscript loses its first index.', CHECK),
  ('code:' + SRC + 'interpreter/evaluator/Evaluator.java#public FValue forSubscriptExpr(SubscriptExpr x)', 'A subscript that evaluates all its indices, the precedent.'),
  ('code:' + SRC + 'interpreter/rewrite/DesugarerVisitor.java#public Node forVarDecl(VarDecl vd)', "The temporary and the names' initializers.", CHECK),
  (PRB + '1. Under walk, on the base', 'Both failures on the base.', CHECK),
  (FORKS_SECTION, 'The defaults you build.', CHECK),
]

S_BRIEFING = [
  ('ledger:573', 'The cast of the receiver, which closes.', CHECK),
  ('ledger:1038', 'The wrong answer with no error, which closes.', CHECK),
  ('ledger:594', 'A generic functional method with self not first, a sibling at another site, which stays.'),
  ('F-372', "The code generator's methods of an object, and where rung M of climb batch 31 left this dispatch method."),
  (SPEC + 'basic/overloading.tex#Overloading Resolution', 'Which declaration a call runs.', CHECK),
  ('code:' + SRC + 'compiler/OverloadSet.java#static public class ForTraitOrObject extends AmongApis', "The overload set of a trait's or object's method, its self index and its first argument.", CHECK),
  (PRB + '2. Compiled, against the prelude, on the base', 'The three failures on the base.', CHECK),
  (FORKS_SECTION, 'The defaults you build.', CHECK),
]

O_BRIEFING = [
  ('P-148', "The checker's timing after a change."),
  ('ledger:650', "The code generator's refusal, which closes.", CHECK),
  ('ledger:653', "The checker's acceptance, which closes.", CHECK),
  ('ledger:694', 'A dotted call with numerals that keeps an overridden declaration, a sibling that stays.'),
  ('F-88', "The checker's reading of what a type provides, and of an override.", CHECK),
  ('F-372', 'The code generator writes each inherited method once, by the lowest type that declares it.'),
  (SPEC + 'basic/traits.tex#Method Declarations', 'The modifier override and its rule.', CHECK),
  ('code:' + SRC + 'compiler/codegen/CodeGen.java#public void forFnDecl(FnDecl x)', 'The refusal of the modifier.', CHECK),
  ('code:' + SRC + 'scala_src/useful/STypesUtil.scala#def providedAndOverridden(tt: TraitType,', "The checker's table of what an override keeps from being inherited.", CHECK),
  ('code:' + SRC + 'interpreter/evaluator/values/Constructor.java#has the modifier override and does not override any inherited declaration', "Walk's refusal, the words and the cases to follow."),
  (PRB + '3. The override modifier let through (PROBE 35 HACK, not kept)', 'The second wall.', CHECK),
  (FORKS_SECTION, 'The defaults you build.', CHECK),
]

A_BRIEFING = [
  ('ledger:1039', 'The discarded writes, which closes.', CHECK),
  ('ledger:1041', 'An exit that runs after its label block completed, a question that waits for the curator and stays.'),
  ('F-373', 'The compiled exit, a thrown LabelExit.', CHECK),
  ('F-374', 'The compiled cells and the atomic block.'),
  (SPEC + 'basic/expressions/atomic.tex#Atomic Expressions', 'What an exit out of an atomic block keeps.', CHECK),
  (SPEC + 'basic/expressions/label.tex#Label and Exit', 'What an exit does.'),
  ('code:' + SRC + 'runtimeSystem/BaseTask.java#public static void leaveTransaction(Throwable t)', "The compiled handler's end of the transaction.", CHECK),
  ('code:' + SRC + 'interpreter/evaluator/tasks/FortressTaskRunner.java#public static <T> T doItOnce(Callable<T> xaction)', "Walk's transaction around an atomic block.", CHECK),
  (PRB + '2. Compiled, against the prelude, on the base', 'The compiled failure on the base.'),
  (FORKS_SECTION, 'The defaults you build.', CHECK),
]

E_BRIEFING = [
  ('ledger:184', 'The internal error, which closes.', CHECK),
  ('P-37', 'The prelude gains no declaration.'),
  ('code:Library/FortressLibrary.fsi#opr <->(a: Boolean, b:Boolean):Boolean', "The one library's boolean operators, where the two go.", CHECK),
  ('code:Library/FortressLibrary.fss#opr <->(a: Boolean, b:Boolean):Boolean = a=b', 'The body of the nearest one.'),
  ('code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#opr EQV(self, other:Boolean):Boolean', "The prelude's declaration, which the compiled path runs today.", CHECK),
  ('code:' + SRC + 'interpreter/evaluator/Evaluator.java#private FValue getOp(FunctionalRef op)', 'Where walk stops today.'),
  (PRB + '4. The logical equivalence of two booleans in the one library (PROBE 35 HACK, not kept)', "The fix tried, its error for two objects, and microGPT's quick pair beside it.", CHECK),
  ('map:modules-and-phases.md#B.13 Where each library enters', "How a program sees the one library's top-level operators."),
  (FORKS_SECTION, 'The defaults you build.', CHECK),
]

L_BRIEFING = [
  ('ledger:1057', 'The dotted methods of two arities, which closes.', CHECK),
  ('ledger:1058', 'The tuple result, which closes.', CHECK),
  ('ledger:981', 'The numeral type in a comprises clause, which closes.', CHECK),
  ('P-174', "A numeral type is written only as a parameter's type.", CHECK),
  ('F-375', "Walk's load check of a generic declaration beside a plain one over an object type."),
  (SPEC + 'basic/overloading.tex#Applicability to Dotted Method Calls', 'Which dotted methods apply to a call.', CHECK),
  (SPEC + 'advanced/overloading.tex#Declarations with Static Parameters', 'The Return Type Rule for a generic declaration.', CHECK),
  ('code:' + SRC + 'interpreter/evaluator/values/DottedMethodApplication.java#Cannot find definition for method ', 'Where the call fails.'),
  ('code:' + SRC + 'interpreter/evaluator/values/OverloadedFunction.java#static private boolean returnRuleAtObjectArguments(SingleFcn inner, List<FType> dIn,', 'The reading at object arguments.'),
  ('code:' + SRC + 'interpreter/evaluator/BuildEnvironments.java#public static void checkNumeralTypesWritten(List<? extends CUWrapper> units)', 'The check that leaves out a comprises clause.'),
  (FORKS_SECTION, 'The defaults you build.', CHECK),
]

M_BRIEFING = [
  ('ledger:1053', 'The setter call, which closes.', CHECK),
  ('ledger:815', 'The missing overload method, which closes.', CHECK),
  ('F-377', "The cast of a value that has self's type, which row 1053's second form needs.", CHECK),
  ('F-374', 'A compiled var field in a cell, and its setter.'),
  (SPEC + 'basic/expressions/bindings.tex#Assignments', 'What an assignment to a field does.', CHECK),
  (SPEC + 'basic/traits.tex#Method Declarations', 'A functional method declared in a trait and defined in an object.'),
  ('code:' + SRC + 'compiler/codegen/CodeGen.java#public void forAssignment(Assignment x)', "The assignment's code.", CHECK),
  ('code:' + SRC + 'compiler/codegen/CodeGen.java#private void castToTypeBelow(Expr expr, Type declared)', 'The cast, the precedent.'),
  ('doc:explorations/compile-ladder/rung-export-align/REPORT.md#8. Defects and their homes', "Row 815's program and outputs."),
  (FORKS_SECTION, 'The defaults you build.', CHECK),
]

# A key of the record's section 1 that this file holds in another form: {record's key: (this file's key, reason)}.
KEY_FIXES = {}

# The two runs of the record, each in the manifest's order (section 1's table).
RUNS = {'1': ('R', 'W', 'S', 'O', 'A'), '2': ('E', 'L', 'M')}
ORDER = RUNS['1'] + RUNS['2']
_B = {'R': R_BRIEFING, 'W': W_BRIEFING, 'S': S_BRIEFING, 'O': O_BRIEFING, 'A': A_BRIEFING, 'E': E_BRIEFING, 'L': L_BRIEFING, 'M': M_BRIEFING}
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
    assert run is None or run in RUNS, 'usage: lists35.py [--run 1|2]'
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
