#!/usr/bin/env python3
"""sites.py <base-commit> <before-errors.tsv> <after-errors.tsv>: the distance stage's error lists (errors.tsv, one row
per distinct error: kind, family, subclass, unit, stage, location, message) compared site by site across an edit.

A site is the set of an error's locations file:line. An after-site in a file the edit changed is mapped back to the base's line through the
edit's own line map (git diff -U0 <base-commit> -- <file>): a line in an unchanged stretch maps to its base line; a
line inside a changed hunk maps to the base hunk's line range, and matches any before-site in that range. Then:
  KEPT      an after-site whose mapped site had an error before (the message may have changed);
  NEW       an after-site with no error at its mapped site before;
  GONE      a before-site with no error after at any site that maps to it.
Each NEW site is printed with its kind, subclass and message, and with the declaration it sits in (the nearest line
above it at column 0 that opens a declaration, in the after tree) and whether that declaration, mapped back, held any
error before: UNMASKED when it did (an error the checker had not reached behind the declaration's earlier errors, or a
message that moved within it), CAUSED when it held none. The classification is mechanical; the report reads each."""
import collections, re, subprocess, sys

base, fa, fb = sys.argv[1:4]
PATHS = {"FortressLibrary.fss": "Library/FortressLibrary.fss", "FortressLibrary.fsi": "Library/FortressLibrary.fsi",
         "RangeInternals.fss": "Library/RangeInternals.fss", "RangeInternals.fsi": "Library/RangeInternals.fsi",
         "Random.fss": "Library/Random.fss", "Random.fsi": "Library/Random.fsi",
         "FortressBuiltin.fss": "ProjectFortress/LibraryBuiltin/FortressBuiltin.fss",
         "FortressBuiltin.fsi": "ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi",
         "NativeArray.fss": "ProjectFortress/LibraryBuiltin/NativeArray.fss",
         "List.fss": "Library/List.fss", "String.fss": "Library/String.fss", "FlatString.fss": "Library/FlatString.fss",
         "Stream.fss": "Library/Stream.fss", "Writer.fss": "Library/Writer.fss", "TypeProxy.fss": "Library/TypeProxy.fss",
         "NatReflect.fss": "ProjectFortress/LibraryBuiltin/NatReflect.fss", "AnyType.fss": "ProjectFortress/LibraryBuiltin/AnyType.fss"}

def hunks(path):
    d = subprocess.run(["git", "diff", "-U0", base, "--", path], capture_output=True, text=True).stdout
    out = []
    for l in d.splitlines():
        m = re.match(r"^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@", l)
        if m:
            a, b, c, e = int(m.group(1)), int(m.group(2) or 1), int(m.group(3)), int(m.group(4) or 1)
            out.append((a, b, c, e))
    return out
HUNKS = {f: hunks(p) for f, p in PATHS.items()}

def back(f, n):
    """after line n of file f -> (lo, hi) base line range"""
    off = 0
    for a, b, c, e in HUNKS.get(f, []):
        if e and c <= n < c + e:
            return (a, a + max(b, 1) - 1) if b else (a, a)
        if n >= c + e:
            off += e - b
    return (n - off, n - off)

def load(p):
    rows = []
    for l in open(p, encoding="utf-8"):
        if l.startswith("#"): continue
        r = l.rstrip("\n").split("\t")
        if len(r) < 7: continue
        rows.append(r)
    return rows

def locs(r):
    """a row's locations: [(file, line)], one for a body error, two for an overloading or return-type pair"""
    out = []
    for part in r[5].split(","):
        m = re.match(r"^(\S+\.fs[si]):(\d+)", part.strip())
        out.append((m.group(1), int(m.group(2))) if m else (part.strip(), 0))
    return out

A, B = load(fa), load(fb)

def match(after_locs, before_locs):
    """every after location maps into the range of a distinct before location of the same file"""
    if len(after_locs) != len(before_locs): return False
    used = set()
    for f, n in after_locs:
        lo, hi = back(f, n)
        k = next((i for i, (g, m) in enumerate(before_locs) if i not in used and g == f and lo <= m <= hi), None)
        if k is None: return False
        used.add(k)
    return True

def decl_of(f, n):
    """the after tree's declaration line above line n (column 0, not end/comment)"""
    p = PATHS.get(f)
    if not p: return (f, 0, "?")
    lines = open(p, encoding="utf-8").read().split("\n")
    for k in range(min(n, len(lines)) - 1, -1, -1):
        s = lines[k]
        if s and not s[0].isspace() and not s.startswith(("end", "(*", "*)")) and re.match(r"^[A-Za-z_(]", s):
            return (f, k + 1, s.strip()[:90])
    return (f, 0, "?")

def decl_end(f, start):
    p = PATHS.get(f); lines = open(p, encoding="utf-8").read().split("\n")
    for k in range(start, len(lines)):
        s = lines[k]
        if s and not s[0].isspace() and re.match(r"^[A-Za-z_(]", s) and not s.startswith("end"):
            return k
    return len(lines)

def norm(m):
    m = re.sub(r"@ \S+", "", m)
    for _ in range(3): m = re.sub(r"\[\\[^\[\]]*?\\\]", "", m)
    m = re.sub(r"\b[IJK]\b", "ZZ32", m)
    m = re.sub(r"\S+\.fs[si]:\d+(:\d+)?(-\d+(:\d+)?)?", "", m)
    return re.sub(r"\s+", " ", m).strip()

BL = [(locs(r), r) for r in A]
matched_before = set()
kept, new, moved = 0, [], []
for r in B:
    L = locs(r)
    hit = [i for i, (bl, br) in enumerate(BL) if match(L, bl)]
    if not hit:
        files = sorted(f for f, n in L)
        hit = [i for i, (bl, br) in enumerate(BL) if i not in matched_before and sorted(f for f, n in bl) == files
               and norm(br[6]) == norm(r[6]) and br[0] == r[0]]
        if hit: hit = hit[:1]; moved.append(r)
    if hit:
        kept += 1
        matched_before.update(hit)
    else:
        new.append((L, r))
gone = [BL[i][1] for i in range(len(BL)) if i not in matched_before]
print("# before %d, after %d; kept %d after-sites at a site with an error before (%d of them matched by message, the line map missing them), new %d, gone %d before-sites"
      % (len(A), len(B), kept, len(moved), len(new), len(gone)))
print("\n## NEW sites")
for L, r in sorted(new, key=lambda x: x[0]):
    verdicts, where = [], []
    for f, n in L:
        df, dn, dtext = decl_of(f, n)
        had = []
        if dn:
            de = decl_end(f, dn)
            blo, _ = back(f, dn); _, bhi = back(f, max(de, dn))
            had = [1 for (bl, br) in BL for (g, m) in bl if g == f and blo <= m <= bhi]
        verdicts.append(bool(had)); where.append("%s:%d [%s]" % (f, dn, dtext))
    v = "UNMASKED" if all(verdicts) else ("PARTLY  " if any(verdicts) else "CAUSED  ")
    print("%s  %s  %s/%s" % (v, ",".join("%s:%d(base %d-%d)" % ((f, n) + back(f, n)) for f, n in L), r[0], r[2]))
    print("      in " + " ; ".join(where))
    print("      " + r[6][:300])
print("\n## KEPT by message (the line map missed the site)")
for r in moved: print("  %s  %s/%s\n      %s" % (r[5], r[0], r[2], r[6][:260]))
print("\n## GONE sites, by kind and subclass")
c = collections.Counter((r[0], r[2]) for r in gone)
for (k, s), v in sorted(c.items(), key=lambda kv: -kv[1]): print("  %4d  %s / %s" % (v, k, s))
