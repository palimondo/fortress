# The briefing and checks lists of climb batch 25's rungs (CLIMB-BATCH-25.md, section 3), made from
# plan-24/manifest/lists24.py for the batch workflow (explorations/coordinator/process-engineering/batch-redesign.md,
# "The brief"): each list holds what the rung's section cites, the decisions, the ledger rows, the notes and the code
# it rests on, and no process position or harness fact, which the brief's role text and the fortress-repo skill carry.
# POSITIONS and FACTS entries are keyed by their numbers. Each briefing entry is a pair: its facts-extract.sh key and
# one line on why it is there. A checks list is a sub-list of its briefing's keys, read by the skeptic, a repair
# round and a judge. The record's section 5, "The briefings, rung by rung", holds the same keys. No key holds a
# backslash, a backtick or a double quote, which the script refuses; facts-extract matches a heading without its
# backticks.
# The rungs, in the manifest's order, which is the gather's applied order: D, P, A, R, U, N, C (the record's fork 1).
# D, P and N have the planner's samples (plan-25/probes/sample-D.patch, sample-P.patch, sample-N.patch); A, R and U
# its whole texts (rung-A.patch, rung-R.patch, rung-U.patch); C none.
# U also carries PLAN's list "Climb batch 24, listed for his review" and rows 865 and 866: the steps PLAN owes the next rung
# that edits the rewrite (the Fable review's change of 2026-11-02).
# `python3 -B lists25.py` checks every key with facts-extract.sh --check (each must match exactly one place) and every
# reason's form; it is run again on the tree the batch is cut from.
import os
SRC = 'ProjectFortress/src/com/sun/fortress/'
P25 = "doc:explorations/compile-ladder/plan-25/probes/"
REC = "doc:explorations/coordinator/CLIMB-BATCH-25.md#"
_ROOT = os.environ.get('FORTRESS_HOME', os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../..')))
GUARD_WALK = ("doc:ProjectFortress/tests/NativeHelperFamilyZZ32Walk.fss", "Climb batch 23's walk guard, the form of yours: every moved binding called on chosen values, each result asserted.")
GUARD_COMPILED = ("doc:ProjectFortress/compiler_tests/NativeHelperBindingCompiled.fss", "A compiled program whose own declarations bind helpers, the form of your compiled guard.")
GUARD_NN64_WALK = ("doc:ProjectFortress/tests/NativeHelperFamilyNN64Walk.fss", "Climb batch 24's walk guard of NN64, values above the signed half asserted: the form of yours.")
GUARD_NN64_COMPILED = ("doc:ProjectFortress/compiler_tests/NativeHelperFamilyNN64Compiled.fss", "Climb batch 24's compiled guard of NN64, an NN64 carried in a ZZ64: the form of your compiled guards.")
PROBES = (REC + "The planner's probes", "The planner's measurements on this base: the values under walk, the stages, the control, the compiled sample and the texts together.")
FORKS = (REC + "Forks the batch takes, none consequential", "The defaults your rung builds, each with the ways not taken.")

D_BRIEFING = [
  ("P-58", "The decision your rung carries on: each binding's string names a helper, checked by the compiled checker from the step that moves it."),
  ("F-303", "Float's 30 bindings that name helpers since climb batch 24, and its 32 still on glue classes, 27 of which your rung moves."),
  ("F-299", "Walk's loader of a helper string: the overload whose Java types carry the declared types, self first."),
  ("P-29", "Walk's speed is irrelevant to every judgement of performance: the reflective call weighs nothing."),
  ("ledger:672", "A float compared with a not-a-number value: contested, so your guard asserts no such comparison, of =/=, MIN or MAX."),
  ("ledger:330", "The float rounding operators' values at a not-a-number value and the infinities, which your guard leaves out."),
  (P25 + "sample-D.patch", "The planner's sample of your text: five of your 28 helpers and strings, at the class's end, as measured."),
  PROBES,
  FORKS,
  ("code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object Float extends RR64", "Walk's float object, whose 27 glue bindings your rung moves."),
  GUARD_WALK,
  GUARD_COMPILED,
]
D_CHECKS = ["P-58", "F-303", "ledger:672", P25 + "sample-D.patch", REC + "The planner's probes",
  "code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object Float extends RR64"]

P_BRIEFING = [
  ("P-58", "The decision your rung carries on: each binding's string names a helper, checked by the compiled checker from the step that moves it."),
  ("F-299", "Walk's loader of a helper string, which carries a declared RR32 in a Java float."),
  ("F-303", "Float's family of climb batch 24, the model of your RR32 family, and the carry of a declared Float."),
  ("ledger:672", "A float compared with a not-a-number value: contested, so your guard asserts no such comparison."),
  ("ledger:330", "The float rounding operators' values at a not-a-number value and the infinities, which your guard leaves out."),
  (P25 + "sample-P.patch", "The planner's sample of your text: the new class with three of your 49 helpers and strings, as measured."),
  PROBES,
  FORKS,
  ("code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object RR32 extends", "Walk's 32-bit float object, whose 49 glue bindings your rung moves."),
  ("code:" + SRC + "interpreter/glue/StaticNativeApp.java#static Class<?> javaFor(String t)", "The loader's table of the declared types it carries: RR32 in a float."),
  GUARD_WALK,
  GUARD_COMPILED,
]
P_CHECKS = ["P-58", "F-299", "ledger:672", P25 + "sample-P.patch", REC + "The planner's probes",
  "code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object RR32 extends"]

A_BRIEFING = [
  ("P-58", "The decision your rung carries on: each binding's string names a helper, checked by the compiled checker from the step that moves it."),
  ("F-303", "Walk carries a Float and an RR64 alike in a double, so an asFloat at RR64 answers the same Float object."),
  ("F-299", "Walk's loader of a helper string, and the bindings that name helpers today."),
  ("F-308", "The rewrite's transfers, through which NN32's asFloat reads at its declared type."),
  (P25 + "rung-A.patch", "Your text as the planner measured it: five headers at RR64, five strings and two new helpers."),
  PROBES,
  FORKS,
  ("code:Library/FortressLibrary.fsi#abstract asFloat(self): RR64", "The library's abstract asFloat on Number, at RR64, the type your five declarations take."),
  ("code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object Int extends ZZ32", "Walk's object Int, whose asFloat is one of your five."),
  GUARD_WALK,
  GUARD_COMPILED,
]
A_CHECKS = ["P-58", "F-303", P25 + "rung-A.patch", REC + "The planner's probes", REC + "Forks the batch takes, none consequential",
  "code:Library/FortressLibrary.fsi#abstract asFloat(self): RR64"]

R_BRIEFING = [
  ("P-58", "The decision your rung carries on: each binding's string names a helper, checked by the compiled checker from the step that moves it."),
  ("F-24", "Walk raises a helper's DivisionByZero as the library's own, where a glue class's Java exception ends the run."),
  ("F-306", "The 64-bit and big integers' bindings that name helpers since climb batch 24, and their REM and MOD still on glue classes."),
  ("F-308", "The rewrite's transfers, through which NN32's and NN64's REM and MOD read at their declared types."),
  ("ledger:336", "Your first row: REM and MOD by zero on ZZ32 and ZZ64 end the run, which your helpers turn into DivisionByZero."),
  ("ledger:848", "Your second row: the same on NN32, NN64 and ZZ."),
  (P25 + "rung-R.patch", "Your text as the planner measured it: ten new helpers after each class's division helper, and ten strings."),
  PROBES,
  FORKS,
  ("code:Library/FortressLibrary.fss#trait ZZ32 extends", "Trait ZZ32, whose REM and MOD your rung moves, beside the GCD and LCM of rung N."),
  ("doc:ProjectFortress/tests/XXXZZ64RemainderByZeroWalk.fss", "Row 336's XXX test, which your fix promotes, the form of your three new division tests."),
  ("doc:Specification/basic/operators/opr-overview.tex#Multiplication, Division, Modulo, and Remainder Operators", "What the specification says of REM, MOD and division by zero, which your tests cite."),
  GUARD_WALK,
  GUARD_COMPILED,
]
R_CHECKS = ["P-58", "F-24", "ledger:336", "ledger:848", P25 + "rung-R.patch", REC + "The planner's probes",
  "doc:Specification/basic/operators/opr-overview.tex#Multiplication, Division, Modulo, and Remainder Operators"]

U_BRIEFING = [
  ("P-58", "The decision your rung carries on: each binding's string names a helper, checked by the compiled checker from the step that moves it."),
  ("F-308", "The rewrite's transfers for NN32, NN64 and Char, which your rung gives to UnsignedLong's self, and the six bindings left."),
  ("F-298", "The compiled rewrite of a helper string into a call, which reads the declared types."),
  ("ledger:326", "Your first row: the compiled path prints an NN32 or NN64 above its signed half as negative, by a helper and the run time."),
  ("ledger:860", "Your second row: the NN64 wraparound negation helper answers its operand; its XXX pair is yours to promote."),
  ("ledger:861", "Why Char's asExprString stays on its glue class: its form is open."),
  ("ledger:865", "Row 865, whose XXX compile test you write: a helper string in a local function is not rewritten on the compiled path."),
  ("ledger:866", "Row 866, whose XXX run pair you write: a program's object that extends ZZ32 compiles and dies at class load."),
  (P25 + "rung-U.patch", "Your text as the planner measured it: the helpers and run time fixed, the rewrite's condition and five strings."),
  PROBES,
  FORKS,
  ("doc:explorations/coordinator/PLAN.md#Climb batch 24, listed for his review", "The steps PLAN owes the next rung that edits the rewrite: the seven limits to probe, and the tests owed for rows 865 and 866."),
  ("code:" + SRC + "compiler/BuiltinPrimitiveRewriter.java#private static String transfer(String declared, Class<?> c, String helper, boolean result)", "Where the rewrite picks a transfer by the declared type, the place of your condition."),
  ("code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object UnsignedLong extends NN64", "Walk's object of NN64, whose three bindings your rung moves."),
  ("doc:ProjectFortress/compiler_tests/XXXNN64WrappingNegationHelperCompiled.fss", "Row 860's compiled XXX program, which your fix promotes with its link test."),
  GUARD_NN64_WALK,
  GUARD_NN64_COMPILED,
]
U_CHECKS = ["P-58", "F-308", "ledger:326", "ledger:860", P25 + "rung-U.patch", REC + "The planner's probes",
  "doc:explorations/coordinator/PLAN.md#Climb batch 24, listed for his review",
  "code:" + SRC + "compiler/BuiltinPrimitiveRewriter.java#private static String transfer(String declared, Class<?> c, String helper, boolean result)"]

N_BRIEFING = [
  ("P-58", "The decision your rung carries on: each binding's string names a helper, checked by the compiled checker from the step that moves it."),
  ("P-70", "GCD and LCM give nonnegative results and raise IntegerOverflow where the result does not fit: the values your helpers give."),
  ("P-73", "Fixed-width arithmetic raises IntegerOverflow where its result does not fit, CHOOSE included."),
  ("F-305", "The CHOOSE helpers of ZZ32 and ZZ64, fixed in climb batch 24 to keep no state between calls, the model of yours."),
  ("F-308", "The rewrite's transfers, through which the NN32 and NN64 bindings read at their declared types."),
  ("ledger:855", "The race of a CHOOSE helper's static scratch array, which your helpers must not bring back."),
  (P25 + "sample-N.patch", "The planner's sample of your text: five of your 18 helpers and strings, at the classes' ends, as measured."),
  PROBES,
  FORKS,
  ("code:Library/FortressLibrary.fss#trait ZZ extends { AnyIntegral", "Trait ZZ, whose cmp, GCD, LCM and CHOOSE your rung moves."),
  GUARD_WALK,
  GUARD_COMPILED,
]
N_CHECKS = ["P-58", "P-70", "P-73", P25 + "sample-N.patch", REC + "The planner's probes"]

C_BRIEFING = [
  ("F-34", "The code generator's refusals over the library's twelve components, which your rung cuts by four declarations."),
  ("ledger:820", "Your first row: a trait or object extending a generic trait at the static argument Any."),
  ("ledger:821", "Your second row: a try with a forbid clause."),
  ("ledger:823", "Your third row: a function declared with the modifier test."),
  ("ledger:650", "The modifier guard's row for override, beside row 823's test modifier."),
  PROBES,
  FORKS,
  ("doc:explorations/perf-probes/codegen-distance/REPORT.md#3. The kinds of refusal", "The 14 kinds as the probe of 2026-10-23 named them, with the reproductions of row 820's form."),
  ("doc:Specification/basic/expressions/try.tex#Try Expressions", "What a forbid clause does: the ForbiddenException your forTry must throw."),
  ("code:" + SRC + "compiler/codegen/CodeGen.java#public void forTry(Try x)", "Where the forbid clause is refused today, your second change."),
]
C_CHECKS = ["F-34", "ledger:820", "ledger:821", "ledger:823", REC + "The planner's probes",
  "doc:Specification/basic/expressions/try.tex#Try Expressions"]

ORDER = ('D', 'P', 'A', 'R', 'U', 'N', 'C')
_B = {'D': (D_BRIEFING, D_CHECKS), 'P': (P_BRIEFING, P_CHECKS), 'A': (A_BRIEFING, A_CHECKS), 'R': (R_BRIEFING, R_CHECKS),
      'U': (U_BRIEFING, U_CHECKS), 'N': (N_BRIEFING, N_CHECKS), 'C': (C_BRIEFING, C_CHECKS)}
IDS = tuple(r for r in ORDER if _B[r][0])
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
