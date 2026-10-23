"""Compare two distance runs site by site.

usage: sites.py <base errors.tsv> <other errors.tsv> [<base run.txt> <other run.txt>]

Each errors.tsv is the distance stage's one-row-per-error list (distance/errors.py, kept in
the run's scratch directory). A site is the row's kind, unit, location and message, with
the numbers of renamed type variables (T$123), inference variables (#ab12) and the
digits after a `$` masked, so that two runs of one library compare equal where they
report the same error at the same place. Prints the sites gone and the sites come, each
with its kind, unit, location and the first 300 characters of its message, then the two
counts. With the two run.txt files, it also compares the `@@PROBE CRASH` lines (the
names on which a check crashed and was caught), with the same masking.
"""
import re, sys


def mask(s):
    s = re.sub(r"\$[0-9]+", "$N", s)
    s = re.sub(r"#[0-9a-z]{4}\b", "#V", s)
    return s


def sites(path):
    out = {}
    for line in open(path, encoding="utf-8"):
        if line.startswith("#") or not line.strip():
            continue
        f = line.rstrip("\n").split("\t")
        kind, fam, sub, unit, stage, loc, msg = (f + [""] * 7)[:7]
        key = (kind, unit, loc, mask(msg))
        out[key] = out.get(key, 0) + 1
    return out


def crashes(path):
    out = set()
    for line in open(path, encoding="utf-8", errors="replace"):
        if line.startswith("@@PROBE CRASH"):
            out.add(mask(line.strip()))
    return out


a, b = sites(sys.argv[1]), sites(sys.argv[2])
gone = sorted(k for k in a if k not in b)
come = sorted(k for k in b if k not in a)
for tag, ks in (("GONE", gone), ("CAME", come)):
    for k in ks:
        print("%s\t%s\t%s\t%s\t%s" % (tag, k[0], k[1], k[2], k[3][:300]))
print("# %d sites in the first, %d in the second; %d gone, %d come" % (len(a), len(b), len(gone), len(come)))
if len(sys.argv) > 4:
    ca, cb = crashes(sys.argv[3]), crashes(sys.argv[4])
    for c in sorted(ca - cb):
        print("CRASH GONE\t" + c[:300])
    for c in sorted(cb - ca):
        print("CRASH CAME\t" + c[:300])
    print("# caught crashes: %d in the first, %d in the second" % (len(ca), len(cb)))
