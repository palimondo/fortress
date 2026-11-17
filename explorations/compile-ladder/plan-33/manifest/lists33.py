# The briefing and checks lists of climb batch 33's rungs (CLIMB-BATCH-33.md, section 1, "The manifest, rung by
# rung"), for the batch workflow (explorations/coordinator/climb-batch-workflow.md, "The manifest and the scatter"),
# made from plan-31/manifest/lists31.py: each list holds what the rung's section cites, the decisions, the ledger
# rows, the notes and the code it rests on, and no process position or harness fact, which the brief's role text and
# the fortress-repo skill carry. POSITIONS and FACTS entries are keyed by their numbers. Each briefing entry is its
# facts-extract.sh key, one line on why it is there, and CHECK where the record marks it (check): the checks list,
# read by the skeptic, a repair round and a judge, is those keys in order. No key holds a backslash, a backtick, a
# dollar sign or a double quote, which the script refuses; facts-extract matches a heading without its backticks.
# The record's two runs (section 6, "The generator"): run 1, climb batch 33, the rungs S, D, V, Q, I and C; run 2,
# climb batch 33b, the rungs N, W, G and R, written on run 1's landed tree (RUNS; gen33.py and check33.js take --run).
# The keys are each rung's briefing bullets in section 1, in their order, each as the record writes it, its backticks
# dropped and REC, PRB, PY, REH, CW, SPEC and SRC spelled out as section 1's opening paragraph gives them, each with
# the record's reason, its backticks dropped and its first letter capitalized but where it opens with a code name; a
# check is marked on its entry. The forks: the record's one forks key, REC "Forks the batch takes", section 3's forks
# whole, in every briefing once, as a check.
# KEY_FIXES: a key of the record that this file holds in another form, each with the reason; check33.js reads the
# record's key through it. Run 2's lists are read again with its sections against run 1's landed tree before its
# launch (the record's section 6, "Before the launch").
# lists(ids) gives the lists of the rungs ids; LISTS and REASONS are lists(IDS).
# `python3 -B lists33.py [--run 1|2]` checks every key with facts-extract.sh --check (each must match exactly one
# place) and every reason's form, in $FORTRESS_HOME (this checkout by default), for the rungs of that run, or of both
# runs without --run, and prints the bytes of each rung's forks key; it is run again on the tree the batch is cut from.
import os
SRC = 'ProjectFortress/src/com/sun/fortress/'
REC = "doc:explorations/coordinator/CLIMB-BATCH-33.md#"
PRB = "doc:explorations/compile-ladder/plan-33/PROBES.md#"
PY = "doc:explorations/compile-ladder/plan-31/probes/probe-y.md#"
REH = "doc:explorations/compile-ladder/plan-31/probes/switch-rehearsal.md#"
CW = "doc:explorations/reviews/carriers-ways-2026-11-13.md#"
SPEC = "doc:Specification/"
_ROOT = os.environ.get('FORTRESS_HOME', os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../..')))
CHECK = True
# The record's one forks key, section 3's "Forks the batch takes" whole, which every rung reads.
FORKS_SECTION = REC + 'Forks the batch takes'
# G's key of the library's factory, which the record writes with the static parameters' backslashes (KEY_FIXES).
FACTORY_KEY = 'code:Library/FortressLibrary.fsi#__immutableFactory1['

S_BRIEFING = [
  ("P-33", "The order, and the selector with one build serving both libraries.", CHECK),
  ("P-37", "The prelude stays until the switch-over, and gains no declaration.", CHECK),
  ("F-353", "Probe Y's result, one build for two libraries.", CHECK),
  ("F-352", "The rehearsal's switch and its walls."),
  (PY + "2. How the library is selected", "The selector as probed, and what follows it.", CHECK),
  (PY + "3. The hacks", "The proper form of each of probe Y's shortcuts.", CHECK),
  (PY + "7. Doing it properly, in rungs", "The selector's rung as probe Y sized it."),
  (REH + "1. The switch itself", "The two lines that switch the compile command."),
  (PRB + "6. The selector", "What the selector alone compiles on this code, and where Arr stops.", CHECK),
  ('code:' + SRC + "Shell.java#public static void useCompilerLibraries", "Where the compiled path chooses its library.", CHECK),
  ('code:' + SRC + "compiler/WellKnownNames.java#public static boolean areCompilerLibraries", "The library's names."),
  ('code:' + SRC + "repository/ProjectProperties.java#public static final String CACHES", "Where the caches folder is set.", CHECK),
  ("map:modules-and-phases.md#B.13 Where each library enters", "Where each path reads its library."),
  (FORKS_SECTION, "The defaults you build.", CHECK),
]

D_BRIEFING = [
  ("P-167", "Walk's internal names are no types that a program sees.", CHECK),
  ("ledger:959", "The arm that takes every value, which closes.", CHECK),
  (SPEC + "basic/expressions/typecase.tex#Typecase Expressions", "What an arm's type is.", CHECK),
  ('code:' + SRC + "compiler/disambiguator/TypeDisambiguator.java#public Node forVarType(final VarType that)", "Where a type name is bound.", CHECK),
  ('code:' + SRC + "parser/DelimitedExpr.rats#typecase w a1:Expr w a2:(of / do / in) w a3:TypecaseClauses", "Where the arm is parsed."),
  ("map:modules-and-phases.md#B.4 Disambiguation", "The phase that both paths run."),
  ("F-361", "The merge's probe, which met this row."),
  (FORKS_SECTION, "The defaults you build.", CHECK),
]

V_BRIEFING = [
  ("P-60", "A comprises clause speaks of values, a where-clause type among its entries.", CHECK),
  ("ledger:812", "The generic member under a where-clause comprises, which closes.", CHECK),
  ("ledger:822", "The typecase in a generic function, which closes.", CHECK),
  ("F-34", "The measure, four of whose declarations are this kind.", CHECK),
  (REH + "3. The code generator over the library today, against F-34", "The four sites."),
  (SPEC + "basic/trait-parameters.tex#Where Clauses", "A where-clause variable's scope.", CHECK),
  (SPEC + "basic/expressions/typecase.tex#Typecase Expressions", "The arm's binding."),
  ('code:' + SRC + "compiler/codegen/CodeGen.java#public void forTypecase(Typecase x)", "The typecase's code.", CHECK),
  ('code:' + SRC + "scala_src/types/TypeAnalyzer.scala#is not in the kind env", "The lookup that stops.", CHECK),
  ("map:compile-path-walkthrough.md#5. Code generation", "How the code generator walks a generic declaration."),
  (FORKS_SECTION, "The defaults you build.", CHECK),
]

Q_BRIEFING = [
  ("P-146", "Self in a self-typed trait.", CHECK),
  ("P-60", "A comprises clause speaks of values."),
  ("ledger:1051", "The conditional's arm, which closes.", CHECK),
  ("ledger:1050", "The closure's result, which closes.", CHECK),
  ("ledger:1052", "The circular class load, which closes.", CHECK),
  ("ledger:991", "Rung K's cast at a returned value, the precedent."),
  ("doc:explorations/reviews/batch-31b-review.md#Part 5. What the batch after holds", "Where item 572 is met."),
  ("code:Library/FortressLibrary.fss#trait StandardTotalOrder", "The one library's site.", CHECK),
  ('code:' + SRC + "compiler/codegen/CodeGen.java#private void castToTypeBelow(Expr expr, Type declared)", "The cast at a returned value.", CHECK),
  ('code:' + SRC + "compiler/codegen/CodeGen.java#public void forIf(If x)", "The conditional.", CHECK),
  ('code:' + SRC + "compiler/codegen/CodeGen.java#public void forFnExpr(FnExpr x)", "The function expression; forLetFn beside it."),
  ('code:' + SRC + "runtimeSystem/MethodInstantiater.java#Class cl = Class.forName(new_owner_class_name, true, icl)", "The load of row 1052.", CHECK),
  (FORKS_SECTION, "The defaults you build.", CHECK),
]

I_BRIEFING = [
  ("P-60", "A comprises clause speaks of values; the typing by the intersection stays.", CHECK),
  ("ledger:540", "The method call on an intersection, which closes.", CHECK),
  (SPEC + "advanced/overloading.tex#Coercion and Overloading Resolution", "How a call's type is fixed."),
  ('code:' + SRC + "compiler/codegen/CodeGen.java#public void forMethodInvocation(MethodInvocation x)", "The dotted call.", CHECK),
  ('code:' + SRC + "compiler/codegen/CodeGen.java#private Type sanitizePossibleStupidIntersectionType(Type receiverType)", "Where the receiver's type is narrowed today.", CHECK),
  (REH + "3. The code generator over the library today, against F-34", "The library's site, __filter."),
  (FORKS_SECTION, "The defaults you build.", CHECK),
]

C_BRIEFING = [
  ("P-173", "A numeral converts where it stands; elsewhere it takes its default.", CHECK),
  ("P-148", "The checker's timing after a change.", CHECK),
  ("ledger:1005", "The subscript then superscript, which closes.", CHECK),
  ("ledger:1028", "The top-level variable made mutable by :=, which closes.", CHECK),
  ("ledger:1029", "The local tuple binding, which closes.", CHECK),
  ("ledger:1060", "The numeral at an untyped binding, which closes.", CHECK),
  (SPEC + "basic/operators/juxtameaning.tex#Juxtaposition", "A subscript and a superscript."),
  (SPEC + "basic/variables.tex#Top-Level Variable Declarations", ":= and var at the top level.", CHECK),
  (SPEC + "basic/variables.tex#Local Variable Declarations", "A tuple binding's names."),
  (SPEC + "basic/expressions/blocks.tex#Do Expressions", "A block's value and type."),
  ("map:compile-path-walkthrough.md#What it writes onto the tree", "What the checker writes onto the tree."),
  (FORKS_SECTION, "The defaults you build.", CHECK),
]

N_BRIEFING = [
  ("P-178", "The decision you build, its detail way D.", CHECK),
  ("P-37", "The prelude's second exception, and no stopgap.", CHECK),
  ("P-17", "Unboxed numbers, which the form leaves open.", CHECK),
  ("P-33", "One build serving both libraries.", CHECK),
  ("ledger:1003", "The prelude's open traits, which closes.", CHECK),
  ("ledger:866", "A program's object below ZZ32, which closes.", CHECK),
  ("ledger:995", "A carried type's two names, closed for the seven numbers.", CHECK),
  ("ledger:996", "The order of the code generator's output, under which you run the tests twice."),
  (CW + "Way C. The object's class carries the value, and the trait stays an interface", "The machinery and its three forms.", CHECK),
  (CW + "Way D. One object per type: each number trait merged with its one object", "The decision's detail.", CHECK),
  (PRB + "2. Form 2 for the prelude: what was built", "The probe's design, file by file.", CHECK),
  (PRB + "3. What ran", "The programs and the two runs of the tracks.", CHECK),
  (PRB + "4. What form 2 met, in the order met", "The three naming walls.", CHECK),
  (PRB + "5. The one library: the measure with form 2", "The seven objects emitted.", CHECK),
  (REH + "W12. A carried type has two names at run time", "The wall's first form."),
  ('code:' + SRC + "compiler/runtimeValues/FZZ32.java#public final class FZZ32", "Today's carrier.", CHECK),
  ('code:' + SRC + "compiler/codegen/CodeGen.java#public void forObjectDeclPrePass(ObjectDecl x)", "Where an object's class is written.", CHECK),
  ('code:' + SRC + "compiler/NamingCzar.java#private static void bl(APIName api, String str, String cl)", "The table of carried types.", CHECK),
  ("code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss#trait ZZ32 extends", "The prelude's text."),
  ("code:Library/FortressLibrary.fss#value object ZZ32 extends", "The one library's form, the precedent."),
  ("map:compile-path-walkthrough.md#6. The run: the second JVM and the class loader", "How a class is loaded and named at the run."),
  (FORKS_SECTION, "The defaults you build.", CHECK),
]

W_BRIEFING = [
  ("ledger:315", "The closure class written twice, which closes.", CHECK),
  (PRB + "11. Varargs", "The program, its two variants that compile, and the span.", CHECK),
  ('code:' + SRC + "compiler/NamingCzar.java#public static String gensymArrowClassName(String desc, Span sp)", "Where the name is made.", CHECK),
  ('code:' + SRC + "compiler/codegen/CodeGen.java#public void forFnExpr(FnExpr x)", "Its caller, which run 1's rung Q edited."),
  (REH + "W10. A closure class written twice into the jar", "The library's site, on the path of = on two integers."),
  ("ledger:996", "The order of the code generator's output, on which the name must not depend."),
  (REC + "S. The library selector", "The selector under which the test compiles."),
  (FORKS_SECTION, "The defaults you build.", CHECK),
]

G_BRIEFING = [
  ("P-37", "The prelude gains no declaration, so no array type there.", CHECK),
  ("F-86", "The checker types the parameter as ImmutableArray[\\T, ZZ32\\] and applies the expansion rule.", CHECK),
  ("ledger:624", "The refusal, which closes under the selector.", CHECK),
  ("ledger:604", "The checker's refusal under the prelude, which stays."),
  (SPEC + "basic/functions.tex#Function Declarations", "The parameter's type, and the revival callout that names the array.", CHECK),
  (SPEC + "basic/functions.tex#Function Applications", "Which arguments the parameter holds, in order.", CHECK),
  (SPEC + "basic/overloading.tex#Applicability for Functionals with Varargs and Keyword Parameters", "The expansion rule that a dispatch method follows.", CHECK),
  ('code:' + SRC + "interpreter/evaluator/values/NonPrimitive.java#private Environment buildEnvFromParams", "Walk's way, the precedent.", CHECK),
  (FACTORY_KEY, "The library's factory that walk calls."),
  ('code:' + SRC + "compiler/NamingCzar.java#private static String makeUnboxedTupleDescriptor", "One of the four refusals.", CHECK),
  ('code:' + SRC + "compiler/OverloadSet.java#public static String getSignature(IntersectionType t, int paramCount, TypeAnalyzer ta)", "A dispatch method's signature by arity."),
  (PRB + "11. Varargs", "The stand-in, the test and the measure.", CHECK),
  (REH + "W8. ", "println's path through the stream's varargs methods."),
  (REC + "S. The library selector", "The selector under which the test compiles."),
  (FORKS_SECTION, "The defaults you build.", CHECK),
]

R_BRIEFING = [
  ("P-148", "The checker's timing, if your edit is in its code."),
  ("ledger:942", "The overload beside an inherited method, which closes.", CHECK),
  ("ledger:940", "The call at an assumed api trait, which closes.", CHECK),
  ("ledger:733", "An older row of the same family."),
  (REH + "W3. 'Not in the trait table' (row 942), and the team's search hack", "The wall under the switch.", CHECK),
  (PRB + "6. The selector", "Row 1061 and its stack.", CHECK),
  ('code:' + SRC + "scala_src/typechecker/TraitTable.scala#A terrible search hack", "The team's search.", CHECK),
  ('code:' + SRC + "scala_src/useful/STypesUtil.scala#def allMethodsNotIdenticallyCovered", "The gathering of a trait's methods.", CHECK),
  ('code:' + SRC + "compiler/codegen/CodeGen.java#methodsNamed(TraitType t, IdOrOp name, int selfIndex) {", "The code generator's use of it."),
  (SPEC + "basic/traits.tex#Method Declarations", "What a trait's declaration does to an inherited one.", CHECK),
  ("map:compile-path-walkthrough.md#5. Code generation", "How the code generator walks an object."),
  (REC + "S. The library selector", "What run 1 landed, under which row 1061's test runs."),
  (FORKS_SECTION, "The defaults you build.", CHECK),
]

# A key of the record's section 1 that this file holds in another form: {record's key: (this file's key, reason)}.
KEY_FIXES = {
  "code:Library/FortressLibrary.fsi#__immutableFactory1[\\T, nat b0, nat s0\\]()": (FACTORY_KEY,
    "G's key holds two backslashes, which the script refuses in a key; its stem matches the same one line, 1798."),
}

# The two runs of the record, each in the manifest's order (section 1's table).
RUNS = {'1': ('S', 'D', 'V', 'Q', 'I', 'C'), '2': ('N', 'W', 'G', 'R')}
ORDER = RUNS['1'] + RUNS['2']
_B = {'S': S_BRIEFING, 'D': D_BRIEFING, 'V': V_BRIEFING, 'Q': Q_BRIEFING, 'I': I_BRIEFING, 'C': C_BRIEFING,
      'N': N_BRIEFING, 'W': W_BRIEFING, 'G': G_BRIEFING, 'R': R_BRIEFING}
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
    assert run is None or run in RUNS, 'usage: lists33.py [--run 1|2]'
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
