# Made from plan-23/manifest/gen23.py for climb batch 24: one run; the batch's rungs in the manifest's order, F, Z, S,
# K, W, G (the gather's rule on shared files puts K before Z and S; the record's fork 1), none landing only with another; K is the CHOOSE rung, on the CHOOSE probe's finding
# (plan-24/probes/choose.md); H, the
# place kept for the hard set's rung, joins only once the record's section 3 holds its "### H." block, section 5 its
# "#### H" block, and lists24.py its keys, which is how lists24.IDS comes to name it. --without <rung> leaves that rung
# out of the block. A rung's section runs from its heading to the next ### heading, as check24.js reads it.
# Generates the MANIFEST block (CLIMB-BATCH-24.md) for the batch workflow
# (explorations/coordinator/climb-batch-workflow.js; explorations/coordinator/process-engineering/batch-redesign.md)
# from the record and the briefings of lists24.py, into $OUT24/manifest24.js ($FORTRESS_HOME/tmp by default, which is
# ignored); check24.js checks it and splices it. On batch 15's pattern (plan-15/manifest/gen15.py): each rung's
# section of the record's section 3 goes into the block word for word as the rung's section, which every role on the
# rung reads (the worker, the skeptic, a judge and a repair round), its code-span backticks dropped and any ellipsis
# character written as three full stops, since the script carries ASCII only; the briefing's reasons go beside the
# keys, and the script renders them at the end of the worker's brief; the manifest fields (slug, worktree, expected
# minutes, the stage as the test, the step a rung brings into the gate, the checker count a rung declares, the rungs
# it lands only with, the blurb and the points to report) come from the record's section 5, "The manifest, rung by
# rung", and the intro every agent reads from its "What every agent reads first". No value is set at launch: the
# gather numbers the batch's new rows through ledger.py, so the block has no LEDGER_FROM. No rung declares a checker
# count, and none lands only with another.
#   python3 -B gen24.py [--without <rung>]... [RECORD]      RECORD defaults to explorations/coordinator/CLIMB-BATCH-24.md
import json, re, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from lists24 import LISTS, REASONS, IDS as ALL_IDS

ROOT = os.environ.get('FORTRESS_HOME', os.path.abspath(os.path.join(HERE, '../../../..')))
argv = sys.argv[1:]
WITHOUT = []
while '--without' in argv:
    WITHOUT.append(argv[argv.index('--without') + 1])
    del argv[argv.index('--without'):argv.index('--without') + 2]
args = [a for a in argv if not a.startswith('--')]
assert all(w in ALL_IDS for w in WITHOUT), ('--without names a rung not in the batch', WITHOUT)
IDS = tuple(r for r in ALL_IDS if r not in WITHOUT)
BATCH = '24'
REC = args[0] if args else os.path.join(ROOT, 'explorations/coordinator/CLIMB-BATCH-24.md')
OUT = os.path.join(os.environ.get('OUT24', os.path.join(ROOT, 'tmp')), 'manifest%s.js' % BATCH)
os.makedirs(os.path.dirname(OUT), exist_ok=True)
rec = open(REC, encoding='utf-8').read()


def ascii_text(t):
    t = t.replace('`', '').replace('…', '...')
    bad = [c for c in t if ord(c) > 127]
    assert not bad, ('non-ASCII left', bad, t[:120])
    return t


def between(text, start, end):
    i = text.index(start)
    j = text.index(end, i + len(start))
    return text[i + len(start):j]


# Section 3: one block per rung, from its heading to the next ### heading.
s3 = between(rec, '\n## 3. The rungs\n', '\n## 4. ')
heads = list(re.finditer(r'^### ([A-Z])\. (.*)$', s3, flags=re.M))
assert [h.group(1) for h in heads] == list(ALL_IDS), [h.group(1) for h in heads]
sections, titles = {}, {}
for i, h in enumerate(heads):
    rid = h.group(1)
    if rid not in IDS:
        continue
    nxt = re.search(r'^### ', s3[h.end():], flags=re.M)
    end = h.end() + nxt.start() if nxt else len(s3)
    body = s3[h.end():end].strip('\n')
    assert body.startswith('**The answers this rung follows.**'), rid
    sections[rid] = ascii_text(body)
    titles[rid] = ascii_text(h.group(2))

# Section 5: the manifest fields, rung by rung, and the intro.
s5 = rec[rec.index('\n## 5. How it is run\n'):]
mrung = between(s5, '\n### The manifest, rung by rung\n', '\n### What every agent reads first\n')
blocks = list(re.finditer(r'^#### ([A-Z])$', mrung, flags=re.M))
assert [b.group(1) for b in blocks] == list(ALL_IDS), [b.group(1) for b in blocks]
FIELDS = {}
for i, b in enumerate(blocks):
    rid = b.group(1)
    if rid not in IDS:
        continue
    text = mrung[b.end():blocks[i + 1].start() if i + 1 < len(blocks) else len(mrung)]
    f, points, in_points = {}, [], False
    for line in text.split('\n'):
        m = re.match(r'^- \*\*([a-z ]+):\*\*\s*(.*)$', line)
        if m:
            key, val = m.group(1), m.group(2).strip()
            in_points = (key == 'points to report')
            if not in_points:
                f[key] = ascii_text(val)
            continue
        m = re.match(r'^  - (.*)$', line)
        if m and in_points:
            points.append(ascii_text(m.group(1).strip()))
    f['points'] = points
    for k in ('slug', 'worktree', 'expected minutes', 'its test is the stage', 'writes state', 'joins the gate', 'checker count', 'lands only with', 'blurb'):
        assert k in f, (rid, k)
    assert points, (rid, 'no points to report')
    FIELDS[rid] = f
intro = between(s5, '\n### What every agent reads first\n', '\n### Before the launch\n').strip()
INTRO = ascii_text(intro)

def yes(v):
    assert v in ('yes', 'no'), v
    return v == 'yes'

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
A('// Generated by explorations/compile-ladder/plan-24/manifest/gen24.py from')
A('// CLIMB-BATCH-24.md (section 3, each rung\'s section word for word; section 5, the')
A('// manifest fields and the intro) and the briefings of lists24.py; check24.js checks it.')
A('// Climb batch 24: rungs ' + ', '.join(IDS) + ', the manifest\'s order, the gather\'s tie-break; none lands only with another.' + (' This block leaves out ' + ', '.join(WITHOUT) + '.' if WITHOUT else ''))
A('// Per rung: id, slug, path, branch, expectedMinutes (the scatter\'s start order only),')
A('// writesState, testIsStage, gateJoins (a gate step the rung brings), blurb (one line')
A('// for the batch table), section (the rung\'s section of the record, read by every role')
A('// on the rung), pointsToReport, briefing and reasons (the facts-extract.sh keys the')
A('// worker reads first, each with its reason), checks (the sub-list the skeptic, a judge')
A('// and a repair round read), expectedMoves (ladder moves declared, none here), and the')
A('// optional landsOnlyWith, expectedCheckerCount and expectedCheckerCrash: no rung lands')
A('// only with another, and none declares a checker count or a crash (the count is reported).')
A('// No value is set at launch. The base and the base build are args.base and')
A('// args.baseBuild. At most two agents run at once on this box, FIFO (FACTS.md, "The')
A('// Workflow harness runs two agents at once on this box"); the scatter starts the')
A('// longest expected worker first.')
A('// ===========================================================================')
A('')
A("const BATCH = '%s'" % BATCH)
A("const BATCH_RECORD = 'explorations/coordinator/CLIMB-BATCH-24.md'")
A("const BRIEFING_LISTS = 'explorations/compile-ladder/plan-24/manifest/lists24.py'")
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
    joins = [] if f['joins the gate'] == 'none' else [x.strip() for x in f['joins the gate'].split(',')]
    A("const %s_ENTRY = { id: '%s', slug: '%s', path: '%s', branch: 'wip/%s', expectedMinutes: %d," % (rid, rid, slug, path, slug, int(f['expected minutes'])))
    cc = f['checker count']
    assert cc == 'none' or re.fullmatch(r'[0-9]+', cc), (rid, cc)
    low = f['lands only with']
    lw = [] if low == 'none' else [x.strip() for x in low.split(',')]
    assert all(x in ALL_IDS and x != rid for x in lw), (rid, low)
    assert not lw, (rid, 'no rung of climb batch 24 lands only with another', low)
    assert all(x in IDS for x in lw), (rid, 'lands only with a rung this block leaves out', low)
    A('    writesState: %s, testIsStage: %s, gateJoins: %s, expectedMoves: [],%s%s' % ('true' if yes(f['writes state']) else 'false', 'true' if yes(f['its test is the stage']) else 'false', js(joins), '' if cc == 'none' else ' expectedCheckerCount: %d,' % int(cc), '' if not lw else ' landsOnlyWith: %s,' % js(lw)))
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
    print(rid, FIELDS[rid]['slug'], FIELDS[rid]['worktree'], 'section', len(sections[rid]), 'chars;', len(FIELDS[rid]['points']), 'points;', len(LISTS[rid][0]), 'briefing keys,', len(LISTS[rid][1]), 'checks')
