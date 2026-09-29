"""Tie climb batch 6.5b's distance move (627 -> 624) to its edits by comparing two committed per-site tables,
batch N's gate (the comparand) and 6.5b's gate, with no stage run. Batch N's locations are mapped to the landed
tree through line maps of the library files, computed with difflib over git's 382b9fe7f and e3214cbf1 versions; a
line inside an edited hunk has no map and prints as '?<line>'. A site is (kind, unit, location): the table's
family column quotes the message, whose candidate lists changed wholesale once RR32 left RR64's comprises
clause, so messages are not compared.  python3 distance_tie.py > distance-tie.txt"""
import collections, difflib, re, subprocess
REPO = '/home/user/fortress'
A = REPO + '/explorations/compile-ladder/climb-batch-N/gate/distance-sites.tsv'
B = REPO + '/explorations/compile-ladder/climb-batch-6.5b/gate/distance-sites.tsv'
FILES = {'FortressLibrary.fss': 'Library/FortressLibrary.fss',
         'FortressBuiltin.fss': 'ProjectFortress/LibraryBuiltin/FortressBuiltin.fss',
         'RangeInternals.fss': 'Library/RangeInternals.fss',
         'FortressLibrary.fsi': 'Library/FortressLibrary.fsi',
         'FortressBuiltin.fsi': 'ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi'}

def show(rev, path):
    return subprocess.run(['git', '-C', REPO, 'show', f'{rev}:{path}'], capture_output=True, text=True).stdout.splitlines()

maps = {}
for short, path in FILES.items():
    a, b = show('382b9fe7f', path), show('e3214cbf1', path)
    m = {}
    for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, a, b, autojunk=False).get_opcodes():
        if tag == 'equal':
            for k in range(i2 - i1):
                m[i1 + k + 1] = j1 + k + 1
    maps[short] = m

def remap(loc):
    def sub(mo):
        f, line = mo.group(1), int(mo.group(2))
        if f in maps:
            n = maps[f].get(line)
            return f'{f}:{n}' if n else f'{f}:?{line}'
        return mo.group(0)
    return re.sub(r'(\w+\.fs[si]):(\d+)', sub, loc)

def rows(path, remapped):
    out = []
    for l in open(path):
        if l.startswith('#') or not l.strip():
            continue
        c = l.rstrip('\n').split('\t')
        out.append((c[0], c[3], remap(c[5]) if remapped else c[5], c[6]))
    return out

ra, rb = rows(A, True), rows(B, False)
site = lambda r: r[:3]
ka, kb = collections.Counter(map(site, ra)), collections.Counter(map(site, rb))
gone, new = ka - kb, kb - ka
print("batch N's table %d sites, 6.5b's %d; by site (kind, unit, location mapped to the landed tree): %d gone, %d new"
      % (len(ra), len(rb), sum(gone.values()), sum(new.values())))
for tag, d, src in (('gone', gone, ra), ('new', new, rb)):
    print('\n== %s' % tag)
    for r, n in sorted(d.items()):
        for ex in [x for x in src if site(x) == r][:n]:
            print('%s | %s | %s\n     %s' % (r[0], r[1], r[2], ex[3][:300]))
same = sum((ka & kb).values())
print('\n%d sites are in both tables; their message text is not compared' % same)
