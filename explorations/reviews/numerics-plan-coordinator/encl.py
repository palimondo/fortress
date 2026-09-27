"""For each error of a classes-*.txt capture: the enclosing declarations of its (first) location,
and whether any of them has a static parameter bounded by a number trait."""
import sys, re, os, collections
ROOT = "/home/user/fortress"
def path(fn):
    for d in ("Library", "ProjectFortress/LibraryBuiltin"):
        p = os.path.join(ROOT, d, fn)
        if os.path.exists(p): return p
_cache = {}
def lines(fn):
    if fn in _cache: return _cache[fn]
    p = path(fn)
    if p is None: _cache[fn] = None; return None
    txt = open(p, encoding="utf-8").read()
    # blank out (* ... *) comments, nested, keeping newlines
    out = []; depth = 0; i = 0
    while i < len(txt):
        if depth == 0 and txt.startswith("(*)", i):
            e = txt.find("\n", i); e = len(txt) if e < 0 else e
            out.append(" " * (e - i)); i = e; continue
        if txt.startswith("(*", i): depth += 1; out.append("  "); i += 2; continue
        if depth and txt.startswith("*)", i): depth -= 1; out.append("  "); i += 2; continue
        ch = txt[i]
        out.append(ch if (depth == 0 or ch == "\n") else " "); i += 1
    ls = "".join(out).split("\n")
    raw = txt.split("\n")
    _cache[fn] = (ls, raw); return _cache[fn]
def indent(s): return len(s) - len(s.lstrip(" "))
def chain(fn, ln):
    x = lines(fn)
    if not x: return []
    ls, raw = x
    if ln < 1 or ln > len(ls): return []
    out = [ln]
    cur = indent(ls[ln-1]) if ls[ln-1].strip() else 10**6
    j = ln - 1
    while j >= 1 and cur > 0:
        s = ls[j-1]
        if s.strip() and indent(s) < cur:
            out.append(j); cur = indent(s)
        j -= 1
    return out
def sparams(s):
    """every [\\ ... \\] list's text at top nesting, from a header line"""
    res = []; i = 0
    while True:
        k = s.find("[\\", i)
        if k < 0: break
        depth = 0; j = k
        while j < len(s):
            if s.startswith("[\\", j): depth += 1; j += 2; continue
            if s.startswith("\\]", j):
                depth -= 1; j += 2
                if depth == 0: break
                continue
            j += 1
        res.append(s[k+2:j-2]); i = j
    return res
BOUNDS = [("integral", re.compile(r"\bextends\s+\{?\s*(Integral\[|AnyIntegral\b)")),
          ("Number", re.compile(r"\bextends\s+\{?\s*Number\b")),
          ("algebra", re.compile(r"\bextends\s+\{?\s*(AdditiveGroup|MultiplicativeRing|AdditiveMonoid|MultiplicativeMonoid|CommutativeRing|Ring|Field)\b"))]
DECL = re.compile(r"^\s*(?:(?:private|abstract|value|getter|setter|opr|coerce|widening|native|override)\s+)*(?:trait|object|opr|coerce|[A-Za-z_][\w']*\s*\[\\)")
def number_bound(fn, ln):
    x = lines(fn)
    if not x: return set(), []
    ls, raw = x
    found = set(); hdrs = []
    for j in chain(fn, ln):
        s = ls[j-1]
        # a header may continue on the next line(s) when its [\ \] list is open
        t = s
        k = j
        while t.count("[\\") > t.count("\\]") and k < len(ls) and k < j + 3:
            t += " " + ls[k]; k += 1
        for sp in sparams(t):
            # only the static-parameter list right after a declared name: heuristically any list
            # containing "extends" is a declaration's list (an instantiation never says extends)
            if "extends" in sp:
                for name, rx in BOUNDS:
                    if rx.search(sp): found.add(name)
        hdrs.append((j, raw[j-1].strip()[:120]))
    return found, hdrs
if __name__ == "__main__":
    fn, ln = sys.argv[1], int(sys.argv[2])
    f, h = number_bound(fn, ln)
    print(f)
    for x in h: print(x)
