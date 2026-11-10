# Made from plan-29b/manifest/gen29b.py for climb batch 30, whose record holds two runs, as CLIMB-BATCH-21.md did
# (plan-21/manifest/gen21.py): run 1, climb batch 30, the rungs N, P and X; run 2, climb batch 30b, the rungs Y and C,
# written on run 1's landed tree. --run 1|2 chooses the block: its BATCH (30 or 30b, so the script's BATCH_DIR is
# compile-ladder/climb-batch-30/ or climb-batch-30b/), its rungs from lists30.RUNS in the manifest's order, and its
# part of the intro. --without <rung> leaves a rung of that run out of the block. A rung's section runs from its
# heading to the next ### heading, as check30.js reads it.
# Changed from gen29b.py: the batch's values (the record CLIMB-BATCH-30.md for both runs, the lists lists30.py, the
# output manifest30.js or manifest30b.js under $OUT30); section 1's table has a run column, which must agree with
# lists30.RUNS; the "Fields common to the five rungs": no rung lands only with another ("lands only with: none"), the
# joins-the-gate field gives none but the specification's build at the gather of each run, no rung declares a count,
# a crash or a move; a table title is the rung's short name and need not open its section 4 heading, which is the
# block's title; the intro is the part of section 6's "What every agent reads first" led by "Run 1." or "Run 2.",
# without that lead. P and C name the count stage and the distance stage in a step of their sections, C with P-148's
# runs; N, X and Y say "The stages. None" and list their files (section 1's common fields; section 6, "The
# generator"): check30.js checks them. Each briefing's forks are the record's one forks key, section 3's "Forks the
# batch takes" whole, for every rung (lists30.py's header). Run 2's block is generated again after its sections are
# re-read against run 1's landed tree (the record's section 4).
# Generates the MANIFEST block for the batch workflow (explorations/coordinator/climb-batch-workflow.js;
# explorations/coordinator/process-engineering/batch-redesign.md) from the record, read at run time, and the
# briefings of lists30.py, into $OUT30/manifest30.js or manifest30b.js ($FORTRESS_HOME/tmp by default, which is
# ignored); check30.js checks it and splices it. On batch 15's pattern (plan-15/manifest/gen15.py): each rung's
# section of the record's section 4 goes into the block word for word as the rung's section, which every role on the
# rung reads (the worker, the skeptic, a judge and a repair round), its code-span backticks dropped, any ellipsis
# character written as three full stops and any minus sign as a hyphen-minus; the briefing's reasons go beside the
# keys, and the script renders them at the end of the worker's brief. No value is set at launch: the gather numbers
# the batch's new rows through ledger.py, so the block has no LEDGER_FROM.
#   python3 -B gen30.py --run 1|2 [--without <rung>]... [RECORD]   RECORD defaults to explorations/coordinator/CLIMB-BATCH-30.md
import json, re, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from lists30 import lists, IDS as ALL_IDS, RUNS

ROOT = os.environ.get('FORTRESS_HOME', os.path.abspath(os.path.join(HERE, '../../../..')))
argv = sys.argv[1:]
assert '--run' in argv and argv[argv.index('--run') + 1] in RUNS, 'usage: gen30.py --run 1|2 [--without <rung>]... [RECORD]'
RUN = argv[argv.index('--run') + 1]
del argv[argv.index('--run'):argv.index('--run') + 2]
RUN_IDS = RUNS[RUN]
WITHOUT = []
while '--without' in argv:
    WITHOUT.append(argv[argv.index('--without') + 1])
    del argv[argv.index('--without'):argv.index('--without') + 2]
args = [a for a in argv if not a.startswith('--')]
assert all(w in RUN_IDS for w in WITHOUT), ('--without names a rung not in the run', WITHOUT)
IDS = tuple(r for r in RUN_IDS if r not in WITHOUT)
LISTS, REASONS = lists(IDS)
BATCH = {'1': '30', '2': '30b'}[RUN]
BATCH_RECORD = 'explorations/coordinator/CLIMB-BATCH-30.md'
BRIEFING_LISTS = 'explorations/compile-ladder/plan-30/manifest/lists30.py'
REC = args[0] if args else os.path.join(ROOT, BATCH_RECORD)
OUT = os.path.join(os.environ.get('OUT30', os.path.join(ROOT, 'tmp')), 'manifest%s.js' % BATCH)
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

# Section 1: the table, the fields common to the five rungs, and each rung's block.
s1 = between(rec, '\n## 1. The manifest, rung by rung\n', '\n## 2. ')
table = {}
for line in s1.split('\n'):
    m = re.match(r'^\| ([12]) \| ([A-Z]) \| `([a-z0-9-]+)` \| (.*) \| ([0-9]+) \|$', line)
    if m:
        table[m.group(2)] = {'run': m.group(1), 'slug': m.group(3), 'title': ascii_text(m.group(4)), 'minutes': int(m.group(5))}
assert list(table) == list(ALL_IDS), list(table)
assert all(r in RUNS[table[r]['run']] for r in ALL_IDS), ('the table\'s run column and lists30.RUNS differ', {r: table[r]['run'] for r in ALL_IDS})
common_text = between(s1, '\nFields common to the five rungs:\n', '\n### ')
COMMON = {}
for m in re.finditer(r'\*\*([a-z ]+):\*\* ([^.;:]*)', common_text):
    COMMON[m.group(1)] = ascii_text(m.group(2).strip())
# The specification's build runs at the gather of each run, not in the gate: no rung brings a gate step.
assert re.fullmatch(r"none(, but the specification's build at the gather of each run, for N's and C's text)?", COMMON.get('joins the gate', '')), ('common field', 'joins the gate', COMMON.get('joins the gate'))
want_common = {'writes state': 'no', 'its test is the stage': 'no', 'expected moves': 'none', 'lands only with': 'none',
               'expected checker count': 'none declared', 'expected checker crash': 'none'}
for k, v in want_common.items():
    assert COMMON.get(k) == v, ('common field', k, COMMON.get(k))


def rung_names(text):
    """'N, C, F and S' -> ['N', 'C', 'F', 'S']."""
    names = [x.strip() for x in re.split(r',\s*|\s+and\s+', text.strip().rstrip('.')) if x.strip()]
    assert all(re.fullmatch(r'[A-Z]', x) for x in names), ('not a list of rungs', text)
    return names


# The common lands-only-with field: "none. In each run every rung lands on its own." No rung's block has one.
assert re.search(r'^- \*\*lands only with:\*\* none\. In each run every rung lands on its own\.', common_text, flags=re.M), 'the common lands-only-with field'
COMMON_LOW = {}
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
    f['expected minutes'] = table[rid]['minutes']
    assert not any(k.startswith('waits on') for k in f), (rid, 'a waits-on line, which no rung of this batch has')
    # A rung's own "lands only with" field, which the common field must give alike; none where neither names it.
    own = rung_names(re.sub(r'\s*\(.*?\)\.?$', '', f['lands only with'])) if 'lands only with' in f else []
    assert own == COMMON_LOW.get(rid, []), (rid, 'its lands-only-with field and the common one differ', own, COMMON_LOW.get(rid))
    f['lands only with'] = own
    assert all(x in RUN_IDS and x != rid for x in own), (rid, own)
    FIELDS[rid] = f
s6 = rec[rec.index('\n## 6. How it is run\n'):]
intros = between(s6, '\n### What every agent reads first\n', '\n### Before the launch\n').strip()
# The run's part: from its lead, "**Run 1.**" or "**Run 2.**", to the other run's lead or the end, without the lead.
leads = {r: intros.index('**Run %s.** ' % r) for r in RUNS}
assert leads['1'] == 0 and leads['2'] > 0, 'the intro opens with Run 1. and holds Run 2.'
intro = (intros[:leads['2']] if RUN == '1' else intros[leads['2']:])[len('**Run %s.** ' % RUN):].strip()
assert intro.startswith('This run is climb batch %s, ' % BATCH), intro[:80]
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
A('// Generated by explorations/compile-ladder/plan-30/manifest/gen30.py --run %s from' % RUN)
A('// CLIMB-BATCH-30.md (section 4, each rung\'s section word for word; section 1, the')
A('// manifest fields; section 6, the intro of run %s) and the briefings of lists30.py; check30.js checks it.' % RUN)
A('// The record holds two runs: climb batch 30 (rungs N, P, X) and 30b (Y, C).')
A('// Climb batch ' + BATCH + ': rungs ' + ', '.join(IDS) + ', the manifest\'s order; ' + ('; '.join('%s lands only with %s' % (r, ', '.join(FIELDS[r]['lands only with'])) for r in IDS if FIELDS[r]['lands only with']) or 'none lands only with another') + '.' + (' This block leaves out ' + ', '.join(WITHOUT) + '.' if WITHOUT else ''))
A('// Per rung: id, slug, path, branch, expectedMinutes (the scatter\'s start order only),')
A('// writesState, testIsStage, gateJoins (a gate step the rung brings), blurb (one line')
A('// for the batch table), section (the rung\'s section of the record, read by every role')
A('// on the rung), pointsToReport, briefing and reasons (the facts-extract.sh keys the')
A('// worker reads first, each with its reason; of section 3\'s forks, the record\'s one')
A('// key, "Forks the batch takes" whole, for every rung), checks (the sub-list the')
A('// skeptic, a judge and a repair round read), expectedMoves (ladder moves declared,')
A('// none here), and the optional landsOnlyWith, expectedCheckerCount and')
A('// expectedCheckerCrash: no rung lands only with another (section 1\'s common fields),')
A('// and none declares a checker count or a crash (the count is reported).')
A('// Every string here is ASCII: the record\'s sections hold no other character.')
A('// No value is set at launch. The base and the base build are args.base and')
A('// args.baseBuild. At most two agents run at once on this box, FIFO (FACTS.md, "The')
A('// Workflow harness runs two agents at once on this box"); the scatter starts the')
A('// longest expected worker first.')
A('// ===========================================================================')
A('')
A("const BATCH = '%s'" % BATCH)
A("const BATCH_RECORD = '%s'" % BATCH_RECORD)
A("const BRIEFING_LISTS = '%s'" % BRIEFING_LISTS)
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
print('run', RUN, 'batch', BATCH, 'wrote', OUT, len(L), 'lines')
for rid in IDS:
    kept = sorted(set(c for c in sections[rid] if ord(c) > 127))
    print(rid, FIELDS[rid]['slug'], FIELDS[rid]['worktree'], FIELDS[rid]['expected minutes'], 'minutes; section', len(sections[rid]), 'chars' + (', kept as escapes: ' + ' '.join('U+%04X' % ord(c) for c in kept) if kept else '') + ';', len(FIELDS[rid]['points']), 'points;', len(LISTS[rid][0]), 'briefing keys,', len(LISTS[rid][1]), 'checks; lands only with ' + (', '.join(FIELDS[rid]['lands only with']) or 'none') + '; forks', ', '.join(k.split('#')[-1] for k in LISTS[rid][0] if k.endswith('#Forks the batch takes')) + ' (whole)')
