# The briefing and checks lists of climb batch 24's rungs (CLIMB-BATCH-24.md, section 3), made from
# plan-23/manifest/lists23.py for the batch workflow (explorations/coordinator/process-engineering/batch-redesign.md,
# "The brief"): each list holds what the rung's section cites, the decisions, the ledger rows, the notes and the code
# it rests on, and no process position or harness fact, which the brief's role text and the fortress-repo skill carry.
# POSITIONS and FACTS entries are keyed by their numbers. Each briefing entry is a pair: its facts-extract.sh key and
# one line on why it is there. A checks list is a sub-list of its briefing's keys, read by the skeptic, a repair
# round and a judge. The record's section 5, "The briefings, rung by rung", holds the same keys. No key holds a
# backslash, a backtick or a double quote, which the script refuses; facts-extract matches a heading without its
# backticks.
# The rungs, in the order the gather applies them: F, Z, S, K, W, G. K is the CHOOSE rung, on the CHOOSE probe's
# finding (plan-24/probes/choose.md, its patch choose.patch beside it): both helpers fixed, both bindings moved.
# H is the place kept for the hard set's rung (plan-24/probes/hard-set.md):
# nothing is planned for it, its lists are empty, and gen24.py takes H only once the record's section 3 and
# section 5 hold its blocks and H_BRIEFING below holds its keys.
# `python3 -B lists24.py` checks every key with facts-extract.sh --check (each must match exactly one place) and every
# reason's form; it is run again on the tree the batch is cut from.
import os
SRC = 'ProjectFortress/src/com/sun/fortress/'
P24 = "doc:explorations/compile-ladder/plan-24/probes/"
REC = "doc:explorations/coordinator/CLIMB-BATCH-24.md#"
GUARD_WALK = ("doc:ProjectFortress/tests/NativeHelperFamilyZZ32Walk.fss", "Climb batch 23's walk guard, the form of yours: every moved binding called on chosen values, each result asserted.")
GUARD_COMPILED = ("doc:ProjectFortress/compiler_tests/NativeHelperBindingCompiled.fss", "A compiled program whose own declarations bind helpers, the form of your compiled guard.")
_ROOT = os.environ.get('FORTRESS_HOME', os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../..')))
CHOOSE_NOTE = 'explorations/compile-ladder/plan-24/probes/choose.md'
CHOOSE_PATCH = 'explorations/compile-ladder/plan-24/probes/choose.patch'

F_BRIEFING = [
  ("P-58", "The decision your rung carries on: each binding's string names a helper, checked by the compiled checker from the step that moves it."),
  ("F-299", "Walk's loader of a helper string, which refuses a declared type that no Java type carries: why Float needs its one line."),
  ("F-298", "The compiled rewrite that reads your 30 strings against their helpers' Java signatures in the distance stage."),
  ("P-29", "Walk's speed is irrelevant to every judgement of performance: the reflective call weighs nothing."),
  ("P-30", "The quick microGPT check under walk, whose float arithmetic runs through your helpers after the landing."),
  ("P-68", "Why truncate and round move now at ZZ64, and the later rung that gives them ZZ."),
  ("ledger:672", "A float compared with a not-a-number value: contested, so your guard asserts no such comparison."),
  ("ledger:330", "The float rounding operators' types, and their values at a not-a-number value and the infinities, which your guard leaves out."),
  (P24 + "rung-F.patch", "Your text as the planner measured it: the one line of the loader and the 30 strings."),
  (REC + "The planner's probes", "The family's values on the old code and the text, the stages, walk's suite and the compiled sample."),
  (REC + "Forks the batch takes, none consequential", "The defaults your rung builds, each with the ways not taken."),
  ("code:" + SRC + "interpreter/glue/StaticNativeApp.java#static Class<?> javaFor(String t)", "The loader's table of the declared types it carries, where Float joins RR64."),
  ("code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object Float extends RR64", "Walk's float object, whose 30 bindings your family moves."),
  GUARD_WALK,
  GUARD_COMPILED,
]
F_CHECKS = [
  "P-58", "F-299", "ledger:672", P24 + "rung-F.patch", REC + "The planner's probes",
  "code:" + SRC + "interpreter/glue/StaticNativeApp.java#static Class<?> javaFor(String t)",
]

Z_BRIEFING = [
  ("P-58", "The decision your rung carries on: each binding's string names a helper, checked by the compiled checker from the step that moves it."),
  ("F-299", "Walk's loader of a helper string, and its raise of a helper's DivisionByZero as the library's."),
  ("F-32", "The bindings and their classes, whose count your family changes."),
  ("ledger:336", "Your first row: walk's divisions by zero that end the run, of which your family fixes ZZ64's and ZZ's DIV."),
  ("ledger:848", "Its sibling row, which the batch that edits row 336 gives its XXX test."),
  (P24 + "rung-Z.patch", "Your text as the planner measured it: the 36 strings of ZZ64 and ZZ."),
  (REC + "The planner's probes", "The family's values on the old code and the text, the divisions by zero, the stages and the compiled sample."),
  (REC + "Forks the batch takes, none consequential", "The defaults your rung builds, each with the ways not taken."),
  ("code:Library/FortressLibrary.fss#trait ZZ64 extends", "Trait ZZ64, whose 20 bindings your family moves, CHOOSE left to rung K."),
  ("code:Library/FortressLibrary.fss#trait ZZ extends { AnyIntegral", "Trait ZZ, whose 16 bindings your family moves."),
  ("doc:ProjectFortress/tests/ZZ32DivisionByZeroWalk.fss", "Climb batch 23's division test, the form of your two."),
  ("doc:Specification/basic/operators/opr-overview.tex#Multiplication, Division, Modulo, and Remainder Operators", "What the specification says of integer division by zero, which your division tests cite."),
  GUARD_WALK,
  GUARD_COMPILED,
]
Z_CHECKS = [
  "P-58", "ledger:336", "ledger:848", P24 + "rung-Z.patch", REC + "The planner's probes",
  "code:Library/FortressLibrary.fss#trait ZZ64 extends",
]

S_BRIEFING = [
  ("P-58", "The decision your rung carries on: each binding's string names a helper, checked by the compiled checker from the step that moves it."),
  ("F-299", "Walk's loader of a helper string, and how it carries NN32, NN64 and Char in int and long."),
  ("ledger:846", "Why the two top-level bindings declared over String stay on their glue classes."),
  ("ledger:502", "The open question on a conversion out of range, the sibling of signed above the signed half, which your guard leaves out."),
  ("ledger:856", "Signed above the signed half, which wraps: your test of today's value is its reproducer."),
  ("ledger:857", "Char of a code point out of range, which passes: your test of today's value is its reproducer."),
  (P24 + "rung-S.patch", "Your text as the planner measured it: the 8 strings."),
  (REC + "The planner's probes", "The small rest's values on the old code and the text, the stages and the compiled sample."),
  (REC + "Forks the batch takes, none consequential", "The defaults your rung builds, each with the ways not taken."),
  ("code:" + SRC + "interpreter/glue/StaticNativeApp.java#static FValue box(Class<?> c, String declared, Object r)", "How the loader answers an int as NN32 or Char and a long as NN64, by the declared result."),
  ("code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object Long extends ZZ64", "Walk's object Long, whose two getters your rung moves."),
  ("code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object BigNum extends ZZ", "Walk's object BigNum, whose two getters your rung moves."),
  GUARD_WALK,
  GUARD_COMPILED,
]
S_CHECKS = [
  "P-58", "F-299", P24 + "rung-S.patch", REC + "The planner's probes",
]

K_BRIEFING = [
  ("P-58", "The decision your rung carries on: each binding's string names a helper, checked by the compiled checker from the step that moves it."),
  ("P-73", "Fixed-width arithmetic raises IntegerOverflow where its result does not fit, CHOOSE included: the value your helpers must give."),
  ("ledger:521", "Your first row: the CHOOSE helpers end the run past their table, which your fix turns into IntegerOverflow."),
  ("ledger:855", "Your second row: the helpers' slow paths share one static scratch array across parallel calls."),
  ("doc:" + CHOOSE_NOTE, "The CHOOSE probe's finding: the specification's answer, walk's glue, the helper's two faults, the fix and its measurements."),
  ("doc:" + CHOOSE_PATCH, "The CHOOSE probe's patch, the text your rung takes for ZZ32: the helper's bound and its scratch array, with three tests."),
  ("code:" + SRC + "nativeHelpers/simpleIntArith.java#public static int intOverflowingChoose(int n, int k)", "The ZZ32 helper, whose bound on k is past its table."),
  ("code:" + SRC + "nativeHelpers/simpleLongArith.java#public static long longOverflowingChoose(long n, long kk)", "The ZZ64 helper, with the same two faults and no patch: yours to fix in the patch's form."),
  ("doc:ProjectFortress/compiler_tests/XXXChooseTableCompiledRungE.fss", "The compiled XXX test your fix promotes, which asserts both helpers, with its link test beside it."),
  (REC + "The planner's probes", "What the planner read of the helpers and what the probe measured."),
  (REC + "Forks the batch takes, none consequential", "The defaults your rung builds, each with the ways not taken."),
]
K_CHECKS = ["P-58", "ledger:521", "ledger:855", "doc:" + CHOOSE_PATCH,
  "code:" + SRC + "nativeHelpers/simpleIntArith.java#public static int intOverflowingChoose(int n, int k)"]

W_BRIEFING = [
  ("P-58", "The decision whose walk half your rung completes: walk loads the helper that fits the declaration, self included."),
  ("F-299", "Walk's loader as it stands: it reads a method's self only by the helper's Java type."),
  ("ledger:847", "Your row, which the gather closes with your commit."),
  (P24 + "rung-W.patch", "Your text as the planner measured it with the three families: the declaring type told to the loader and checked."),
  (REC + "The planner's probes", "The prototype's tests, the four texts together under walk's suite and the families' values."),
  (REC + "Forks the batch takes, none consequential", "The defaults your rung builds, each with the ways not taken."),
  ("code:" + SRC + "interpreter/glue/StaticNativeApp.java#static Object find(String s, Applicable defn)", "Where the loader picks the helper's overload, and where your check of self goes."),
  ("code:" + SRC + "interpreter/glue/NativeApp.java#public static Applicable checkAndLoadNative(Applicable defn, boolean isFunctionalMethod)", "Walk's native loader, which is told no declaring type today."),
  ("code:" + SRC + "interpreter/evaluator/values/MethodClosure.java#public MethodClosure(Environment within, Applicable fndef, FType definer)", "A dotted method's closure, which knows its declaring type."),
  ("code:" + SRC + "interpreter/evaluator/values/FunctionalMethod.java#public FunctionalMethod(Environment e,", "A functional method's closure, which knows its self type."),
  ("doc:ProjectFortress/tests/XXXNativeHelperUncarriedSelfWalk.fss", "Row 847's XXX test, which your fix promotes."),
]
W_CHECKS = [
  "P-58", "ledger:847", P24 + "rung-W.patch", REC + "The planner's probes",
  "code:" + SRC + "interpreter/glue/StaticNativeApp.java#static Object find(String s, Applicable defn)",
]

G_BRIEFING = [
  ("P-151", "The where-clause forms the tree builds, which the code generator must now emit."),
  ("F-181", "The code generator's refusal of a header where clause and of a contract, which your rung halves."),
  ("ledger:701", "Your row, rewritten to its contract half once you land."),
  ("ledger:307", "The row whose second wall your rung uncovers: a size read off a value at a call, the VerifyError behind the clause."),
  ("ledger:812", "A crash before the refusal, on a trait listing a type at a where-clause variable, which stays."),
  (REC + "The planner's probes", "The four programs compiled and run with the three guards dropped, and what each did."),
  (REC + "Forks the batch takes, none consequential", "The defaults your rung builds, each with the ways not taken."),
  ("code:" + SRC + "compiler/codegen/CodeGen.java#public void forFnDecl(FnDecl x)", "The function and method guard, the first of your three; the object and trait guards are cited by line in your section."),
  ("doc:ProjectFortress/compiler_tests/XXXWhereBoundChecker.fss", "Row 701's compile XXX test for a function, which your rung promotes."),
  ("doc:ProjectFortress/compiler_tests/XXXNatOpenRun.fss", "Row 701's compile XXX test for a trait, which your rung turns into a run pair for row 307."),
]
G_CHECKS = [
  "P-151", "ledger:701", "ledger:307", REC + "The planner's probes",
  "code:" + SRC + "compiler/codegen/CodeGen.java#public void forFnDecl(FnDecl x)",
]

# The place kept for the hard set's rung: filled only after plan-24/probes/hard-set.md lands and the record's
# section 3 and section 5 hold H's blocks.
H_BRIEFING = []
H_CHECKS = []

ORDER = ('F', 'Z', 'S', 'K', 'W', 'G', 'H')
_B = {'F': (F_BRIEFING, F_CHECKS), 'Z': (Z_BRIEFING, Z_CHECKS), 'S': (S_BRIEFING, S_CHECKS),
      'K': (K_BRIEFING, K_CHECKS), 'W': (W_BRIEFING, W_CHECKS), 'G': (G_BRIEFING, G_CHECKS),
      'H': (H_BRIEFING, H_CHECKS)}
IDS = tuple(r for r in ORDER if _B[r][0])          # H drops out while its list is empty
LISTS = {r: ([k for k, _ in _B[r][0]], _B[r][1]) for r in IDS}
REASONS = {r: _B[r][0] for r in IDS}


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
