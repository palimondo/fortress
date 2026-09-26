#!/usr/bin/env python3
"""errors.py <tsv-out> <run.out>... : every distinct error the checker printed in a set of
runs, one row each, classified by kind.

Reads the `@@SC ERR` lines of add-patch.py (one per error per stage per compilation unit)
and the crash lines (`@@SC CRASH`, and `@@TC DECL-CRASH` of desugar-codegen's per-declaration
check).  An error is identified by its location and its message with paths cut to the file
name; the same error printed by two units, by both well-formedness passes, or by two runs
(each run re-checks the twelve prelude apis) is counted once, as the gate's own total
counts a set.  Writes one row per distinct error to <tsv-out>:
    kind <tab> family <tab> unit(s) <tab> stage <tab> location <tab> message
and prints the tallies.

Kinds:
  exclusion     "X excludes Y but it extends Y", "Types X and Y exclude each other"
  comprises     "Invalid comprises clause"
  overloading   "Invalid overloading of F", "multiple declarations of F with the same
                parameter type"; family F
  return-type   "For F, the return type of ... should be a subtype of ..."; family F
  bound-Object  "... does not satisfy the corresponding bound Object"
  abstract-method  "The inherited abstract method F ... has no concrete implementation"
  typecheck     any other error the component's declarations produced, by message shape
  wellformed    any other error of the two well-formedness passes ("Ill-formed type ...")
  export        the export checker: a component that does not match its api
  other/<stage> anything else"""
import collections, re, sys

LOC = re.compile(r"(/\S+?/)?([\w.]+\.fs[si]):(\d+):\d+(?:-\d+)?(?::\d+)?")
PREFIX = re.compile(r"^((?:\S+?\.fs[si]:\d+:\d+(?:-\d+)?(?::\d+)?:\s*)+)(.*)$")

def norm(s):
    s = re.sub(r"/\S*?/([\w.]+\.fs[si])", r"\1", s)
    s = re.sub(r"\$\d+", "", s)                      # fresh inference-variable numbers
    return re.sub(r"\s+", " ", s).strip()

def shape(msg):
    """a message with its names and types cut out, for grouping the rest"""
    m = re.sub(r"\[\\.*\\\]", "[\\..\\]", msg)
    m = re.sub(r"\b[\w.]+\.fs[si]:\d+(:\d+(-\d+)?)?", "L", m)
    m = re.sub(r"`[^`]*`|'[^']*'|\"[^\"]*\"", "Q", m)
    return m[:110]

def sparams(sig):
    """the static parameters of a signature `[\\...\\](...)->...`, names replaced by position
    (triage/classify.py's test), or None when it has none"""
    sig = sig.strip()
    if not sig.startswith("[\\"): return None
    i, depth, body = 2, 1, ""
    while depth and i < len(sig):
        if sig.startswith("[\\", i): depth += 1; body += "[\\"; i += 2; continue
        if sig.startswith("\\]", i):
            depth -= 1
            if depth: body += "\\]"
            i += 2; continue
        body += sig[i]; i += 1
    ps, depth, cur = [], 0, ""
    for ch in body:
        if ch == "," and depth == 0: ps.append(cur.strip()); cur = ""; continue
        depth += ch == "["; depth -= ch == "]"; cur += ch
    ps.append(cur.strip())
    names = [p.split(" extends ")[0].replace("nat ", "").replace("int ", "").strip() for p in ps]
    out = []
    for p in ps:
        b = p.split(" extends ")[1] if " extends " in p else ""
        for j, n in enumerate(names): b = re.sub(r"\b%s\b" % re.escape(n), "#%d" % j, b)
        out.append(("nat" if p.startswith("nat ") else "type", b))
    return out

def params(sig):
    """the parameter list of a signature, the text inside its first top-level parentheses"""
    s = sig.strip()
    if s.startswith("[\\"):
        d, i = 1, 2
        while d and i < len(s):
            if s.startswith("[\\", i): d += 1; i += 2; continue
            if s.startswith("\\]", i): d -= 1; i += 2; continue
            i += 1
        s = s[i:]
    if not s.startswith("("): return s.split("->")[0]
    d = 0
    for i, ch in enumerate(s):
        d += ch == "("; d -= ch == ")"
        if d == 0: return s[1:i]
    return s

def overload_sub(name, msg):
    """fill-crossed: a function-taking fill against a value-taking one (triage's e1);
    fill-same: two of one kind, from the two sides of the array traits' diamond;
    sentence: the two declarations' static parameters differ, the case of
    Specification/basic/overloading.tex:100-107 (triage's b);
    same-sparams: neither -- no Subtype Rule, no exclusion, no declaration on the meet"""
    r = re.search(r"Invalid overloading of \S+ in (.*?): (.*?) and (.*)$", msg)
    if not r: return "same parameter type" if "same parameter type" in msg else "?"
    a, b = r.group(2), r.group(3)
    if name == "fill":
        fa, fb = "->" in params(a), "->" in params(b)
        return "fill-crossed" if fa != fb else "fill-same"
    sa, sb = sparams(a), sparams(b)
    if (sa is None) != (sb is None) or (sa is not None and sa != sb): return "sentence"
    return "same-sparams"

def classify(stage, msg):
    if re.search(r"excludes .* but it extends", msg) or re.search(r"exclude each other", msg):
        return "exclusion", "-"
    if "comprises" in msg and ("Invalid comprises" in msg or "comprises clause" in msg):
        return "comprises", "-"
    r = re.search(r"Invalid overloading of (\S+) in", msg)
    if r: return "overloading", r.group(1)
    r = re.search(r"multiple declarations of (\S+) with the same parameter type", msg)
    if r: return "overloading", r.group(1) + " (same parameter type)"
    r = re.search(r"For (\S+), the return type of", msg)
    if r: return "return-type", r.group(1)
    if "corresponding bound Object" in msg or re.search(r"bound Object\b", msg):
        return "bound-Object", "-"
    r = re.search(r"inherited abstract method (?:abstract getter )?(\S+?)[(:\[].*has no concrete implementation", msg)
    if r: return "abstract-method", r.group(1)
    if stage == "typecheck": return "typecheck", shape(msg)
    if stage.startswith("wellformed"): return "wellformed", shape(msg)
    if stage == "export": return "export", shape(msg)
    return "other/" + stage, shape(msg)

out_path, runs = sys.argv[1], sys.argv[2:]
seen = collections.OrderedDict()
crashes = collections.OrderedDict()
stage_raw = collections.Counter()
for path in runs:
    for raw in open(path, encoding="utf-8", errors="replace"):
        f = raw.rstrip("\n").split("\t")
        if f[0] == "@@SC ERR" and len(f) >= 4:
            unit, stage, text = f[1], f[2], "\t".join(f[3:])
            stage_raw[(unit, stage)] += 1
            m = PREFIX.match(text.strip())
            locs, msg = (m.group(1), m.group(2)) if m else ("", text)
            loc = ",".join(sorted(set("%s:%s" % (g[1], g[2]) for g in LOC.findall(locs)))) or "?"
            msg = norm(msg)
            key = (loc, msg)
            if key not in seen: seen[key] = [set(), set()]
            seen[key][0].add(unit); seen[key][1].add(stage)
        elif f[0] == "@@SC CRASH":
            k = (f[1], f[2], f[3], f[4] if len(f) > 4 else "")
            crashes[("stage",) + k] = crashes.get(("stage",) + k, 0) + 1
        elif f[0] == "@@TC DECL-CRASH":
            k = (norm(f[2]), f[3], f[4] if len(f) > 4 else "")
            crashes[("decl",) + k] = crashes.get(("decl",) + k, 0) + 1

rows = []
for (loc, msg), (units, stages) in seen.items():
    st = sorted(stages)[0] if len(stages) == 1 else "+".join(sorted(stages))
    kind, fam = classify(sorted(stages)[-1], msg)
    sub = overload_sub(fam.split(" ")[0], msg) if kind == "overloading" else "-"
    rows.append((kind, fam, sub, "+".join(sorted(units)), st, loc, msg))
rows.sort()
with open(out_path, "w", encoding="utf-8") as o:
    o.write("# kind\tfamily\tsubclass\tunit(s)\tstage(s)\tlocation\tmessage\n")
    for r in rows: o.write("\t".join(r) + "\n")
rows = [(r[0], r[1], r[3], r[4], r[5], r[6], r[2]) for r in rows]   # subclass last, below

print("# %d distinct errors from %d runs; %d raw error lines" % (len(rows), len(runs), sum(stage_raw.values())))
kinds = collections.Counter(r[0] for r in rows)
print("\n## by kind")
for k, n in kinds.most_common(): print("%6d  %s" % (n, k))
print("\n## overloading and return-type errors by family")
fam = collections.Counter((r[0], r[1]) for r in rows if r[0] in ("overloading", "return-type"))
for (k, f), n in sorted(fam.items(), key=lambda kv: (kv[0][0], -kv[1], kv[0][1])): print("%6d  %-12s %s" % (n, k, f))
print("\n## overloading errors by subclass (overload_sub)")
sc = collections.Counter(r[6] for r in rows if r[0] == "overloading")
for k, n in sc.most_common(): print("%6d  %s" % (n, k))
print("\n## overloading errors by family and subclass")
fs = collections.Counter((r[1], r[6]) for r in rows if r[0] == "overloading")
for (f, s), n in sorted(fs.items(), key=lambda kv: (-kv[1], kv[0])): print("%6d  %-40s %s" % (n, f, s))
print("\n## the rest by message shape")
rest = collections.Counter((r[0], r[1]) for r in rows if r[0] not in ("overloading", "return-type", "exclusion", "comprises", "bound-Object", "abstract-method"))
for (k, f), n in rest.most_common(): print("%6d  %-14s %s" % (n, k, f))
print("\n## distinct errors by unit and stage (an error printed by several units is under each)")
us = collections.Counter()
for r in rows:
    for u in r[2].split("+"): us[(u, r[3])] += 1
for (u, s), n in sorted(us.items()): print("%6d  %-32s %s" % (n, u, s))
KS = ["exclusion", "comprises", "overloading", "return-type", "abstract-method", "bound-Object",
      "wellformed", "typecheck", "export", "other"]
def big(k):
    return k if k in KS else "other"
print("\n## distinct errors, kind by unit (an error printed by several units is under the first)")
mat = collections.defaultdict(collections.Counter)
for r in rows: mat[r[2].split("+")[0]][big(r[0])] += 1
print("%-26s %s %6s" % ("unit", " ".join("%6s" % k[:6] for k in KS), "total"))
for u in sorted(mat):
    print("%-26s %s %6d" % (u, " ".join("%6d" % mat[u][k] for k in KS), sum(mat[u].values())))
tot = collections.Counter()
for u in mat: tot.update(mat[u])
print("%-26s %s %6d" % ("all", " ".join("%6d" % tot[k] for k in KS), sum(tot.values())))
print("\n## crashes (stage crashes caught by add-patch.py; declarations the checker crashed on)")
for k, n in crashes.items(): print("%6d  %s" % (n, "\t".join(k)[:300]))
