#  The briefing and checks lists of climb batch 20's two rungs, I and A
# (CLIMB-BATCH-20.md, section 3), in batch 19's form (explorations/compile-ladder/plan-19/manifest/lists19.py) for
# the batch workflow (explorations/coordinator/process-engineering/batch-redesign.md, "The brief"): each list holds
# what the rung's section cites, the decisions, the ledger rows, the specification's sections, the notes and the
# code it rests on, and no process position or harness fact, which the brief's role text and the fortress-repo skill
# carry. POSITIONS and FACTS entries are keyed by their numbers. Each briefing entry is a pair: its facts-extract.sh
# key and one line on why it is there. A checks list is a sub-list of its briefing's keys, read by the skeptic, a
# repair round and a judge. The record's section 5, "The briefings", holds the same keys. No key holds a backslash,
# a backtick or a double quote, which the script refuses; facts-extract matches a heading without its backticks.
# `python3 -B lists20.py` checks every key with facts-extract.sh --check (each must match exactly one place) and every
# reason's form; it is run again on the tree the batch is cut from.
SRC = 'ProjectFortress/src/com/sun/fortress'
PRIM = SRC + '/interpreter/glue/prim'
FL = 'Library/FortressLibrary.fss'
FLI = 'Library/FortressLibrary.fsi'

IP = "doc:explorations/perf-probes/integer-power/REPORT.md#"
FJ = "doc:explorations/reviews/integer-power-fable-judgement.md#"
AS = "doc:explorations/perf-probes/array-sites/REPORT.md#"
AW = "doc:explorations/reviews/array-sites-ways.md#"
CHG = "doc:Specification/appendices/changes.tex#"

I_BRIEFING = [
  ("P-153", "The decision your rung builds: contract E, each integer power at its own type, an error where the result is no integer, a fraction from a float or rational base."),
  ("P-26", "Why the integer type at a signed exponent: the team's later code types an integer power so, and its later word outweighs the early text."),
  ("P-80", "The library tests a sign at run time, as the contract's negative branch does, since no type carries it."),
  ("P-73", "Fixed-width overflow raises IntegerOverflow under walk: the exception your negative branch raises where the result is no integer."),
  ("P-76", "A numeral's type is IntLiteral, and under walk a numeral is a ZZ32 value: why IntLiteral's power answers IntLiteral and is rarely reached."),
  ("F-241", "The measurement your library half builds: the declared RR64 holds five sites, and strToInt's sixth needs the typed fail too."),
  ("F-247", "Walk's values: the natives answer the integer already, and only three team tests and two demos reach a negative exponent."),
  ("F-262", "No overload on a numeral exponent's type can tell 10^16 from 10^(-16): why the split is on the base."),
  ("ledger:438", "Your first row: the library declares every integer power RR64 where its natives answer the integer."),
  ("ledger:441", "A negative power had no specified result and the paths differ: its specification half is yours, its compiled half stays."),
  ("ledger:445", "The rational power's api exponent, its recursion on an unsigned exponent, and the natives' refusal of a ZZ exponent: all three yours."),
  ("ledger:747", "The checker's gap at strToInt's fail, which the library's typed fail removes from the distance but not from the checker."),
  ("ledger:523", "The compiled path's own power helper, which answers 0 at a negative exponent until phase 4's natives: not yours, noted."),
  (IP + "In short", "The probe in one page: the six sites' three causes, the census of uses, the four contracts measured."),
  (IP + "1.1 The declarations", "Every integer power declaration and its native, with walk's values on the base."),
  (IP + "1.3 Walk's tests", "The walk tests that reach an integer power, the eleven negative-exponent sites in three team tests among them."),
  (IP + "3.1 E and Z", "Contract E's library text, its natives' negative branch, and its measurement: sites, walk tests, microGPT, cost."),
  (IP + "4. QQ's body", "The library's own typecase for any integer, which QQ's power takes, and what it does to row 445."),
  (IP + "7. Defects and findings", "Row 747's shape and reproducer, and the notes the probe gave rows 441 and 445."),
  (IP + "8. Decisions", "The probe's choices and the ways not taken: E's exceptions, the test set, one distance run for E and Z."),
  (FJ + "5. The least bad mix", "Why E over Z, R and X, by the team's later word, the library as written and the peers."),
  (FJ + "6. The recommendation and the default", "The default P-153 took, item by item, with its cost."),
  ("doc:explorations/compile-ladder/plan-20/probes/power.patch", "Your library text as the planner measured it on this base: the probe's E text, the typed fail and the three api lines."),
  (CHG + "The integer trait", "The Appendix I entry whose Rationale and Effect your rung corrects: the power answered a float, the negative case not given."),
  (CHG + "Passages not yet revised", "The list whose sentence on the negative power your rung makes false."),
  ("doc:Specification/basic/operators/opr-overview.tex#Exponentiation", "The operators chapter's exponentiation, whose sentence on numerals you leave and list."),
  ("code:" + PRIM + "/Int.java#public static final class Pow extends NativeMeth1", "The ZZ32 power native, whose negative branch answers a float today: the shape of all six."),
  ("code:" + PRIM + "/Int.java#public static FortressError overflow()", "The file's way to raise a library exception from a native, which the DivisionByZero helper follows."),
  ("code:" + PRIM + "/BigNum.java#public static abstract class ZL2N extends NativeMeth1", "One of the six exponent readers, by getLong, which a ZZ refuses: row 445's part (1)."),
  ("code:" + FL + "#    opr ^(self, other:AnyIntegral):QQ =", "QQ's power today, the four sites, with the negation that recurses on an unsigned exponent."),
  ("code:" + FL + "#opr ^(self, b:AnyIntegral):RR64 = (asFloat(self))^b", "RR64's power over any integer, which its api lacks and fork 7 declares there."),
  ("code:" + FLI + "#trait MultiplicativeRing[", "The api's ring, whose power you make abstract over any integer as its one and TIMES are."),
  ("code:" + FL + "#strToInt(s: String, radix: ZZ32): ZZ32", "strToInt's SUM over a power with an untyped fail: the sixth site."),
  ("code:ProjectFortress/tests/PowChooseLcmRungE.fss#overflows(f: () -> Any): Boolean", "The revival's overflow helper for power tests, the shape of your test's checks."),
  ("doc:ProjectFortress/tests/compoundArray.fss", "One of the three team tests you respell with a float base, its values printed."),
  ("doc:ProjectFortress/tests/simpleExp.fss", "Another team test you respell, with a ZZ and a ZZ64 base at a negative exponent."),
  ("doc:ProjectFortress/tests/XXXQQPowerExponent.fss", "Row 445's expected failure, which your rung promotes."),
]
I_CHECKS = [
  "P-153", "F-241", "F-247",
  "ledger:438", "ledger:441", "ledger:445", "ledger:747",
  IP + "1.1 The declarations",
  IP + "3.1 E and Z",
  IP + "4. QQ's body",
  IP + "8. Decisions",
  FJ + "6. The recommendation and the default",
  "doc:explorations/compile-ladder/plan-20/probes/power.patch",
]

A_BRIEFING = [
  ("P-40", "The decision your rung builds for the first export error: decision E's diff, built with the array sites' other fixes."),
  ("P-27", "The library's own practice is the standard: the leaf redeclaration and the cast are the library's devices."),
  ("P-87", "No model line changes: the ways change the library only, and microGPT's quick pair is unchanged."),
  ("P-85", "The array design's three questions stay open: the ways you build need none of them."),
  ("F-260", "The measurement your rung builds: 19 typecheck sites and the first export error, 31 to 11, nothing come."),
  ("F-35", "Where the unused sizes came from: the team's 2007 header, taken out of the component only in 2008."),
  ("ledger:678", "Your row: Col and Row refused at the range subscript's unsized type, which the cast of 3d answers."),
  ("ledger:465", "Walk calls an overload the api lacks, its example array3(v), which your api line declares: a note."),
  ("ledger:685", "The precedent: the library's factories already give their results a sized type by cast."),
  (AS + "In short", "The probe in one table: step 1 to 12, E3 to 11, the second export error unmoved."),
  (AS + "Step 1: ways.patch", "ways.patch's edits, its distance, and the 19 sites and 3 entries it clears."),
  (AS + "Step 2: E3 re-based", "e3-rebased.patch, its re-base, and the first export error's 17 entries cleared."),
  (AS + "Step 4: walk and microGPT", "The 40 walk tests and microGPT's quick pair, unchanged on steps 1 and 2."),
  (AS + "Text of a way that I had to change or fill in", "Row's cast type and array3(v)'s result type, which the ways note did not give."),
  (AW + "1. Bodies typed by their parent trait", "The 14 bodies: the leaf redeclaration and the cast, with the ways not taken."),
  (AW + "2. Sizes tested in a branch", "The 3 factory arms: the cast in the arm, with the ways that need a decision."),
  (AW + "3. Row 678's Col and Row", "Col and Row: the cast of the subscript's value, and a SubArray2 as the other way."),
  (AW + "4. The two export errors", "The first error's 17 entries and their ways; the second error's 44, which are not yours."),
  (AW + "5. By group", "The ways that need no decision, group by group, and the decisions the others need."),
  ("doc:explorations/perf-probes/array-sites/ways.patch", "The first of your two patches, as measured."),
  ("doc:explorations/perf-probes/array-sites/e3-rebased.patch", "The second, decision E's diff re-based to the two-trait bound."),
  ("code:" + FL + "#(x:Any):T =", "The library's cast, the device of 1c, 2a and 3d."),
  ("code:" + FL + "#trait Vector[", "Vector's bodies typed by their parent trait: five of the sites."),
  ("code:" + FL + "#trait Matrix[", "Matrix's bodies, rmul and lmul: six more of the sites."),
  ("code:" + FL + "#trait StandardMutableArrayType[", "The fill and tabulate bodies the leaves copy at their own type."),
  ("code:" + FL + "#(* builtinFactory1 must be a non-overloaded..__immutableFactory1[", "The two 1-D factories, whose N[0] arm answers the unsized type: two of the sites."),
  ("code:" + FL + "#opr[_:TrivialOpenRange, i1:ZZ32]", "Array2's column extraction, Col's site; Row's is four lines on."),
  ("code:" + FL + "#trait ImmutableArray1[", "The revival's leaf fill and tabulate at ImmutableArray1's type, beside the team's copy, map and replica."),
  ("code:" + FLI + "#trait Vector[", "The api's Vector, which gains fill and tabulate."),
  ("code:" + FLI + "#tabulatedVector[..squaredNorm[", "The api's vector operators with their unused sizes, which E3 drops."),
]
A_CHECKS = [
  "P-40", "P-27", "F-260",
  "ledger:678",
  AS + "In short",
  AS + "Step 1: ways.patch",
  AS + "Step 2: E3 re-based",
  AS + "Text of a way that I had to change or fill in",
  AW + "5. By group",
  "doc:explorations/perf-probes/array-sites/ways.patch",
  "doc:explorations/perf-probes/array-sites/e3-rebased.patch",
]

IDS = ('I', 'A')
LISTS = {
  'I': ([k for k, _ in I_BRIEFING], I_CHECKS),
  'A': ([k for k, _ in A_BRIEFING], A_CHECKS),
}
REASONS = {'I': I_BRIEFING, 'A': A_BRIEFING}


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
