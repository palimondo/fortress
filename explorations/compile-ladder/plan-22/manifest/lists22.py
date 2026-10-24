# The briefing and checks lists of climb batch 22's three rungs, E, R and T (CLIMB-BATCH-22.md, section 3), in
# batch 21's form (explorations/compile-ladder/plan-21/manifest/lists21.py) for the batch workflow
# (explorations/coordinator/process-engineering/batch-redesign.md, "The brief"): each list holds what the rung's section
# cites, the decisions, the ledger rows, the notes and the code it rests on, and no process position or harness fact,
# which the brief's role text and the fortress-repo skill carry. POSITIONS and FACTS entries are keyed by their
# numbers. Each briefing entry is a pair: its facts-extract.sh key and one line on why it is there. A checks list is a
# sub-list of its briefing's keys, read by the skeptic, a repair round and a judge. The record's section 5, "The
# briefings, rung by rung", holds the same keys. No key holds a backslash, a backtick or a double quote, which the
# script refuses; facts-extract matches a heading without its backticks.
# `python3 -B lists22.py` checks every key with facts-extract.sh --check (each must match exactly one place) and every
# reason's form; it is run again on the tree the batch is cut from.
FL = 'Library/FortressLibrary.fss'
FLI = 'Library/FortressLibrary.fsi'

EX = "doc:explorations/perf-probes/export-check-full/REPORT.md#"
CZ = "doc:explorations/perf-probes/condition-zeroindexed/REPORT.md#"
RE = "doc:explorations/compile-ladder/rung-export-align/REPORT.md#"
P22 = "doc:explorations/compile-ladder/plan-22/probes/"
REC = "doc:explorations/coordinator/CLIMB-BATCH-22.md#"

E_BRIEFING = [
  ("F-282", "The export check as it stands and the 15 entries your rung clears all but one of: matched by name and header, abstract read."),
  ("P-27", "The library's own practice is the standard: the api states its component's members at the component's headers."),
  ("P-68", "The float rounding results: ZZ after the switch-over in their own rung, ZZ64 under walk today, which your rung's component lines take."),
  ("P-90", "Maybe's empty case, under which the export probe filed Just's and Nothing's subscripts; it speaks of the bare Nothing only."),
  ("ledger:816", "The export check's reading of abstract that your rung's zero rests on, held by the record's question 1."),
  ("ledger:330", "P-68's own rung, which your rung's RR64 lines leave to it, and the note your rung adds."),
  (EX + "3.3 Neither 4h nor 4i, and no decision by my reading: 17", "The export probe's ways for most of your entries: getters, unbuilt subscripts, RangeInternals types, the distributes, DelegatedIndexed."),
  (EX + "3.4 A decision, 6", "RR64's rounding and Condition's place, the two that needed a call, each now settled by the record."),
  (EX + "4.3 Each new error, the line that brings it, and the line that clears it", "Why an api line can bring errors in another component: the pattern behind fork 9's measured variant."),
  (CZ + "3. The ways", "Way A+ and A++, which your rung builds, beside the other ways the Condition probe weighed."),
  (CZ + "4. The measurements", "Each way measured on climb batch 21's code, and why A without the range subscript brings an error on Boolean."),
  (RE + "5. Suites and stages", "The 15 entries as climb batch 21b landed them, each with its home, and why the count stage never reaches the export check."),
  (P22 + "rung-E.patch", "Your library text as the planner measured it with the other rungs' at distance 0."),
  (P22 + "export-differences-base.tsv", "The 41 differences behind the 15 entries, the export check run to its end on your base."),
  (REC + "The planner's probes", "The batch's text measured together, the variants that brought errors, way A+ alone, and the walk suites."),
  (REC + "Forks the batch takes, none consequential", "Forks 3 to 12, the defaults your rung builds, each with the ways not taken."),
  ("code:" + FL + "#opr ^(self, b:Number):RR64..round(self): ZZ = round(asFloat(self))", "The component's RR64 power and rounding lines, three of which your rung sets at ZZ64."),
  ("code:" + FL + "#trait DelegatedIndexed", "DelegatedIndexed in the component: the size it inherits from Indexed and the generator your rung retypes."),
  ("code:" + FLI + "#trait Condition", "The api's Condition, which way A+ writes as the component's."),
  ("code:" + FLI + "#value object Just", "The api's Just, whose range subscript leaves and whose SQCAP and SQCUP take the component's headers."),
]
E_CHECKS = [
  "F-282", "P-68", "ledger:816",
  EX + "3.3 Neither 4h nor 4i, and no decision by my reading: 17",
  CZ + "3. The ways",
  P22 + "rung-E.patch", P22 + "export-differences-base.tsv",
  REC + "The planner's probes",
]

R_BRIEFING = [
  ("P-78", "The decision whose workaround your rung builds: the static argument written in a clause form, row 731 a gap of the checker."),
  ("P-48", "A type parameter the arguments leave unfixed takes its bound, narrowed by the expected type: what the comprehension meets."),
  ("F-59", "Why an F-bounded big operator such as BIG MIN has no instance without its argument, and how C4 and the team's tests write it."),
  ("F-221", "The expected type reaches a plain-bounded big operator only where the enclosing call fails, so the comprehension keeps its bound."),
  ("F-264", "The library's cast device for a branch whose type a typecase cannot show, which item 46's arm takes."),
  ("F-85", "The fused arm of __bigOperator2, its I0 where O0 is declared, the one site of its family left."),
  ("ledger:731", "Your first row: the checker's gap, whose three library sites your rung clears and which stays open for user programs."),
  ("ledger:632", "Your second row: the fused arm, which the gather closes with your commit."),
  (P22 + "rung-R.patch", "Your library text as the planner measured it with the other rungs' at distance 0."),
  (REC + "The planner's probes", "Row 731's three shapes probed in five contexts each, the written argument the only clearing, and item 46's cast measured."),
  ("doc:Specification/basic/expressions/reductions.tex#Summations and Other Reduction Expressions", "What the specification says of a reduction's static argument, which your rung's text keeps true."),
  ("code:" + FL + "#upto(c: Char): String =", "String's upto, one of row 731's two BIG MIN sites; beyond follows it."),
  ("code:" + FL + "#I1,O1,R1,L1,E,F extends Generator", "__bigOperator2 whole, its fused arm and the team's comment on the arm's assumption."),
  ("code:Library/List.fss#opr [n:Range[", "List's range subscript, row 731's third site."),
  ("code:Library/Format.fss#lst = <|[", "The library's own written comprehension, the precedent for the third site's text."),
]
R_CHECKS = [
  "P-78", "F-59", "ledger:731", "ledger:632",
  P22 + "rung-R.patch", REC + "The planner's probes",
  "code:Library/List.fss#opr [n:Range[", "code:Library/Format.fss#lst = <|[",
]

T_BRIEFING = [
  ("F-83", "The string components hold no site of their own, and String's export entry is FortressLibrary's: the entry your rung clears."),
  ("F-282", "The export check as it stands: an api member written abstract needs no member in its component."),
  ("P-27", "The library's own practice is the standard: abstract written in the api on a member the component leaves without a body."),
  ("ledger:607", "FlatString's rangeContains finds only the first occurrence, which stays: your tests avoid asserting what it breaks."),
  ("ledger:816", "The reading of abstract your rung's api lines rest on, and what the other reading would ask of String's component."),
  (EX + "3.5 Waiting elsewhere, 18, listed and not fixed (the brief's item 4)", "String's differences as the export probe sorted them, filed under later work of P-155's, which names no such work."),
  (P22 + "rung-T.patch", "Your library text as the planner measured it with the other rungs' at distance 0."),
  (REC + "The planner's probes", "The four walk failures on the base and their passes on the text, and the 4 errors the api lines bring without the bodies."),
  (REC + "Question 1, consequential: the export check's reading of abstract (row 816)", "The curator's question your rung's api lines depend on, with what each answer costs."),
  ("code:" + FLI + "#trait String extends", "String's api, whose nine members and excludes clause your rung writes."),
  ("code:" + FL + "#trait String extends", "String's component trait, which leaves four members bodyless and never declares the other five."),
  ("code:Library/String.fss#):String = label method", "CatString's uncheckedSubstring, whose split of a range your rung's rangeContains follows."),
  ("code:Library/String.fss#balanced():String =", "SubString's balanced, which answers self when balanced: the shape of the two balanced bodies."),
  ("code:Library/String.fss#value object EmptyString extends", "EmptyString, which gains isBalanced and balanced."),
  ("code:Library/FlatString.fss#getter isBalanced", "FlatString's isBalanced, true, beside which its balanced goes after the getters."),
  ("doc:ProjectFortress/tests/StringPieces.fss", "The string tests that pin row 607 and the pieces your tests sit beside."),
]
T_CHECKS = [
  "F-83", "ledger:607", P22 + "rung-T.patch", REC + "The planner's probes",
  "code:" + FLI + "#trait String extends", "code:" + FL + "#trait String extends",
  "code:Library/String.fss#):String = label method", "doc:ProjectFortress/tests/StringPieces.fss",
]

IDS = ('E', 'R', 'T')
_B = {'E': (E_BRIEFING, E_CHECKS), 'R': (R_BRIEFING, R_CHECKS), 'T': (T_BRIEFING, T_CHECKS)}
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
    import subprocess, re, sys, os
    root = os.environ.get('FORTRESS_HOME', '/home/user/fortress')
    bad = 0
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
