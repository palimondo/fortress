#!/usr/bin/env python3
"""compare_c.py (measure-C: distance-triage/compare.py with a normalised line map)\ncompare.py <base-full.tsv> <variant-full.tsv> [-v] [--map <base-lib> <variant-lib>] :
what a variant changed, by class.

With --map, a variant that adds or removes lines (a patch) has its locations carried back
to the base copy's lines by a line map of each file (difflib over the two copies, as
../switch-over-distance-flat/compare-sites.py maps two trees; a line inside an edited hunk
maps to "edited@N"), and line numbers inside messages are dropped from the comparison.
With --sites, errors are matched by kind and location alone (the n-th error at a site with
the n-th), for a variant that changes the candidate lists printed in many messages.

Errors are matched by kind, location and whole message (fullerrs.py's rows, paths cut to
the file name).  Prints, per class of classify.py, how many of the base's errors went and
how many appeared; with -v every gone (-) and new (+) error with its class.  An error that
moved within the run-to-run variation (switch-over-distance-flat.md section 5: which pair of
LEXICO, SQCAP or INVERSE declarations is named, the order of a union's members, the type a
join infers for an array body) shows as one gone and one new."""
import collections, os, sys
sys.path.insert(0, "/home/user/fortress/explorations/perf-probes/prelude/distance-triage")
import classify as C

import difflib, re
# measure-C: lines are matched after a normalisation that forgets what z32.py changes inside a
# line (static argument lists, the names I, J, K and ZZ32, spacing), so a respelled line still
# maps to its original line; a line z32.py joined or split maps as "edited@N"
def NORM(l):
    while True:                                   # innermost static lists first
        l2 = re.sub(r"\[\\((?!\[\\).)*?\\\]", "", l)
        if l2 == l: break
        l = l2
    l = re.sub(r"(?<![\w'])(I|J|K|ZZ32)(?![\w'])", "X", l)
    return re.sub(r"\s+", "", l)
argv = sys.argv[1:]; verbose = "-v" in argv; argv = [a for a in argv if a != "-v"]
sites = "--sites" in argv; argv = [a for a in argv if a != "--sites"]   # key by kind and location only
maps = None
if "--map" in argv:
    i = argv.index("--map"); based, vard = argv[i + 1], argv[i + 2]; argv = argv[:i] + argv[i + 3:]
    maps = {}
    for n in os.listdir(vard):
        if not n.endswith((".fss", ".fsi")): continue
        old = [NORM(l) for l in open(os.path.join(based, n), encoding="utf-8").read().splitlines()]
        new = [NORM(l) for l in open(os.path.join(vard, n), encoding="utf-8").read().splitlines()]
        m = {}
        for x, y, k in difflib.SequenceMatcher(None, old, new, autojunk=False).get_matching_blocks():
            for j in range(k): m[y + j + 1] = x + j + 1
        maps[n] = m
args = argv
def remap(loc):
    out = []
    for x in loc.split(","):
        r = re.match(r"([\w.]+\.fs[si]):(\d+)$", x)
        if r and r.group(1) in maps:
            n = int(r.group(2)); out.append("%s:%s" % (r.group(1), maps[r.group(1)].get(n, "edited@%d" % n)))
        else: out.append(x)
    return ",".join(sorted(out))
def keyed(p, mapped):
    rows = C.load(p)
    if maps is not None and mapped:   # measure-C: classify the variant at the base's lines
        rows = [(k, fam, remap(loc), msg) for (k, fam, loc, msg) in rows]
    cls = C.with_cascades(rows)
    d = collections.OrderedDict()
    for r, c in zip(rows, cls):
        loc, msg = r[2], r[3]
        if maps is not None:
            msg = re.sub(r"([\w.]+\.fs[si]):\d+(:\d+(-\d+)?)?(:\d+)?", r"\1", msg)
            pass                              # measure-C: already remapped above
        k = (r[0], loc, msg)
        if sites:
            j = 0
            while (r[0], loc, j) in d: j += 1
            k = (r[0], loc, j)
        d[k] = (c, r[3])
    return d
a, b = keyed(args[0], False), keyed(args[1], True)
gone = collections.Counter(c for k, (c, m) in a.items() if k not in b)
new = collections.Counter(c for k, (c, m) in b.items() if k not in a)
ca, cb = collections.Counter(c for c, m in a.values()), collections.Counter(c for c, m in b.values())
codes = [c for c, _, _ in C.RULES] + ["GF", "OT"]
print("%-4s %-70s %7s %7s %7s %7s" % ("", "class", "base", "variant", "gone", "new"))
for c in codes:
    if ca[c] or cb[c]:
        print("%-4s %-70s %7d %7d %7d %7d" % (c, C.NAMES[c][:70], ca[c], cb[c], gone[c], new[c]))
print("%-4s %-70s %7d %7d %7d %7d" % ("", "total", len(a), len(b), sum(gone.values()), sum(new.values())))
if verbose:
    for k, (c, m) in a.items():
        if k not in b: print("-\t%s\t%s\t%s\t%s" % (c, k[0], k[1], m))
    for k, (c, m) in b.items():
        if k not in a: print("+\t%s\t%s\t%s\t%s" % (c, k[0], k[1], m))
