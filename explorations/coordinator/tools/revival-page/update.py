#!/usr/bin/env python3
"""Keep the revival page's "Where it stands" block current at a landing.

    python3 explorations/coordinator/tools/revival-page/update.py [--check] [--landing N] [--run-start T]

Reads every value from the record (PLAN.md's "Where we stand" and phase lines, the
batch's gate summary, FACTS' F-299), rewrites the block between <!-- stand:begin -->
and <!-- stand:end --> in revival-story.md and revival-story.html in its fixed form,
adds the landing's row to record-growth/landings.csv if it is missing, runs
record-growth/measure.py and chart.py, and sets the end of the date range in the
HTML's chart alt text to the data's last day; then it writes the GitHub Pages copy
(docs/revival-story/).  --pages writes only that copy.  With --check it reads the values and prints
the block it would write, and changes no file.  It never publishes: it prints the
commit and the republish that the coordinator then runs.

Where a source's form is not the one this script parses, it says so and stops.
The README beside this script names the source of each value.
"""
import argparse, csv, hashlib, html, os, re, shutil, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = subprocess.run(['git', 'rev-parse', '--show-toplevel'], cwd=HERE, capture_output=True, text=True).stdout.strip()
EXP = os.path.join(ROOT, 'explorations')
PLAN = os.path.join(EXP, 'coordinator', 'PLAN.md')
FACTS_TOOL = os.path.join(EXP, 'coordinator', 'tools', 'facts-extract.sh')
PE = os.path.join(EXP, 'coordinator', 'process-engineering')
PAGE_MD = os.path.join(PE, 'revival-story.md')
PAGE_HTML = os.path.join(PE, 'revival-story.html')
RG = os.path.join(PE, 'record-growth')
LANDINGS = os.path.join(RG, 'landings.csv')
CHART = os.path.join(RG, 'record-growth.png')
DATA = [os.path.join(RG, f) for f in ('series.csv', 'changes.csv', 'by-day.csv', 'top-additions.csv', 'per-batch.csv')]
PAGE_URL = 'https://claude.ai/artifact/8Gg1f2ZRXg462qmhcwx1T5'   # the revival page (coordinator/BOOT.md, version 26)
DOCS = os.path.join(ROOT, 'docs')                                  # GitHub Pages: branch main, folder /docs
PAGES_DIR = os.path.join(DOCS, 'revival-story')
PAGES_HTML, PAGES_CHART = os.path.join(PAGES_DIR, 'index.html'), os.path.join(PAGES_DIR, 'record-growth.png')
PAGES_FILES = [PAGES_HTML, PAGES_CHART, os.path.join(DOCS, '.nojekyll'), os.path.join(DOCS, 'index.html')]
PAGES_URL = 'https://palimondo.github.io/fortress/revival-story/'
BEGIN, END = '<!-- stand:begin -->', '<!-- stand:end -->'
MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
          'September', 'October', 'November', 'December']
LABELS = ['Phase', 'Checker count', 'Distance', 'Native bindings that both implementations can call',
          'microGPT under the interpreter', 'microGPT on the compiler', 'Next']
NUMBER_WORDS = {'one': 1, 'two': 2, 'three': 3, 'paths': 4, 'five': 5}
ALT = re.compile(r'(<img src="record-growth\.png" alt="[^"]*commit by commit from \d{2}-\d{2} to )(\d{2}-\d{2})([^"]*")')


class Stop(Exception):
    pass


def stop(msg):
    raise Stop(msg)


def rel(p):
    return os.path.relpath(p, ROOT)


def git(*a):
    r = subprocess.run(('git',) + a, cwd=ROOT, capture_output=True, text=True)
    if r.returncode:
        stop('git %s failed: %s' % (' '.join(a), r.stderr.strip()))
    return r.stdout


def one(pattern, text, where, flags=0):
    ms = list(re.finditer(pattern, text, flags))
    if len(ms) != 1:
        stop('%s: expected one match of /%s/, found %d; its form changed, so the script stops rather than guess'
             % (where, pattern, len(ms)))
    return ms[0]


def day_month(iso, year=True):
    y, m, d = iso.split('-')
    return '%d %s%s' % (int(d), MONTHS[int(m) - 1], ' ' + y if year else '')


def section(text, heading_re, level):
    """The text under the first heading that matches, to the next heading of the same or a higher level."""
    m = one(r'^%s %s.*$' % ('#' * level, heading_re), text, 'PLAN.md, heading /%s/' % heading_re, re.M)
    rest = text[m.end():]
    n = re.search(r'^#{1,%d} ' % level, rest, re.M)
    return rest[:n.start()] if n else rest


# ---------------------------------------------------------------- the values

def read_values(landing):
    v, src = {}, {}
    plan = open(PLAN, encoding='utf-8').read()
    stand = section(plan, r'Where we stand', 2)

    live = one(r'^- \*\*The live thread\.\*\* (.*)$', stand, 'PLAN.md, "Where we stand", the live thread', re.M).group(1)
    m = one(r'^Phase (\d+), ([^:]+): ', live, 'PLAN.md, the live thread\'s opening')
    v['phase'], v['phase_name'] = int(m.group(1)), m.group(2)
    m = one(r'At the last landed gate, climb batch (\S+?)\'s \(`([0-9a-f]{7,40})`[^)]*\)', live, 'PLAN.md, the live thread\'s last landed gate')
    plan_last, plan_commit = m.group(1), m.group(2)
    v['batch'] = landing or plan_last
    current = v['batch'] == plan_last
    if current:
        v['count_plan'] = int(one(r'the checker count (\d+)\b', live, 'PLAN.md, the live thread\'s checker count').group(1))
        v['distance_plan'] = int(one(r'the distance is (\d+)\b', live, 'PLAN.md, the live thread\'s distance').group(1))
    else:
        print('note: PLAN.md\'s "Where we stand" names climb batch %s as the last landed, not %s; its count and distance '
              'are not this landing\'s, so only the gate summary gives them' % (plan_last, v['batch']), file=sys.stderr)

    # the batch's own line under its phase: landed <date> at `<commit>`
    m = one(r'^- \*\*Climb batch %s\*\*, phase (\d+)\'s \w+ batch, landed (\d{4}-\d{2}-\d{2}) at `([0-9a-f]{7,40})`'
            % re.escape(v['batch']), plan, 'PLAN.md, climb batch %s\'s phase line' % v['batch'], re.M)
    v['date'], v['commit'] = m.group(2), m.group(3)
    if current and not plan_commit.startswith(v['commit']) and not v['commit'].startswith(plan_commit):
        stop('PLAN.md gives climb batch %s two commits: %s ("Where we stand") and %s (its phase line)' % (v['batch'], plan_commit, v['commit']))
    cdate = git('show', '-s', '--format=%cI', v['commit']).strip()
    if not cdate:
        stop('commit %s, PLAN.md\'s landing of climb batch %s, is not in this repository' % (v['commit'], v['batch']))
    from datetime import datetime, timezone
    cutc = datetime.fromisoformat(cdate).astimezone(timezone.utc)
    if cutc.strftime('%Y-%m-%d') != v['date']:
        stop('PLAN.md dates climb batch %s\'s landing %s, but its commit %s is of %s UTC' % (v['batch'], v['date'], v['commit'], cutc.isoformat()))
    summary_rel = 'explorations/compile-ladder/climb-batch-%s/gate/summary.txt' % v['batch']
    if not git('show', '--name-only', '--format=', v['commit'], '--', summary_rel).strip():
        stop('commit %s does not record %s, so it is not the gate\'s tables commit that landings.csv takes as the landing' % (v['commit'], summary_rel))

    # the phase: its number of the phases, and the date its first batch landed
    v['phases'] = max(int(x) for x in re.findall(r'^### Phase (\d+)\. ', plan, re.M))
    m = one(r'^- \*\*Climb batch \S+\*\*, phase %d\'s first batch, landed (\d{4}-\d{2}-\d{2}) ' % v['phase'], plan,
            'PLAN.md, phase %d\'s first batch line' % v['phase'], re.M)
    v['phase_since'] = m.group(1)

    # the gate summary
    summary = open(os.path.join(ROOT, summary_rel), encoding='utf-8').read()
    m = one(r'^# checker COUNT (SAME|DOWN|UP)\s+(?:\d+\s*->\s*)?(\d+)\b', summary, summary_rel + ', its COUNT line', re.M)
    v['count'] = int(m.group(2))
    m = one(r'^# distance DISTANCE (SAME|DOWN|UP)\s+(?:\d+\s*->\s*)?(\d+)\b', summary, summary_rel + ', its DISTANCE line', re.M)
    v['distance'] = int(m.group(2))
    for k in ('count', 'distance'):
        if current and v[k] != v[k + '_plan']:
            stop('the %s is %d in PLAN.md but %d in %s' % (k, v[k + '_plan'], v[k], summary_rel))
    verdicts = re.findall(r'^# microgpt-walk VERDICT: (.*)$', summary, re.M)
    rcs = re.findall(r'^# microgpt-walk rc=(\d+)', summary, re.M)
    if len(verdicts) != 2 or len(rcs) != 2:
        stop('%s has %d microgpt-walk VERDICT lines and %d rc lines, not the two of the quick pair' % (summary_rel, len(verdicts), len(rcs)))
    if not all(re.fullmatch(r'(\d+) PASS, 0 FAIL of \1 -- ALL PASS', x) for x in verdicts) or rcs != ['0', '0']:
        stop('the quick check did not pass both programs (%s; rc %s); the block\'s form has words only for both passing'
             % ('; '.join(verdicts), ', '.join(rcs)))

    # the distance's open reading: phase 3's sentence on what the zero rests on
    if v['distance'] != 0:
        stop('the distance is %d; the block\'s form has words only for a distance of 0 under its reading' % v['distance'])
    p3 = section(plan, r'Phase 3\.', 3)
    m = one(r'The zero over the fourteen rests on (\w+) readings? he has not confirmed', p3, 'PLAN.md, phase 3\'s open reading')
    if NUMBER_WORDS.get(m.group(1)) != 1:
        stop('PLAN.md\'s phase 3 says the zero rests on "%s" readings; the block\'s form has words only for one' % m.group(1))

    # the compiled path: PLAN's "Runs" line
    runs = one(r'^- \*\*Runs\.\*\* (.*)$', stand, 'PLAN.md, "Where we stand", the runs', re.M).group(1)
    one(r'On the compiled path microGPT\'s \d+ components stop at name resolution until the switch-over', runs,
        'PLAN.md, the runs\' compiled path')

    # the native bindings: F-299's headline sentence
    r = subprocess.run([FACTS_TOOL, 'F-299'], cwd=ROOT, capture_output=True, text=True)
    if r.returncode:
        stop('facts-extract.sh F-299 failed: ' + r.stderr.strip())
    entry = one(r'^- F-299 \*\*(.*?)\*\*(.*)$', r.stdout, 'FACTS F-299, its entry', re.M)
    m = one(r'\band (\d+) of the one library\'s (\d+) live bindings name one\.$', entry.group(1), 'FACTS F-299, its headline sentence')
    v['bindings'], v['bindings_of'] = int(m.group(1)), int(m.group(2))
    glue = one(r'[Tt]he other (\d+) name glue classes', entry.group(2), 'FACTS F-299, its glue classes')
    if v['bindings'] + int(glue.group(1)) != v['bindings_of']:
        stop('F-299: %d helpers and %s glue classes do not make %d' % (v['bindings'], glue.group(1), v['bindings_of']))

    # the next batch: the landing's number plus one, and PLAN's line for it
    m = re.match(r'(\d+)', v['batch'])
    if not m:
        stop('climb batch %s has no number to add one to' % v['batch'])
    v['next'] = str(int(m.group(1)) + 1)
    nxt = re.search(r'^- \*\*Climb batch %s\*\*, (.*)$' % v['next'], plan, re.M)
    if nxt and ' landed ' not in nxt.group(1) and not ('natives' in nxt.group(1) and 'code-generator' in nxt.group(1)):
        stop('PLAN.md\'s line for climb batch %s no longer names the natives and the code generator; the "Next" bullet\'s words need a new form' % v['next'])
    if not nxt:
        print('note: PLAN.md has no line for climb batch %s yet' % v['next'], file=sys.stderr)
    v['summary_rel'] = summary_rel
    return v


# ---------------------------------------------------------------- the block

def block(v):
    heading = 'Where it stands, at the landing of batch %s on %s' % (v['batch'], day_month(v['date']))
    texts = [
        '%d of %d, which ends with %s, since %s.' % (v['phase'], v['phases'], v['phase_name'], day_month(v['phase_since'], year=False)),
        '%d.' % v['count'],
        '%d, under one reading that the curator has still to decide (section 5, phase 3).' % v['distance'],
        '%d of %d.' % (v['bindings'], v['bindings_of']),
        'the flat and the APL program pass the quick check.',
        'both programs stop at names that only the library declares, until the switch-over.',
        'batch %s, more native bindings and the code generator\'s gaps, once the curator approves it.' % v['next'],
    ]
    md = '\n'.join(['**%s**' % heading, ''] + ['- **%s:** %s' % (l, t) for l, t in zip(LABELS, texts)])
    e = lambda s: html.escape(s, quote=False)
    ht = '\n'.join(['<p><strong>%s</strong></p>' % e(heading), '<ul>'] +
                   ['<li><strong>%s:</strong> %s</li>' % (e(l), e(t)) for l, t in zip(LABELS, texts)] + ['</ul>'])
    return md, ht


def current_block(path):
    text = open(path, encoding='utf-8').read()
    if text.count(BEGIN) != 1 or text.count(END) != 1 or text.index(BEGIN) > text.index(END):
        stop('%s must hold %s and %s once each, in that order' % (rel(path), BEGIN, END))
    a = text.index(BEGIN) + len(BEGIN)
    return text, a, text.index(END)


def check_form(path, inner, is_html):
    """The block now in the file has the fixed form: the heading line and the seven labelled bullets."""
    if is_html:
        heads = re.findall(r'^<p><strong>Where it stands, at the landing of batch \S+ on [^<]+</strong></p>$', inner, re.M)
        labels = re.findall(r'^<li><strong>([^<]+):</strong> ', inner, re.M)
    else:
        heads = re.findall(r'^\*\*Where it stands, at the landing of batch \S+ on .+\*\*$', inner, re.M)
        labels = re.findall(r'^- \*\*(.+?):\*\* ', inner, re.M)
    if len(heads) != 1 or [html.unescape(x) for x in labels] != LABELS:
        stop('the block in %s is not in the fixed form (a heading line, then the bullets %s); the script stops' % (rel(path), ', '.join(LABELS)))


# ---------------------------------------------------------------- the chart's row

def landing_row(v, run_start):
    rows = list(csv.DictReader(open(LANDINGS, encoding='utf-8')))
    name = 'batch %s' % v['batch']
    have = [r for r in rows if r['batch'] == name]
    if have:
        lc = have[0]['landing_commit']
        if not (v['commit'].startswith(lc) or lc.startswith(v['commit'])):
            stop('landings.csv has %s at %s, but PLAN.md lands it at %s' % (name, lc, v['commit']))
        return None
    rec = os.path.join(EXP, 'compile-ladder', 'climb-batch-%s' % v['batch'], 'RECORD.md')
    text = open(rec, encoding='utf-8').read()
    tab = section(text, r'The landed commits', 2)
    commits = re.findall(r'^\|[^\n]*\| `([0-9a-f]{7,40})` \|$', tab, re.M)
    if not commits:
        stop('%s, "The landed commits": no commit column read' % rel(rec))
    note = ('landing = the gate\'s tables commit; run start = %s; rungs\' commits from compile-ladder/climb-batch-%s/RECORD.md')
    if run_start is None:
        stop('landings.csv has no row for %s; its run start is its first agent\'s first line in the run\'s transcripts, which '
             'the record does not hold: give it with --run-start YYYY-MM-DDTHH:MM, or --run-start base for the time of the '
             'gather record\'s base commit' % name)
    if run_start == 'base':
        base = one(r'from the base `([0-9a-f]{7,40})`', text, rel(rec) + ', its base').group(1)
        from datetime import datetime, timezone
        start = datetime.fromisoformat(git('show', '-s', '--format=%cI', base).strip()).astimezone(timezone.utc).strftime('%Y-%m-%dT%H:%M')
        how = 'the time of the gather record\'s base commit %s' % base[:9]
    else:
        if not re.fullmatch(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}', run_start):
            stop('--run-start takes YYYY-MM-DDTHH:MM (UTC) or base')
        start, how = run_start, 'its first agent\'s first line (the run\'s transcripts)'
    return [name, start, v['commit'][:9], ' '.join(c[:9] for c in commits), note % (how, v['batch'])]


# ---------------------------------------------------------------- the chart's alt text

def alt_match(text):
    ms = list(ALT.finditer(text))
    if len(ms) != 1:
        stop('%s: expected one <img src="record-growth.png"> whose alt text reads "commit by commit from MM-DD to MM-DD", found %d'
             % (rel(PAGE_HTML), len(ms)))
    return ms[0]


def data_last_day():
    """The last commit's UTC day in series.csv, as MM-DD (the day chart.py's title ends with)."""
    rows = list(csv.DictReader(open(DATA[0], encoding='utf-8')))
    if not rows or not re.match(r'\d{4}-\d{2}-\d{2} ', rows[-1]['utc']):
        stop('%s has no last row with a UTC time' % rel(DATA[0]))
    return rows[-1]['utc'][5:10]


def rewrite_alt():
    """Set the alt text's last day to the data's; nothing else of the file changes.  Returns (was, now)."""
    text = open(PAGE_HTML, encoding='utf-8').read()
    m, last = alt_match(text), data_last_day()
    if m.group(2) != last:
        with open(PAGE_HTML, 'w', encoding='utf-8', newline='') as f:
            f.write(text[:m.start(2)] + last + text[m.end(2):])
    return m.group(2), last


# ---------------------------------------------------------------- the Pages copy

def write_pages():
    """docs/revival-story/index.html: the page's HTML, which the artifact service wraps, as a whole document,
    its <title> in the head and the rest of the file, unchanged, as the body; the chart beside it; docs/.nojekyll;
    docs/index.html, a refresh to revival-story/."""
    text = open(PAGE_HTML, encoding='utf-8').read()
    m = re.match(r'<title>([^<]*)</title>\n?', text)
    if not m or text.count('<title>') != 1:
        stop('%s does not open with its one <title>; the Pages copy takes its title from there' % rel(PAGE_HTML))
    doc = ('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
           '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
           '<title>%s</title>\n</head>\n<body>\n%s%s</body>\n</html>\n'
           % (m.group(1), text[m.end():], '' if text.endswith('\n') else '\n'))
    index = ('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
             '<meta http-equiv="refresh" content="0; url=revival-story/">\n<title>%s</title>\n</head>\n'
             '<body>\n<p><a href="revival-story/">%s</a></p>\n</body>\n</html>\n' % (m.group(1), m.group(1)))
    os.makedirs(PAGES_DIR, exist_ok=True)
    for path, content in ((PAGES_HTML, doc), (PAGES_FILES[2], ''), (PAGES_FILES[3], index)):
        with open(path, 'w', encoding='utf-8', newline='') as f:
            f.write(content)
    shutil.copyfile(CHART, PAGES_CHART)


# ---------------------------------------------------------------- main

def digest(p):
    return hashlib.sha256(open(p, 'rb').read()).hexdigest() if os.path.exists(p) else None


def main():
    ap = argparse.ArgumentParser(description='Keep the revival page\'s "Where it stands" block current at a landing.')
    ap.add_argument('--check', action='store_true', help='read the values and print the block; change no file')
    ap.add_argument('--landing', metavar='N', help='the landed batch (default: the last that PLAN.md names)')
    ap.add_argument('--run-start', metavar='T', help='the run start for a new landings.csv row: YYYY-MM-DDTHH:MM UTC, or base')
    ap.add_argument('--pages', action='store_true', help='write only the GitHub Pages copy from the HTML and the chart as they are')
    a = ap.parse_args()
    if a.pages:
        before = {p: digest(p) for p in PAGES_FILES}
        write_pages()
        for p in PAGES_FILES:
            print('  %-50s %s' % (rel(p), 'changed' if digest(p) != before[p] else 'unchanged'))
        print('The Pages copy is served at %s once main is pushed.' % PAGES_URL)
        return
    v = read_values(a.landing)
    md, ht = block(v)

    print('Values for climb batch %s:' % v['batch'])
    print('  landing          %s on %s (PLAN.md, the live thread and climb batch %s\'s phase line; git)' % (v['commit'], v['date'], v['batch']))
    print('  phase            %d of %d, %s, since %s (PLAN.md: the live thread, the "### Phase N." headings, phase %d\'s first batch line)'
          % (v['phase'], v['phases'], v['phase_name'], v['phase_since'], v['phase']))
    print('  checker count    %d (%s, COUNT; PLAN.md)' % (v['count'], v['summary_rel']))
    print('  distance         %d, one open reading (%s, DISTANCE; PLAN.md; phase 3\'s reading)' % (v['distance'], v['summary_rel']))
    print('  native bindings  %d of %d (FACTS F-299, its headline sentence)' % (v['bindings'], v['bindings_of']))
    print('  microGPT walk    both quick checks pass (%s, # microgpt-walk)' % v['summary_rel'])
    print('  next             batch %s (the landing plus one)' % v['next'])
    print()
    print(BEGIN); print(md); print(END)
    print()

    files = [(PAGE_MD, md, False), (PAGE_HTML, ht, True)]
    for path, new, is_html in files:
        text, s, e = current_block(path)
        check_form(path, text[s:e], is_html)
        same = text[s:e].strip('\n') == new
        print('%s: the block %s' % (rel(path), 'is the same, word for word' if same else 'differs and would be rewritten'))
    m = alt_match(open(PAGE_HTML, encoding='utf-8').read())
    print('%s: the chart\'s alt text runs to %s; %s ends at %s' % (rel(PAGE_HTML), m.group(2), os.path.basename(DATA[0]), data_last_day()))
    row = landing_row(v, a.run_start) if not a.check else None
    if a.check:
        rows = [r for r in csv.DictReader(open(LANDINGS, encoding='utf-8')) if r['batch'] == 'batch %s' % v['batch']]
        print('%s: %s' % (rel(LANDINGS), 'has the row for batch %s' % v['batch'] if rows else 'has no row for batch %s; the run adds it (--run-start)' % v['batch']))
        print('--check: no file changed.')
        return

    tracked = [PAGE_MD, PAGE_HTML, LANDINGS, CHART] + DATA + PAGES_FILES
    before = {p: digest(p) for p in tracked}
    for path, new, _ in files:
        text, s, e = current_block(path)
        out = text[:s] + '\n' + new + '\n' + text[e:]
        if out != text:
            with open(path, 'w', encoding='utf-8', newline='') as f:
                f.write(out)
    if row:
        with open(LANDINGS, 'a', encoding='utf-8', newline='') as f:
            csv.writer(f, lineterminator='\n').writerow(row)
        print('%s: added %s' % (rel(LANDINGS), ','.join(row)))
    for script in ('measure.py', 'chart.py'):
        r = subprocess.run([sys.executable, os.path.join(RG, script)], cwd=ROOT, capture_output=True, text=True)
        sys.stdout.write(''.join('  %s: %s\n' % (script, ln) for ln in r.stdout.splitlines()))
        if r.returncode:
            sys.stderr.write(r.stderr)
            stop('%s failed (rc %d)' % (script, r.returncode))

    old, last = rewrite_alt()
    if old != last:
        print('%s: the chart\'s alt text now runs to %s (was %s)' % (rel(PAGE_HTML), last, old))
    write_pages()
    print()
    print('Changed:')
    for p in tracked:
        print('  %-75s %s' % (rel(p), 'changed' if digest(p) != before[p] else 'unchanged'))
    paths = [rel(p) for p in (PAGE_MD, PAGE_HTML, LANDINGS, CHART, PAGES_HTML, PAGES_CHART)]
    print()
    print('The coordinator then runs, from the repository root:')
    print('  1. git add -- %s && git commit -m "Revival page: where it stands at the landing of climb batch %s, the record chart regenerated" -- %s'
          % (' '.join(paths), v['batch'], ' '.join(paths)))
    print('     (with the footer of the fortress-repo skill\'s committing part; measure.py also rewrote its data, %s: name them too to keep the chart\'s data with it)'
          % ', '.join(os.path.basename(p) for p in DATA))
    print('  2. Artifact publish, url %s, file_path %s, files {"record-growth.png": "%s"}' % (PAGE_URL, rel(PAGE_HTML), rel(CHART)))
    print('  (the Pages copy, %s, is served at %s once main is pushed)' % (rel(PAGES_DIR), PAGES_URL))


if __name__ == '__main__':
    try:
        main()
    except Stop as s:
        print('update.py stops: %s' % s, file=sys.stderr)
        sys.exit(2)
