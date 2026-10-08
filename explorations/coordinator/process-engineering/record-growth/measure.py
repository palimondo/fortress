#!/usr/bin/env python3
"""Measure how the record grew, commit by commit.

Run from the repository root:

    python3 explorations/coordinator/process-engineering/record-growth/measure.py

It walks the first-parent line of HEAD from the first commit under
explorations/ (446836590) and reads four files at every commit:

    explorations/fortress-gap-ledger.md        (the gap ledger)
    explorations/coordinator/FACTS.md
    explorations/coordinator/POSITIONS.md
    explorations/coordinator/INDEX.md

Writes, next to this script:

    series.csv       one row per first-parent commit: the four sizes after it
    changes.csv      one row per commit and file that changed the file
    by-day.csv       characters added and removed per file, UTC day and class
    top-additions.csv  the ten largest single-commit additions of each file
    per-batch.csv    the four sizes at each batch's landing and the change since the previous landing

Sizes are characters (Unicode code points) and bytes of the file as committed.
The ledger also gets its row count: the table lines that start "| N |" above
the heading "## Revival worklist" (the rule of gap-ledger-archaeology.md, 0).
A merge is read twice: its net change against its first parent stays on the
first-parent line, and each side-branch commit that touched a file adds a
row of kind "branch_commit" to changes.csv (not to series.csv).

Needs only git and Python 3.  Reads landings.csv and labels-2026-10-02.csv.
"""
import csv, collections, datetime as dt, os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import classify

ROOT = subprocess.run(['git', 'rev-parse', '--show-toplevel'], capture_output=True, text=True, cwd=HERE).stdout.strip()
START = '446836590'          # "Add explorations/, CLAUDE.md, and committed research extracts"
FILES = [('ledger', 'explorations/fortress-gap-ledger.md'),
         ('FACTS', 'explorations/coordinator/FACTS.md'),
         ('POSITIONS', 'explorations/coordinator/POSITIONS.md'),
         ('INDEX', 'explorations/coordinator/INDEX.md')]
ROW = re.compile(r'^\| (\d+) \|', re.M)


def clean(subject):
    """A subject as written to the CSVs: one third-party name, which the curator wants unmentioned, left out."""
    return re.sub(r'pluckyporcupine', '[omitted]', subject, flags=re.I)


def git(*a, inp=None, text=True):
    return subprocess.run(('git',) + a, cwd=ROOT, capture_output=True, text=text, input=inp).stdout


def blob_sizes(queries):
    """sha (or None) for each 'commit:path' query, in order."""
    out = git('cat-file', '--batch-check', inp=''.join(q + '\n' for q in queries)).splitlines()
    return [None if o.endswith('missing') else o.split()[0] for o in out]


def read_blobs(shas):
    """{sha: bytes} through one git cat-file --batch."""
    proc = subprocess.Popen(['git', 'cat-file', '--batch'], cwd=ROOT, stdin=subprocess.PIPE, stdout=subprocess.PIPE)
    res = {}
    # write all requests from a thread-free loop: ask, read, repeat (blobs are few)
    for s in shas:
        proc.stdin.write((s + '\n').encode()); proc.stdin.flush()
        head = proc.stdout.readline().split()
        n = int(head[2])
        res[s] = proc.stdout.read(n)
        proc.stdout.read(1)
    proc.stdin.close(); proc.wait()
    return res


def ledger_rows(text):
    i = text.find('## Revival worklist')
    head = text if i < 0 else text[:i]
    rows = {}
    for ln in head.split('\n'):
        m = ROW.match(ln)
        if m:
            rows[int(m.group(1))] = ln
    return rows


def entries(text):
    out, cur = [], None
    for ln in text.split('\n'):
        if ln.startswith('- '):
            if cur is not None:
                out.append(cur)
            cur = ln
        elif ln.startswith('#'):
            if cur is not None:
                out.append(cur); cur = None
        elif cur is not None:
            cur += '\n' + ln
    if cur is not None:
        out.append(cur)
    return out


def ekey(e):
    m = re.match(r'- \*\*(.+?)\*\*', e)
    t = m.group(1) if m else e[2:]
    return re.sub(r'\s+', ' ', t)[:45]


def entry_delta(kind, old, new):
    """(new entries, lengthened entries, top three growths as text) between two versions."""
    if kind == 'ledger':
        o, n = ledger_rows(old), ledger_rows(new)
        items = []
        for k, v in n.items():
            if k not in o:
                items.append(('N', len(v), 'row %d' % k))
            elif len(v) > len(o[k]):
                items.append(('L', len(v) - len(o[k]), 'row %d' % k))
        nn = sum(1 for i in items if i[0] == 'N'); nl = sum(1 for i in items if i[0] == 'L')
    else:
        olist, nlist = entries(old), entries(new)
        oset, nset = set(olist), set(nlist)
        removed = [e for e in olist if e not in nset]
        pool = collections.defaultdict(list)
        for e in removed:
            pool[ekey(e)].append(e)
        items = []
        for e in nlist:
            if e in oset:
                continue
            k = ekey(e)
            if pool.get(k):
                o = pool[k].pop(0); d = len(e) - len(o)
                if d > 0:
                    items.append(('L', d, k))
            else:
                items.append(('N', len(e), k))
        nn = sum(1 for i in items if i[0] == 'N'); nl = sum(1 for i in items if i[0] == 'L')
    items.sort(key=lambda x: -x[1])
    top = ' || '.join('%s +%d %s' % (i[0], i[1], i[2][:55]) for i in items[:3])
    return nn, nl, top


def main():
    land = list(csv.DictReader(open(os.path.join(HERE, 'landings.csv'))))
    full = lambda h: git('rev-parse', h).strip()
    for r in land:
        r['full'] = full(r['landing_commit'])
        r['landing_utc'] = git('log', '-1', '--format=%cI', r['full']).strip()
    landing_of = {r['full']: r['batch'] for r in land}
    windows = [(r['batch'], r['run_start_utc'], dt.datetime.fromisoformat(r['landing_utc']).astimezone(dt.timezone.utc).strftime('%Y-%m-%dT%H:%M')) for r in land]
    classify.set_windows(windows)
    carried = {r['commit']: (r['class_fine'], r['batch']) for r in csv.DictReader(open(os.path.join(HERE, 'labels-2026-10-02.csv')))}

    # first-parent line from START
    fmt = '%H|%h|%cI|%P|%s'
    lines = git('log', '--first-parent', '--reverse', '--format=' + fmt, START + '^..HEAD').splitlines()
    meta = []
    for ln in lines:
        H, h, ci, P, s = ln.split('|', 4)
        meta.append(dict(full=H, h=h, utc=ci, parents=P.split(), subject=clean(s)))
    print('first-parent commits:', len(meta), meta[0]['utc'], '->', meta[-1]['utc'])

    # paths touched by each first-parent commit (a merge: against its first parent)
    paths = collections.defaultdict(set)
    cur = None
    for ln in git('log', '--first-parent', '-m', '--name-only', '--format=@@%H', START + '^..HEAD').splitlines():
        if ln.startswith('@@'):
            cur = ln[2:]
        elif ln:
            paths[cur].add(ln)

    # blob of each file at each commit
    q = []
    for m in meta:
        for _, p in FILES:
            q.append('%s:%s' % (m['full'], p))
    shas = blob_sizes(q)
    for i, m in enumerate(meta):
        m['blobs'] = shas[i * 4:(i + 1) * 4]
    uniq = sorted({s for m in meta for s in m['blobs'] if s})
    # branch commits of merges
    branch = []   # (merge meta, side commit full, file index)
    for m in meta:
        if len(m['parents']) < 2:
            continue
        for fi, (_, p) in enumerate(FILES):
            for side in git('log', '--reverse', '--format=%H', '%s..%s' % (m['parents'][0], m['parents'][1]), '--', p).split():
                branch.append((m, side, fi))
    bq = []
    for _, side, fi in branch:
        bq += ['%s:%s' % (side, FILES[fi][1]), '%s^:%s' % (side, FILES[fi][1])]
    bshas = blob_sizes(bq) if bq else []
    for i in range(len(branch)):
        uniq_extra = [s for s in bshas[2 * i:2 * i + 2] if s]
        uniq += uniq_extra
    uniq = sorted(set(uniq))
    data = read_blobs(uniq)
    info = {}
    for s, b in data.items():
        t = b.decode('utf-8', errors='replace')
        info[s] = dict(text=t, chars=len(t), bytes=len(b))
    ledger_cache = {}

    def nrows(sha):
        if sha not in ledger_cache:
            ledger_cache[sha] = len(ledger_rows(info[sha]['text'])) if sha else 0
        return ledger_cache[sha]

    def size(sha, what):
        return info[sha][what] if sha else 0

    # series.csv
    with open(os.path.join(HERE, 'series.csv'), 'w', newline='') as f:
        w = csv.writer(f)
        w.writerow(['seq', 'utc', 'commit', 'ledger_rows', 'ledger_chars', 'facts_chars', 'positions_chars', 'index_chars',
                    'ledger_bytes', 'facts_bytes', 'positions_bytes', 'index_bytes', 'landing_of', 'subject'])
        for i, m in enumerate(meta):
            b = m['blobs']
            w.writerow([i, m['utc'][:19].replace('T', ' ') + 'Z', m['h'], nrows(b[0]),
                        size(b[0], 'chars'), size(b[1], 'chars'), size(b[2], 'chars'), size(b[3], 'chars'),
                        size(b[0], 'bytes'), size(b[1], 'bytes'), size(b[2], 'bytes'), size(b[3], 'bytes'),
                        landing_of.get(m['full'], ''), m['subject'][:120]])
    print('series.csv written')

    # changes.csv
    def label(h, subject, utc, ps):
        if h in carried:
            return carried[h]
        return classify.classify(subject, ps, utc)

    rows = []
    prev = None
    for m in meta:
        for fi, (name, p) in enumerate(FILES):
            sha = m['blobs'][fi]
            psha = prev['blobs'][fi] if prev else None
            if sha == psha:
                continue
            if sha is None and psha is None:
                continue
            old = info[psha]['text'] if psha else ''
            new = info[sha]['text'] if sha else ''
            nn, nl, top = entry_delta('ledger' if name == 'ledger' else 'x', old, new)
            cf, bt = label(m['h'], m['subject'], m['utc'], paths.get(m['full'], set()))
            if m['full'] in landing_of:
                cf, bt = 'batch landing', landing_of[m['full']]
            rows.append(dict(file=name, utc=m['utc'][:19].replace('T', ' ') + 'Z', commit=m['h'],
                             kind='first_parent' if len(m['parents']) == 1 else 'merge_first_parent',
                             chars=size(sha, 'chars'), delta_chars=size(sha, 'chars') - size(psha, 'chars'),
                             bytes=size(sha, 'bytes'), delta_bytes=size(sha, 'bytes') - size(psha, 'bytes'),
                             rows=nrows(sha) if name == 'ledger' else '', delta_rows=(nrows(sha) - nrows(psha)) if name == 'ledger' else '',
                             class_coarse=classify.coarse(cf), class_fine=cf, batch=bt,
                             new_entries=nn, lengthened_entries=nl, top_entries=top,
                             subject=m['subject'], note=''))
        prev = m
    for i, (m, side, fi) in enumerate(branch):
        name = FILES[fi][0]
        sha, psha = bshas[2 * i], bshas[2 * i + 1]
        if sha == psha:
            continue
        old = info[psha]['text'] if psha else ''
        new = info[sha]['text'] if sha else ''
        nn, nl, top = entry_delta('ledger' if name == 'ledger' else 'x', old, new)
        sub = clean(git('log', '-1', '--format=%s', side).strip())
        ut = git('log', '-1', '--format=%cI', side).strip()
        h = git('log', '-1', '--format=%h', side).strip()
        cf, bt = label(h, sub, ut, set(git('diff-tree', '--no-commit-id', '--name-only', '-r', '--root', side).split()))
        rows.append(dict(file=name, utc=ut[:19].replace('T', ' ') + 'Z', commit=h, kind='branch_commit',
                         chars=size(sha, 'chars'), delta_chars=size(sha, 'chars') - size(psha, 'chars'),
                         bytes=size(sha, 'bytes'), delta_bytes=size(sha, 'bytes') - size(psha, 'bytes'),
                         rows=nrows(sha) if name == 'ledger' else '', delta_rows=(nrows(sha) - nrows(psha)) if name == 'ledger' else '',
                         class_coarse=classify.coarse(cf), class_fine=cf, batch=bt,
                         new_entries=nn, lengthened_entries=nl, top_entries=top, subject=sub,
                         note='not on the first-parent line; brought in by merge %s; size is on the side branch' % m['h']))
    rows.sort(key=lambda r: (r['utc'], r['file']))
    cols = list(rows[0].keys())
    with open(os.path.join(HERE, 'changes.csv'), 'w', newline='') as f:
        w = csv.DictWriter(f, fieldnames=cols); w.writeheader(); w.writerows(rows)
    print('changes.csv rows:', len(rows))

    # by-day.csv: first-parent rows only (a branch commit is already inside its merge's net change)
    agg = collections.defaultdict(lambda: [0, 0, 0])
    for r in rows:
        if r['kind'] == 'branch_commit':
            continue
        k = (r['file'], r['utc'][:10], r['class_coarse'])
        d = r['delta_chars']
        agg[k][0] += max(d, 0); agg[k][1] += min(d, 0); agg[k][2] += 1
    with open(os.path.join(HERE, 'by-day.csv'), 'w', newline='') as f:
        w = csv.writer(f); w.writerow(['file', 'utc_day', 'class', 'added_chars', 'removed_chars', 'net_chars', 'commits'])
        for k in sorted(agg):
            a = agg[k]; w.writerow([k[0], k[1], k[2], a[0], a[1], a[0] + a[1], a[2]])

    # top-additions.csv
    with open(os.path.join(HERE, 'top-additions.csv'), 'w', newline='') as f:
        w = csv.writer(f)
        w.writerow(['file', 'rank', 'utc', 'commit', 'class', 'batch', 'added_chars', 'new_entries', 'lengthened_entries', 'top_entries', 'subject'])
        for name, _ in FILES:
            rs = sorted((r for r in rows if r['file'] == name and r['kind'] != 'branch_commit' and r['delta_chars'] > 0),
                        key=lambda r: -r['delta_chars'])[:10]
            for i, r in enumerate(rs, 1):
                w.writerow([name, i, r['utc'][:16].replace(' ', 'T'), r['commit'], r['class_fine'], r['batch'], r['delta_chars'],
                            r['new_entries'], r['lengthened_entries'], r['top_entries'], r['subject'][:140]])
    # per-batch.csv: sizes at each landing, change since the previous landing (the first from the start)
    by_full = {m['full']: m for m in meta}
    with open(os.path.join(HERE, 'per-batch.csv'), 'w', newline='') as f:
        w = csv.writer(f)
        w.writerow(['batch', 'landing_commit', 'landing_utc', 'ledger_rows', 'ledger_chars', 'facts_chars', 'positions_chars', 'index_chars',
                    'd_ledger_rows', 'd_ledger_chars', 'd_facts_chars', 'd_positions_chars', 'd_index_chars', 'code_commits'])
        prevv = [0, 0, 0, 0, 0]
        for r in sorted(land, key=lambda r: r['landing_utc']):
            b = by_full[r['full']]['blobs']
            v = [nrows(b[0]), size(b[0], 'chars'), size(b[1], 'chars'), size(b[2], 'chars'), size(b[3], 'chars')]
            w.writerow([r['batch'], r['landing_commit'], r['landing_utc'][:19].replace('T', ' ') + 'Z'] + v + [a - c for a, c in zip(v, prevv)] + [r['code_commits']])
            prevv = v
    print('done; HEAD', meta[-1]['h'], meta[-1]['utc'])


if __name__ == '__main__':
    main()
