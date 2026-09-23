#!/usr/bin/env python3
"""Summarise NestProbe counts.  usage: analyze.py <out-dir> <summary-prefix>
Reads <out-dir>/<test>.tsv (count, kind, category, target, leaf, site) written by one walk run
per test, and writes <prefix>-sites.tsv (one row per dependent call site, with the tests that
reach it), <prefix>-methods.tsv (inherited method bodies), <prefix>-tests.tsv (per test) and
prints the summary the note quotes.  Paths are made relative to the repository root."""
import collections, glob, os, re, sys

OUT, PREFIX = sys.argv[1], sys.argv[2]
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), *[".."] * 5)) + "/"
rows = []
for f in sorted(glob.glob(os.path.join(OUT, "*.tsv"))):
    test = os.path.basename(f)[:-4]
    for line in open(f, encoding="utf-8", errors="replace"):
        p = line.rstrip("\n").split("\t")
        if len(p) != 6: continue
        n, kind, cat, target, leaf, site = p
        site = site.replace(ROOT, "")
        m = re.match(r"^(.*?):(\d+):", site)
        fn, ln = (m.group(1), int(m.group(2))) if m else ("?", 0)
        rows.append((test, int(n), kind, cat, target, leaf, fn, ln))

def group(fn):
    if fn == "Library/FortressLibrary.fss": return "FortressLibrary.fss"
    if fn.startswith("Library/"): return "Library/other"
    if fn.endswith("FortressBuiltin.fss"): return "FortressBuiltin.fss"
    if fn.startswith("ProjectFortress/tests/"): return "tests"
    return fn if fn == "?" else "other"

# enclosing top-level declaration of a library line
def decl_index(path):
    idx = []
    try:
        for i, l in enumerate(open(ROOT + path, encoding="utf-8"), 1):
            m = re.match(r"^(?:value\s+)?(?:trait|object|opr|[a-zA-Z_][A-Za-z0-9_]*\s*[\[(:=]|opr\s)", l)
            if m and not l.startswith(("end", "(*", "import", "export", "component", "api")):
                idx.append((i, l.strip()[:60]))
    except OSError:
        pass
    return idx
DECLS = {}
def enclosing(fn, ln):
    if fn not in DECLS: DECLS[fn] = decl_index(fn)
    best = None
    for i, d in DECLS[fn]:
        if i <= ln: best = (i, d)
        else: break
    return best

# ---- what each leaf declares itself, flat: its trait, its objects, and the algebra traits it
# would extend at its own type under the sketch.  An inherited body whose name the leaf also
# declares ran because the OTHER argument was of a wider type (a mixed call); one whose name
# the leaf lacks is a method the flat library must restate.
def block(path, header):
    lines = open(ROOT + path, encoding="utf-8").read().split("\n")
    for i, l in enumerate(lines):
        if re.match(header, l):
            out = []
            for m in lines[i + 1:]:
                if re.match(r"^end\b", m): break
                out.append(m)
            return "\n".join(out)
    raise SystemExit("no block " + header)
def names(text):
    n = set()
    for m in re.finditer(r"opr\s+([^\s(]+?)\s*\((self)?\s*(\)|,)?", text):
        op, selfp, close = m.group(1), m.group(2), m.group(3)
        if selfp and close == ")": op = "prefix " + op if op in "-+" else op
        n.add({"=/=": "NE"}.get(op, op))
    for m in re.finditer(r"opr\s+\|self\|", text): n.add("|self|")
    for m in re.finditer(r"opr\s+\|\\self/\|", text): n.add("|\\_/|")
    for m in re.finditer(r"opr\s+\|/self\\\|", text): n.add("|/_\\|")
    for m in re.finditer(r"^\s+(?:getter\s+|abstract\s+)?([A-Za-z_]\w*)\s*[\[(]", text, re.M): n.add(m.group(1))
    return n
FL, FB = "Library/FortressLibrary.fss", "ProjectFortress/LibraryBuiltin/FortressBuiltin.fss"
def concrete(text):
    """Only the declarations with a body: an abstract one in an algebra trait implements nothing."""
    keep, lines = [], text.split("\n")
    for i, l in enumerate(lines):
        nxt = lines[i + 1] if i + 1 < len(lines) else ""
        if re.search(r"\)\s*(:\s*[^=]+)?=\s*", l) or re.search(r"^\s+(builtinPrimitive|if|do|self|other|NOT|\()", nxt):
            keep.append(l)
    return "\n".join(keep)
ALG = {k: names(concrete(block(FL, r"^trait %s\[" % k))) for k in
       ("Equality", "StandardPartialOrder", "StandardMin", "StandardMax", "StandardMinMax",
        "StandardTotalOrder", "Integral", "AdditiveGroup", "MultiplicativeRing")}
INTALG = set().union(*(ALG[k] for k in ("Equality", "StandardPartialOrder", "StandardMin", "StandardMax",
                                        "StandardMinMax", "StandardTotalOrder", "Integral", "AdditiveGroup")))
FLOATALG = set().union(*(ALG[k] for k in ("Equality", "StandardPartialOrder", "StandardMin", "StandardMax",
                                          "StandardMinMax", "AdditiveGroup", "MultiplicativeRing")))
DECL = {
  "ZZ32": names(block(FL, r"^trait ZZ32 ")) | names(block(FB, r"^value object Int ")) | INTALG,
  "ZZ64": names(block(FL, r"^trait ZZ64 ")) | names(block(FB, r"^value object Long ")) | INTALG,
  "ZZ":   names(block(FL, r"^trait ZZ ")) | names(block(FB, r"^value object BigNum ")) | INTALG,
  "NN64": names(block(FL, r"^trait NN64 ")) | names(block(FB, r"^value object UnsignedLong ")) | INTALG,
  "NN32": names(block(FB, r"^value object NN32 ")) | INTALG,
  "QQ":   names(block(FL, r"^trait QQ ")) | names(block(FL, r"^object Ratio")) | FLOATALG,
  "RR64": names(block(FL, r"^trait RR64 ")) | names(block(FB, r"^value object Float ")) | FLOATALG,
  "RR32": names(block(FB, r"^value object RR32 ")) | FLOATALG,
}
ALIAS = {"\u2223": "DIVIDES", "|_|": "|self|", "BY": "TIMES"}
def mclass(target, leaf):
    name = target.split(".", 1)[1].replace("rm$0$", "") if "." in target else target
    name = ALIAS.get(name, name)
    # Number's bodies for an integer: the flat Number has none, and the sketch puts the float
    # functions (log, SQRT, atan, ...) and the mixed arithmetic on RR64, reached by coercion;
    # so an integer that runs one is a conversion site, not a method to restate
    if target.startswith("Number.") and leaf not in ("RR64", "RR32"): return "mixed"
    return "mixed" if name in DECL.get(leaf, set()) else "missing"

sites = collections.defaultdict(lambda: {"cats": collections.Counter(), "tests": set(), "detail": collections.Counter()})
methods = collections.defaultdict(lambda: {"sites": set(), "tests": set(), "calls": 0})
pertest = collections.defaultdict(lambda: {"own": set(), "lib": set(), "calls": 0})
for test, n, kind, cat, target, leaf, fn, ln in rows:
    key = (fn, ln)
    s = sites[key]
    s["cats"][cat] += n
    s["tests"].add(test)
    s["detail"][f"{kind}:{target}<-{leaf}"] += n
    s.setdefault("missing_def", set()); s.setdefault("unexplained", [])
    if kind == "method":
        if mclass(target, leaf) == "missing": s["missing_def"].add(target.split(".", 1)[0])
        else: s["unexplained"].append("mixed:" + target)
    else:
        s["unexplained"].append("check:" + target)
    if kind == "method":
        s["cats"][cat + "-" + mclass(target, leaf)] += 0
        m = methods[(target, leaf)]
        m["sites"].add(key); m["tests"].add(test); m["calls"] += n
    t = pertest[test]
    t["calls"] += n
    if fn.endswith("/" + test + ".fss"): t["own"].add(key)
    else: t["lib"].add(key)

# a site needs a conversion (or a coercion) when some check there is a tower/alg record or a mixed call
def needs_conv(s):
    # a parameter or binding check whose declared type is the definer of a missing method at the
    # same site goes away when that method is restated on the leaf with the leaf's own types
    return any(not (u.startswith("check:") and u[6:].split("[")[0] in s["missing_def"]) for u in s["unexplained"])
def only_missing(s): return not needs_conv(s)

with open(PREFIX + "-sites.tsv", "w") as w:
    w.write("#file\tline\tgroup\tcategories\ttests\tenclosing declaration\tdetail\n")
    for (fn, ln), s in sorted(sites.items()):
        enc = enclosing(fn, ln) if group(fn) != "tests" and fn != "?" else None
        s["cats"]["conversion" if needs_conv(s) else "restate-only"] += 0
        w.write(f"{fn}\t{ln}\t{group(fn)}\t{','.join(sorted(s['cats']))}\t{len(s['tests'])}\t"
                f"{(str(enc[0]) + ' ' + enc[1]) if enc else ''}\t"
                f"{'; '.join(f'{k} x{v}' for k, v in s['detail'].most_common(3)).replace('rm$0$', '')[:200]}\n")
with open(PREFIX + "-methods.tsv", "w") as w:
    w.write("#definer.method\tleaf\tmixed call or missing method\tcall sites\ttests\tcalls\n")
    for (target, leaf), m in sorted(methods.items(), key=lambda kv: -len(kv[1]["tests"])):
        w.write(f"{target.replace('rm$0$', '')}\t{leaf}\t{mclass(target, leaf)}\t{len(m['sites'])}\t{len(m['tests'])}\t{m['calls']}\n")
tests_all = sorted(os.path.basename(f)[:-4] for f in glob.glob(os.path.join(OUT, "*.tsv")))
with open(PREFIX + "-tests.tsv", "w") as w:
    w.write("#test\tdependent sites in the test\tdependent sites elsewhere\tdependent checks\n")
    for t in tests_all:
        p = pertest.get(t)
        w.write(f"{t}\t{len(p['own']) if p else 0}\t{len(p['lib']) if p else 0}\t{p['calls'] if p else 0}\n")

# ---- summary
print(f"tests run: {len(tests_all)}; records: {len(rows)}; distinct dependent sites: {len(sites)}")
by_group = collections.Counter(group(fn) for (fn, ln) in sites)
print("sites by file group:", dict(by_group))
bycat = collections.Counter()
for (fn, ln), s in sites.items():
    for c in s["cats"]: bycat[(group(fn), c)] += 1
print("sites by group and category:")
for (g, c), k in sorted(bycat.items()): print(f"  {g:22s} {c:8s} {k}")
lib_files = collections.Counter(fn for (fn, ln) in sites if group(fn) in ("Library/other",))
print("Library/other by file:", dict(lib_files))
fl = sorted(ln for (fn, ln) in sites if fn == "Library/FortressLibrary.fss")
ranges, start, prev = [], None, None
for ln in fl:
    if start is None: start = prev = ln
    elif ln - prev <= 3: prev = ln
    else: ranges.append((start, prev)); start = prev = ln
if start is not None: ranges.append((start, prev))
print("FortressLibrary.fss line ranges:", ", ".join(f"{a}" if a == b else f"{a}-{b}" for a, b in ranges))
fb = sorted(ln for (fn, ln) in sites if group(fn) == "FortressBuiltin.fss")
print("FortressBuiltin.fss lines:", fb)
own = [t for t in tests_all if pertest.get(t) and pertest[t]["own"]]
anyd = [t for t in tests_all if pertest.get(t) and (pertest[t]["own"] or pertest[t]["lib"])]
print(f"tests with a dependent site in their own text: {len(own)}; tests whose run passes any dependent check: {len(anyd)} of {len(tests_all)}")
mc = collections.Counter(mclass(t, l) for (t, l) in methods)
print(f"inherited method bodies (definer.method, leaf): {len(methods)}: {dict(mc)}")
print("  missing (to restate on the leaf):", sorted(f"{t.replace('rm$0$', '')}<-{l}" for (t, l) in methods if mclass(t, l) == "missing"))
for g in ("FortressLibrary.fss", "Library/other", "FortressBuiltin.fss", "tests", "?", "other"):
    ks = [k for k in sites if group(k[0]) == g]
    if ks: print(f"  {g:22s} sites {len(ks):4d}; needing a conversion at the site {sum(needs_conv(sites[k]) for k in ks):4d}; "
                 f"only a missing leaf method {sum(only_missing(sites[k]) for k in ks):4d}")
def reason(s):
    """Why a site needs a conversion, in priority order."""
    u = [x for x in s["unexplained"] if not (x.startswith("check:") and x[6:].split("[")[0] in s["missing_def"])]
    if any(x.startswith("check:") for x in u): return "a declared type above the value's leaf"
    if any(x.startswith("mixed:") and not x.startswith("mixed:Number.") for x in u): return "a mixed call answered by a wider leaf's method"
    if all(d.endswith("<-RR64") or d.endswith("<-RR32") for d in s["detail"] if d.startswith("method:Number.")):
        return "a Number catch-all body on floats only (Float with FloatLiteral, or a float with an integer)"
    return "a Number catch-all body with an integer (mixed arithmetic, or a float function of an integer)"
print("  why the conversion sites need one:")
for g in ("FortressLibrary.fss", "Library/other", "tests"):
    c = collections.Counter(reason(sites[k]) for k in sites if group(k[0]) == g and needs_conv(sites[k]))
    print(f"    {g:22s}", dict(c))
conv_tests = [t for t in tests_all if pertest.get(t) and any(needs_conv(sites[k]) for k in pertest[t]["own"])]
print(f"tests with a site in their own text that needs a conversion: {len(conv_tests)}")
def certain(s): return needs_conv(s) and not reason(s).startswith("a Number catch-all body on floats only")
for g in ("FortressLibrary.fss", "Library/other", "tests"):
    ks = [k for k in sites if group(k[0]) == g]
    print(f"  {g:22s} certain conversion sites {sum(certain(sites[k]) for k in ks):4d}; float-only catch-all sites "
          f"{sum(needs_conv(sites[k]) and not certain(sites[k]) for k in ks):4d}")
ct = [t for t in tests_all if pertest.get(t) and any(certain(sites[k]) for k in pertest[t]["own"])]
print(f"tests with a certain conversion site in their own text: {len(ct)}: {' '.join(ct)}")
ONE = ("Library/FortressLibrary.fss", 4121)
beyond = [t for t in tests_all if pertest.get(t) and (pertest[t]["own"] | pertest[t]["lib"]) - {ONE}]
reach_cert = [t for t in tests_all if pertest.get(t) and any(certain(sites[k]) for k in (pertest[t]["own"] | pertest[t]["lib"]) - {ONE})]
print(f"tests reaching FortressLibrary.fss:4121 (a library-load binding): {sum(1 for t in tests_all if pertest.get(t) and ONE in pertest[t]['lib'])}; "
      f"tests reaching any other dependent site: {len(beyond)}; any other certain conversion site: {len(reach_cert)}")
