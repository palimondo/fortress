import sys, collections, re
sys.path.insert(0, "/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/coordinator-plan")
from encl import number_bound, chain, lines
NUMTYPES = {"ZZ32","ZZ64","NN32","NN64","ZZ","QQ","RR64","RR32","IntLiteral","FloatLiteral","Float","Int","Long","BigNum","UnsignedInt","UnsignedLong","Ratio","Number","AnyIntegral"}
def rows(p):
    for l in open(p, encoding="utf-8"):
        q = l.rstrip("\n").split("\t")
        if len(q) >= 4: yield q
def enclosing_type(fn, ln):
    x = lines(fn)
    if not x: return None
    ls = x[1]
    for j in chain(fn, ln):
        m = re.match(r"\s*(?:value\s+)?(?:object|trait)\s+(\w+)", ls[j-1])
        if m: return m.group(1)
    return None
def tag(loc):
    b = set(); nt = False
    for x in loc.split(","):
        if ":" not in x: continue
        fn, ln = x.split(":")[0], int(x.split(":")[1])
        f, _ = number_bound(fn, ln); b |= f
        if enclosing_type(fn, ln) in NUMTYPES: nt = True
    if "integral" in b: return "generic, Integral/AnyIntegral bound"
    if "Number" in b: return "generic, Number bound"
    if "algebra" in b: return "generic, AdditiveGroup/MultiplicativeRing bound"
    if nt: return "in a number type's own declaration"
    return "other"
def unit(loc):
    fs = sorted(set(x.split(":")[0] for x in loc.split(",")))
    f = fs[0]
    if f == "?": return "?"
    for k in ("RangeInternals", "FortressLibrary", "NativeArray", "FortressBuiltin"):
        if all(g.startswith(k) for g in fs): return k + (" api" if all(g.endswith(".fsi") for g in fs) else (" component" if all(g.endswith(".fss") for g in fs) else " api+component"))
    return "other apis/components (" + "+".join(fs) + ")" if len(fs) > 1 else "other: " + f
for p in sys.argv[1:]:
    T = collections.defaultdict(collections.Counter)
    for q in rows(p):
        T[unit(q[2])][tag(q[2])] += 1
    print("##", p)
    order = ["generic, Integral/AnyIntegral bound", "generic, Number bound", "generic, AdditiveGroup/MultiplicativeRing bound", "in a number type's own declaration", "other"]
    for u in sorted(T, key=lambda u: -sum(T[u].values())):
        print("  %-60s %5d  %s" % (u, sum(T[u].values()), "; ".join("%s %d" % (k, T[u][k]) for k in order if T[u][k])))
