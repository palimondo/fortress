# The briefing and checks lists of climb batch 29b's rungs (CLIMB-BATCH-29b.md, section 1, "The manifest, rung by
# rung"), made from plan-29/manifest/lists29.py for the batch workflow
# (explorations/coordinator/process-engineering/batch-redesign.md, "The brief"): each list holds what the rung's
# section cites, the decisions, the ledger rows, the notes and the code it rests on, and no process position or
# harness fact, which the brief's role text and the fortress-repo skill carry. POSITIONS and FACTS entries are keyed
# by their numbers. Each briefing entry is its facts-extract.sh key, one line on why it is there, and CHECK where the
# record marks it (check): the checks list, read by the skeptic, a repair round and a judge, is those keys in order.
# No key holds a backslash, a backtick or a double quote, which the script refuses; facts-extract matches a heading
# without its backticks.
# Changed from lists29.py: the rungs are the record's two, A and T, in the manifest's order; the keys are each rung's
# briefing bullets in section 1, in their order, each as the record writes it, its backticks dropped and REC, PROBE
# and SNAP spelled out as section 1's opening paragraph gives them, each with the record's reason, its first letter
# capitalized; a check is marked on its entry. The forks: the record's one forks key, REC "Forks the batch takes",
# stays in each briefing as section 1 gives it, section 3's forks whole for every rung, with its (check) mark on A and
# none on T. Climb batch 29's way, each rung reading the batch's forks, its own and those of each rung beside it by the
# @WORDS filter on the heading's bold leads, does not fit this record's headings: its forks are a numbered list led
# by the fork's label (A1 to A8, T1 to T3), with no lead "For the whole batch" or "Rung A", and the section's opening
# paragraph, the batch's own sort, has no lead at all; "@Rung A" holds fork A6's item ("a rung of its own"),
# "@For the whole batch" and "@Rung T" match nothing, and "@A1", "@A2" and "@A3" each match two or three items, the
# labels' cross-references among them (the coordinator's decision for this generator: the whole where the record's
# headings do not allow 29's way cleanly). A and T share no file (section 4, "The rule the rungs keep"), and T reads
# A's forks in the whole. lists(ids) gives the lists of the rungs ids, a rung left out by --without dropping from the
# block; LISTS and REASONS are lists(IDS).
# `python3 -B lists29b.py` checks every key with facts-extract.sh --check (each must match exactly one place) and
# every reason's form, in $FORTRESS_HOME (this checkout by default), and prints the bytes of each rung's forks key, and
# of section 3's forks whole and of the leads climb batch 29's way would take, beside them; it is run again on the tree
# the batch is cut from.
import os
SRC = 'ProjectFortress/src/com/sun/fortress/'
REC = "doc:explorations/coordinator/CLIMB-BATCH-29b.md#"
PROBE = "doc:explorations/compile-ladder/plan-30/probes/draft-numerals.md#"
SNAP = "doc:explorations/coordinator/postmortem-2026-11-09-numerals/design-snapshot.md#"
_ROOT = os.environ.get('FORTRESS_HOME', os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../..')))
CHECK = True
# The record's one forks key, section 3's "Forks the batch takes" whole, which every rung reads.
FORKS_SECTION = REC + 'Forks the batch takes'
# The leads climb batch 29's way would take, printed beside the whole to show why it is not taken here.
LEADS_29 = ('For the whole batch', 'Rung A', 'Rung T')

A_BRIEFING = [
  ('P-174', "The decision you build: the numeral types with the four numbers as static parameters, every number type's generic coercion, no numeral value at run time, the sign rule.", CHECK),
  ('P-176', "One value per place, a JVM constant or a static final filled at load with the type's minus, walk at the first evaluation, the prelude carrying it.", CHECK),
  ('P-173', 'Where a numeral converts, the default, the range refusal by the exact value, and the fold of a static expression first.', CHECK),
  ('P-37', "The prelude's exception for the numerals, under which your prelude edits fall.", CHECK),
  ('P-40', 'The bound on a size, which the four numbers do not take; read as values they are ZZ.'),
  ('P-165', 'No asFloat on a numeral type, which the patch removes.'),
  ('P-148', "The checker's timing, if your edits reach the checker beyond the patch.", CHECK),
  ('P-12', 'Walk refuses a numeral only when its place runs, until it runs the checker.'),
  ('P-74', 'Promotion, which a numeral at a generic call still drives.'),
  ('ledger:969', 'The field numerals in the one library and walk, which close.', CHECK),
  ('ledger:970', "The compiled path's IntLiteral without the four numbers, which closes.", CHECK),
  ('ledger:961', "The compiled sign at a program's type, which closes by the sign rule.", CHECK),
  ('ledger:968', "Walk's sign at a program's type, which closes by the sign rule.", CHECK),
  ('ledger:957', "A numeral at a program's generic type, the first case the patch's, the second yours if it fits.", CHECK),
  ('ledger:971', 'A spawning coercion at a place, which stays (fork A6).'),
  ('ledger:972', "The cache tables' class, fixed in the patch, which closes."),
  (SNAP + '3. The design', "The design in the curator's confirmed words, and his addition on the library's own types.", CHECK),
  (SNAP + '4. What it is not', 'The field numerals, which you delete.', CHECK),
  (SNAP + '11. Consequences', "The library's types by the same coercion, the sign, walk, the static expressions.", CHECK),
  (PROBE + '1. Where the snapshot', 'Where the probe followed the snapshot over an entry.'),
  (PROBE + '5. Step 4', 'The code generator, the runtime and the prelude as the patch builds them, and what stood in the way.', CHECK),
  (PROBE + '6. Step 5', 'Walk as the patch builds it, including the signed value handed to a library coercion, which fork A3 changes.'),
  (PROBE + '7. Step 6', "The patch's tests and their failing runs on the base, your before for them.", CHECK),
  (PROBE + '8. The gate', "The patch's suites and stages, which you cite, and the team tests it changes.", CHECK),
  (PROBE + '10. What was not built', 'Your work beyond the patch.', CHECK),
  (PROBE + '12. Decisions', "The probe's decisions; decision 3 goes for a numeral as written, decision 4 is replaced."),
  ('code:' + SRC + 'compiler/desugarer/CoercionDesugarer.scala#def foldsTo', "Batch 29's fold by the target type, kept only for a folded constant.", CHECK),
  ('code:' + SRC + 'compiler/codegen/CodeGen.java#private String numeralCoercionSiteDesc', "The site rule at the base, whose exclusion of the library's apis goes."),
  ('code:' + SRC + 'repository/GraphRepository.java#public ComponentIndex getComponent(APIName name)', "Where the fold reads a declaring component's analyzed tree."),
  (FORKS_SECTION, 'The defaults you build, each with the ways not taken.', CHECK),
]

T_BRIEFING = [
  ('P-174', 'The numeral types, the coercion generic over the four numbers, no numeral value at run time, the sign rule, the binary chapter left out.', CHECK),
  ('P-176', 'One value per place, folded or made once, on both paths.', CHECK),
  ('P-173', "The conversion, the default, the fold of a static expression, and the Draft's text it contradicts, for Appendix I.", CHECK),
  ('P-40', "The bound for sizes only; a numeral type's four numbers read as values are ZZ.", CHECK),
  ('P-37', "The prelude's exception for the numerals until the switch-over."),
  ('P-165', 'The numeral types declare no asFloat.'),
  ('P-96', 'The revision form.', CHECK),
  ('P-26', 'The bend that P-173 weighs.'),
  ('F-345', "The specification's text today, the field numerals, which you replace.", CHECK),
  (SNAP + '2. The Working', "The Draft's words at the source.", CHECK),
  (SNAP + '3. The design', 'The design in his confirmed words.', CHECK),
  (SNAP + '11. Consequences', 'The consequences he confirmed, which the text states.', CHECK),
  (PROBE + '12. Decisions', 'The hierarchy built, decision 1, and what the Draft leaves out.'),
  (PROBE + '14. Where the Draft', 'Where the Draft is silent and what was chosen.'),
  (PROBE + '18. Sentences', 'The sentences the patch makes false.', CHECK),
  (REC + 'A. The static numerals on both paths', 'What rung A builds, which the Effects describe.', CHECK),
  (FORKS_SECTION, 'The defaults the text states.'),
]


ORDER = ('A', 'T')
_B = {'A': A_BRIEFING, 'T': T_BRIEFING}
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
    print('rungs', ', '.join(IDS))

    def check(keys):
        r = subprocess.run(['bash', 'explorations/coordinator/tools/facts-extract.sh', '--check'] + list(keys), capture_output=True, text=True, cwd=root)
        return r, [int(x) for x in re.findall(r'\[([0-9]+) bytes\]', r.stdout)]
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
    # Beside them, the leads that climb batch 29's way would read, each as facts-extract.sh matches it: not one place
    # each, so the whole stands (the header). Printed only: they are not keys of any rung.
    for lead in LEADS_29:
        key = FORKS_SECTION + '@' + lead
        r, sizes = check([key])
        first = (r.stdout.strip().splitlines() or [''])[0]
        where = first[len(key):].strip() if first.startswith(key) else first
        print('climb batch 29\'s lead', '"' + lead + '":', where[:200], '| exit', r.returncode, '(not a key)')
    print('bad lists', bad)
    sys.exit(1 if bad else 0)
