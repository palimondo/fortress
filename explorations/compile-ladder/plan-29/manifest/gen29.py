# Made from plan-28/manifest/gen28.py for climb batch 29: one run; the batch's rungs from lists29.IDS in the manifest's
# order, N, C, F, G, S, T (the record's fork 1), C landing only with N and T only with N, C, F and S. --without <rung>
# leaves a rung out of the block, and its forks out of the other rungs' briefings (lists29.lists); it refuses to leave
# out a rung that another lands only with. A rung's section runs from its heading to the next ### heading, as
# check29.js reads it.
# Changed from gen28.py: the batch's values (BATCH 29, the record CLIMB-BATCH-29.md, the lists lists29.py, the output
# manifest29.js under $OUT29); the "Fields common to the six rungs", whose lands-only-with field names each rung that
# lands only with others, C with N and T with N, C, F and S, and the rest landing on their own, which each of C's and
# T's blocks gives again in a field of its own (the two must agree, and every rung must be named once), whose
# joins-the-gate field gives none but T's specification build at the gather (fork 7), and whose crash field gives
# none; no rung waits on an answer, so every section opens with "The mission." and no block has a waits-on line; no
# character outside ASCII is kept in a section (KEPT is empty), and any is refused. N's, C's, F's and S's sections
# name the two stages as stages their rung runs once on its final tree, N's with the commands and the count timed as
# P-148's change, C's under "The stages and the timing" with P-148's change and pass; G's and T's name neither
# (fork 3): check29.js checks them. Each briefing's forks are the batch's, the rung's own and those of each rung that
# shares a file with it, and T's also those of N, C, F and S, whose behaviour its text states (lists29.py's header).
# Generates the MANIFEST block (CLIMB-BATCH-29.md) for the batch workflow
# (explorations/coordinator/climb-batch-workflow.js; explorations/coordinator/process-engineering/batch-redesign.md)
# from the record, read at run time, and the briefings of lists29.py, into $OUT29/manifest29.js ($FORTRESS_HOME/tmp
# by default, which is ignored); check29.js checks it and splices it. On batch 15's pattern (plan-15/manifest/gen15.py):
# each rung's section of the record's section 4 goes into the block word for word as the rung's section, which every
# role on the rung reads (the worker, the skeptic, a judge and a repair round), its code-span backticks dropped, any
# ellipsis character written as three full stops and any minus sign as a hyphen-minus; the briefing's reasons go
# beside the keys, and the script renders them at the end of the worker's brief. No value is set at launch: the
# gather numbers the batch's new rows through ledger.py, so the block has no LEDGER_FROM. No rung declares a checker
# count, a crash or a move (section 1's common fields).
#   python3 -B gen29.py [--without <rung>]... [RECORD]      RECORD defaults to explorations/coordinator/CLIMB-BATCH-29.md
import json, re, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from lists29 import lists, IDS as ALL_IDS

ROOT = os.environ.get('FORTRESS_HOME', os.path.abspath(os.path.join(HERE, '../../../..')))
argv = sys.argv[1:]
WITHOUT = []
while '--without' in argv:
    WITHOUT.append(argv[argv.index('--without') + 1])
    del argv[argv.index('--without'):argv.index('--without') + 2]
args = [a for a in argv if not a.startswith('--')]
assert all(w in ALL_IDS for w in WITHOUT), ('--without names a rung not in the batch', WITHOUT)
IDS = tuple(r for r in ALL_IDS if r not in WITHOUT)
LISTS, REASONS = lists(IDS)
BATCH = '29'
REC = args[0] if args else os.path.join(ROOT, 'explorations/coordinator/CLIMB-BATCH-29.md')
OUT = os.path.join(os.environ.get('OUT29', os.path.join(ROOT, 'tmp')), 'manifest%s.js' % BATCH)
os.makedirs(os.path.dirname(OUT), exist_ok=True)
rec = open(REC, encoding='utf-8').read()
# The characters outside ASCII that a section may keep, each written as a \u escape by js(): none in this batch.
KEPT = ''


def ascii_text(t, keep=''):
    t = t.replace('`', '').replace('…', '...').replace('−', '-')
    bad = [c for c in t if ord(c) > 127 and c not in keep]
    assert not bad, ('non-ASCII left', bad, t[:120])
    return t


def between(text, start, end):
    i = text.index(start)
    j = text.index(end, i + len(start))
    return text[i + len(start):j]


# Section 4: one block per rung, from its heading to the next ### heading, each opening with "The mission.".
s4 = between(rec, '\n## 4. The rungs\n', '\n## 5. ')
heads = list(re.finditer(r'^### ([A-Z])\. (.*)$', s4, flags=re.M))
assert [h.group(1) for h in heads] == list(ALL_IDS), [h.group(1) for h in heads]
sections, titles, headings = {}, {}, {}
for i, h in enumerate(heads):
    rid = h.group(1)
    nxt = re.search(r'^### ', s4[h.end():], flags=re.M)
    end = h.end() + nxt.start() if nxt else len(s4)
    body = s4[h.end():end].strip('\n')
    paras = body.split('\n\n')
    assert paras[0].startswith('**The mission.**'), (rid, 'the section does not open with The mission.')
    headings[rid] = ascii_text(rid + '. ' + h.group(2))
    if rid not in IDS:
        continue
    sections[rid] = ascii_text(body, KEPT)
    titles[rid] = ascii_text(h.group(2))

# Section 1: the table, the fields common to the six rungs, and each rung's block.
s1 = between(rec, '\n## 1. The manifest, rung by rung\n', '\n## 2. ')
table = {}
for line in s1.split('\n'):
    m = re.match(r'^\| ([A-Z]) \| `([a-z0-9-]+)` \| (.*) \| ([0-9]+) \|$', line)
    if m:
        table[m.group(1)] = {'slug': m.group(2), 'title': ascii_text(m.group(3)), 'minutes': int(m.group(4))}
assert list(table) == list(ALL_IDS), list(table)
common_text = between(s1, '\nFields common to the six rungs:\n', '\n### ')
COMMON = {}
for m in re.finditer(r'\*\*([a-z ]+):\*\* ([^.;:]*)', common_text):
    COMMON[m.group(1)] = ascii_text(m.group(2).strip())
# T's specification build joins the gather, not the gate (fork 7): no rung brings a gate step.
assert re.fullmatch(r"none(, but T's specification build at the gather \(fork 7\))?", COMMON.get('joins the gate', '')), ('common field', 'joins the gate', COMMON.get('joins the gate'))
want_common = {'writes state': 'no', 'its test is the stage': 'no', 'expected moves': 'none',
               'expected checker count': 'none declared', 'expected checker crash': 'none'}
for k, v in want_common.items():
    assert COMMON.get(k) == v, ('common field', k, COMMON.get(k))


def rung_names(text):
    """'N, C, F and S' -> ['N', 'C', 'F', 'S']."""
    names = [x.strip() for x in re.split(r',\s*|\s+and\s+', text.strip().rstrip('.')) if x.strip()]
    assert all(re.fullmatch(r'[A-Z]', x) for x in names), ('not a list of rungs', text)
    return names


# The common lands-only-with field: "C lands only with N; T lands only with N, C, F and S; N, F, G and S land on their
# own (...)", every rung named once.
low_line = re.search(r'^- \*\*lands only with:\*\* (.*)$', common_text, flags=re.M).group(1)
low_line = re.sub(r'\s*\([^()]*\)\.?$', '', low_line).rstrip('.')
COMMON_LOW, ALONE = {}, []
for part in low_line.split('; '):
    m = re.fullmatch(r'([A-Z]) lands only with (.*)', part)
    if m:
        COMMON_LOW[m.group(1)] = rung_names(m.group(2))
        continue
    m = re.fullmatch(r'(.*) lands? on (?:its|their) own', part)
    assert m, ('an unread part of the common lands-only-with field', part)
    ALONE += rung_names(m.group(1))
assert sorted(list(COMMON_LOW) + ALONE) == sorted(ALL_IDS), ('the common lands-only-with field names every rung once', COMMON_LOW, ALONE)
blocks = list(re.finditer(r'^### ([A-Z])$', s1, flags=re.M))
assert [b.group(1) for b in blocks] == list(ALL_IDS), [b.group(1) for b in blocks]
FIELDS = {}
for i, b in enumerate(blocks):
    rid = b.group(1)
    if rid not in IDS:
        continue
    text = s1[b.end():blocks[i + 1].start() if i + 1 < len(blocks) else len(s1)]
    f, points, in_points = {}, [], False
    for line in text.split('\n'):
        m = re.match(r'^- \*\*([a-z ]+):\*\*\s*(.*)$', line)
        if m:
            key, val = m.group(1), m.group(2).strip()
            in_points = (key == 'points to report')
            if not in_points:
                f[key] = ascii_text(val)
            continue
        if line.startswith('- **briefing**'):
            in_points = False
            continue
        m = re.match(r'^  - (.*)$', line)
        if m and in_points:
            points.append(ascii_text(m.group(1).strip()))
    f['points'] = points
    for k in ('slug', 'worktree', 'section', 'blurb'):
        assert k in f, (rid, k)
    assert points, (rid, 'no points to report')
    assert f['slug'] == table[rid]['slug'], (rid, 'slug differs from the table')
    assert f['worktree'] == '/home/user/fortress-' + re.sub(r'^rung-', '', f['slug']), (rid, 'worktree', f['worktree'])
    assert f['section'] == headings[rid], (rid, 'section field differs from the section 4 heading', f['section'], headings[rid])
    assert titles[rid].startswith(table[rid]['title']), (rid, 'the table title is not the heading', table[rid]['title'])
    f['expected minutes'] = table[rid]['minutes']
    assert not any(k.startswith('waits on') for k in f), (rid, 'a waits-on line, which no rung of this batch has')
    # A rung's own "lands only with" field, which the common field must give alike; none where neither names it.
    own = rung_names(re.sub(r'\s*\(.*?\)\.?$', '', f['lands only with'])) if 'lands only with' in f else []
    assert own == COMMON_LOW.get(rid, []), (rid, 'its lands-only-with field and the common one differ', own, COMMON_LOW.get(rid))
    f['lands only with'] = own
    assert all(x in ALL_IDS and x != rid for x in own), (rid, own)
    FIELDS[rid] = f
s6 = rec[rec.index('\n## 6. How it is run\n'):]
intro = between(s6, '\n### What every agent reads first\n', '\n### Before the launch\n').strip()
INTRO = ascii_text(intro)


def js(x):
    return json.dumps(x, ensure_ascii=True)


def js_list(keys, indent='      '):
    out, cur = [], ''
    for k in keys:
        piece = js(k)
        if cur and len(cur) + len(piece) + 2 > 150:
            out.append(indent + cur.rstrip())
            cur = ''
        cur += piece + ', '
    if cur:
        out.append(indent + cur.rstrip().rstrip(','))
    return '\n'.join(out)


L = []
A = L.append
A('// ===========================================================================')
A('// MANIFEST - the coordinator replaces everything between this line and the')
A('// "END MANIFEST" line, and changes nothing else in this file.')
A('//')
A('// Generated by explorations/compile-ladder/plan-29/manifest/gen29.py from')
A('// CLIMB-BATCH-29.md (section 4, each rung\'s section word for word; section 1, the')
A('// manifest fields; section 6, the intro) and the briefings of lists29.py; check29.js checks it.')
A('// Climb batch 29: rungs ' + ', '.join(IDS) + ', the manifest\'s order; ' + ('; '.join('%s lands only with %s' % (r, ', '.join(FIELDS[r]['lands only with'])) for r in IDS if FIELDS[r]['lands only with']) or 'none lands only with another') + '.' + (' This block leaves out ' + ', '.join(WITHOUT) + '.' if WITHOUT else ''))
A('// Per rung: id, slug, path, branch, expectedMinutes (the scatter\'s start order only),')
A('// writesState, testIsStage, gateJoins (a gate step the rung brings), blurb (one line')
A('// for the batch table), section (the rung\'s section of the record, read by every role')
A('// on the rung), pointsToReport, briefing and reasons (the facts-extract.sh keys the')
A('// worker reads first, each with its reason; of section 3\'s forks, the batch\'s, the')
A('// rung\'s own and those of each rung that shares a file with it, T\'s also those of')
A('// N, C, F and S, whose behaviour its text states), checks (the sub-list')
A('// the skeptic, a judge and a repair round read), expectedMoves (ladder moves declared,')
A('// none here), and the optional landsOnlyWith, expectedCheckerCount and')
A('// expectedCheckerCrash: C lands only with N and T only with N, C, F and S (fork 1);')
A('// no rung declares a checker count or a crash (the count is reported).')
A('// Every string here is ASCII: the record\'s sections hold no other character.')
A('// No value is set at launch. The base and the base build are args.base and')
A('// args.baseBuild. At most two agents run at once on this box, FIFO (FACTS.md, "The')
A('// Workflow harness runs two agents at once on this box"); the scatter starts the')
A('// longest expected worker first.')
A('// ===========================================================================')
A('')
A("const BATCH = '%s'" % BATCH)
A("const BATCH_RECORD = 'explorations/coordinator/CLIMB-BATCH-29.md'")
A("const BRIEFING_LISTS = 'explorations/compile-ladder/plan-29/manifest/lists29.py'")
A('')
for rid in IDS:
    A('const %s_SECTION = [' % rid)
    for l in sections[rid].split('\n'):
        A(js(l) + ',')
    A("].join('\\n')")
    A('')
for rid in IDS:
    f = FIELDS[rid]
    b, c = LISTS[rid]
    slug = f['slug']
    assert re.fullmatch(r'[a-z0-9-]+', slug), slug
    path = f['worktree']
    assert re.fullmatch(r'/home/user/fortress-[a-z0-9-]+', path), path
    A("const %s_ENTRY = { id: '%s', slug: '%s', path: '%s', branch: 'wip/%s', expectedMinutes: %d," % (rid, rid, slug, path, slug, f['expected minutes']))
    # The common fields (asserted above): writes state no, its test not the stage, no gate step, no ladder move,
    # no checker count or crash declared; the rungs it lands only with, from its own block and the common field.
    lw = f['lands only with']
    assert all(x in IDS for x in lw), (rid, 'lands only with a rung this block leaves out', lw)
    A('    writesState: false, testIsStage: false, gateJoins: [], expectedMoves: [],%s' % ('' if not lw else ' landsOnlyWith: %s,' % js(lw)))
    A('    title: ' + js(titles[rid]) + ',')
    A('    blurb: ' + js(f['blurb']) + ',')
    A('    section: %s_SECTION,' % rid)
    A('    pointsToReport: [')
    for p in f['points']:
        A('      ' + js(p) + ',')
    A('    ],')
    A('    briefing: [')
    A(js_list(b) + '],')
    A('    reasons: [')
    for k, r in REASONS[rid]:
        A('      ' + js(ascii_text(r)) + ',')
    A('    ],')
    A('    checks: [')
    A(js_list(c) + '] }')
    A('')
A('const RUNGS = [' + ', '.join('%s_ENTRY' % r for r in IDS) + ']')
A('const BATCH_INTRO = ' + js(INTRO))
BLOCK = '\n'.join(L) + '\n'
for line in L:
    assert all(ord(c) < 128 for c in line) and '`' not in line, line[:120]
open(OUT, 'w').write(BLOCK)
print('batch', BATCH, 'wrote', OUT, len(L), 'lines')
for rid in IDS:
    kept = sorted(set(c for c in sections[rid] if ord(c) > 127))
    print(rid, FIELDS[rid]['slug'], FIELDS[rid]['worktree'], FIELDS[rid]['expected minutes'], 'minutes; section', len(sections[rid]), 'chars' + (', kept as escapes: ' + ' '.join('U+%04X' % ord(c) for c in kept) if kept else '') + ';', len(FIELDS[rid]['points']), 'points;', len(LISTS[rid][0]), 'briefing keys,', len(LISTS[rid][1]), 'checks; forks', ', '.join(k.split('@')[-1] for k in LISTS[rid][0] if '#Forks the batch takes' in k))
