#!/usr/bin/env python3
"""z32.py <copy-dir> : scalar ranges over ZZ32 only, on a library copy (measure-C, tree 2).
A measurement shadow, not a proposed edit.  Applied after tree 1 (BP+FAILB+R421+BOUNDS+DEVICE),
so every integer bound it meets reads `X extends Integral[\\X\\]` (BOUNDS respelled the
AnyIntegral ones); it also accepts AnyIntegral.

What it changes:
  1. In RangeInternals.fsi/.fss (whole files) and in FortressLibrary.fsi/.fss's range-operator
     block (from "The # and : operators serve as factories" up to the generic
     `opr :[\\I\\](r: Range[\\I\\], stride:I)`), every static parameter whose bound is
     `Integral[\\X\\]` or `AnyIntegral` is removed from its declaration, and the parameter's name
     is replaced by ZZ32 throughout that declaration (header, body, comments and strings alike,
     up to the next declaration at column 0).  A 2-D or 3-D range keeps its shape: its
     parameters I, J, K all become ZZ32, so Range2D extends Range[\\(ZZ32,ZZ32)\\].
  2. Every written static argument list of a RangeInternals declaration so changed, anywhere in
     the copy, loses the arguments at the removed positions (the whole list when nothing is
     left): CompactFullParScalarRange[\\I\\] -> CompactFullParScalarRange,
     ActualRange2D[\\I,J,T,S1,S2\\] -> ActualRange2D[\\T,S1,S2\\], sized1Range[\\ZZ32\\](0,b0,s0)
     -> sized1Range(0,b0,s0), and Random's FullScalarRange[\\ZZ32\\] -> FullScalarRange.
  3. The three unbounded range operators of FortressLibrary whose I is the element of a
     range built from a point, `opr (x:I):[\\I\\]`, `opr (l:I)::[\\I\\]` and
     `opr ::[\\I\\](l:I,s:I)` (api and component), each become three overloads: ZZ32,
     (ZZ32,ZZ32) and (ZZ32,ZZ32,ZZ32), the shapes `#` and `:` already have.

What stays generic, and why:
  - FortressLibrary's public range traits (Range, PartialRange, OpenRange, RangeWithExtent,
    ExtentRange, BoundedRange, RangeWithLeft, LeftRange, RangeWithRight, RightRange,
    FullRange, CompactFullRange, StridedFullRange): their parameter is an index type, ZZ32 or a
    tuple of ZZ32s; the arrays' Indexed[\\E,I\\] and every 2-D and 3-D range instantiate them at
    tuples.
  - The functions whose parameter is such an index type: FortressLibrary's openRange[\\I\\](),
    opr :[\\I\\](r: Range[\\I\\], stride:I), opr #[\\I\\](r: PartialRange[\\I\\], size:I), and
    RangeInternals' checkSelection[\\R extends Range[\\I\\], I\\] (called from the public traits
    with their own I).
  - RangeInternals' tupleFlatten[\\I, J, K\\]: a tuple utility with no bound, not a range.
Prints what it changed and every I, J or K left in the edited regions, by declaration."""
import io, os, re, sys, collections

d = sys.argv[1]
def rd(n): return io.open(os.path.join(d, n), encoding="utf-8").read()
def wr(n, s): io.open(os.path.join(d, n), "w", encoding="utf-8").write(s)

def close_of(s, i):
    """s[i:i+2] is '[\\'; the index just after its matching '\\]'"""
    assert s.startswith("[\\", i), s[i:i + 20]
    depth, j = 0, i
    while j < len(s):
        if s.startswith("[\\", j): depth += 1; j += 2; continue
        if s.startswith("\\]", j):
            depth -= 1; j += 2
            if depth == 0: return j
            continue
        j += 1
    raise AssertionError("unclosed [\\ at %d" % i)

def split_top(s):
    parts, depth, cur, j = [], 0, 0, 0
    while j < len(s):
        if s.startswith("[\\", j): depth += 1; j += 2; continue
        if s.startswith("\\]", j): depth -= 1; j += 2; continue
        c = s[j]
        if c in "({": depth += 1
        elif c in ")}": depth -= 1
        elif c == "," and depth == 0: parts.append(s[cur:j]); cur = j + 1
        j += 1
    parts.append(s[cur:])
    return parts

# a declaration's header: a line at column 0 whose declared name is followed by a static list
HDR = re.compile(r"^(?:private\s+)?(?:value\s+)?(?:(?:trait|object)\s+(?P<tn>\w+)"
                 r"|opr\s+(?P<pre>\((?:[^()]|\([^()]*\))*\))\s*(?P<pop>[^\s\[(]+)"
                 r"|opr\s+(?P<on>[^\s\[(]+)|(?P<fn>[a-zA-Z_]\w*))\s*(?=\[\\)", re.M)

def is_integer_param(p):
    m = re.match(r"^\s*(\w+)\s+extends\s+(.*?)\s*$", p, re.S)
    if not m: return None
    name, bound = m.group(1), m.group(2)
    if re.match(r"^Integral\s*\[\\\s*%s\s*\\\]$" % name, bound) or bound == "AnyIntegral":
        return name
    return None

def headers(s, lo=0, hi=None):
    hi = len(s) if hi is None else hi
    out = []
    for m in HDR.finditer(s, lo, hi):
        name = m.group("tn") or m.group("fn") or ("opr " + (m.group("pop") or m.group("on")))
        ls = m.end()
        while s[ls] in " \t": ls += 1
        out.append((m.start(), name, ls, close_of(s, ls)))
    return out

FILES = ["RangeInternals.fsi", "RangeInternals.fss", "FortressLibrary.fsi", "FortressLibrary.fss"]
def region(n, s):
    """(lo, hi) character offsets of the edited region of file n"""
    if n.startswith("RangeInternals"): return 0, len(s)
    a = {"FortressLibrary.fsi": "(** The %#% and %:% operators serve as factories for parallel ranges. **)",
         "FortressLibrary.fss": "(** The # and : operators serve as factories for parallel ranges. **)"}[n]
    b = {"FortressLibrary.fsi": "opr :[\\I\\](r: Range[\\I\\], stride:I): Range[\\I\\]\n",
         "FortressLibrary.fss": "opr :[\\I\\](r: Range[\\I\\], stride:I): Range[\\I\\] = r.imposeStride(stride)"}[n]
    assert s.count(a) == 1 and s.count(b) == 1, n
    return s.index(a), s.index(b)

# ---- pass 0: the table of removed positions, from the RangeInternals declarations
table = collections.defaultdict(list)      # name -> [(arity, removed positions)]
for n in ("RangeInternals.fsi", "RangeInternals.fss"):
    s = rd(n)
    for st, name, ls, le in headers(s):
        ps = split_top(s[ls + 2:le - 2])
        rem = [i for i, p in enumerate(ps) if is_integer_param(p)]
        if name.startswith("opr "): continue
        table[name].append((len(ps), tuple(rem)))
dropped = {k: v for k, v in table.items() if any(r for _, r in v)}
full = {k for k, v in dropped.items() if all(len(r) == a for a, r in v)}
print("RangeInternals names losing static parameters: %d (%d lose all): %s"
      % (len(dropped), len(full), ", ".join(sorted(dropped))))
print("RangeInternals names keeping theirs: %s" % ", ".join(sorted(k for k in table if k not in dropped)))

NAMEPAT = re.compile(r"\b(%s)\s*(?=\[\\)" % "|".join(sorted(dropped, key=len, reverse=True)))

def rewrite_refs(s, skip, counter):
    """drop the removed static arguments of every Name[\\...\\] with Name in `dropped`;
    the static lists starting at the offsets in `skip` (declaration headers) keep their
    parameters, but what they contain is rewritten"""
    out, j = [], 0
    while True:
        m = NAMEPAT.search(s, j)
        # also recurse into header lists that are not references
        nxt_skip = min([k for k in skip if k >= j] or [len(s)])
        if m is None and nxt_skip == len(s): out.append(s[j:]); break
        if m is None or nxt_skip < m.start():
            ls = nxt_skip; le = close_of(s, ls)
            out.append(s[j:ls]); out.append("[\\" + rewrite_refs(s[ls + 2:le - 2], set(), counter) + "\\]")
            j = le; continue
        ls = m.end()
        while s[ls] in " \t": ls += 1
        if ls in skip:
            le = close_of(s, ls)
            out.append(s[j:ls]); out.append("[\\" + rewrite_refs(s[ls + 2:le - 2], set(), counter) + "\\]")
            j = le; continue
        le = close_of(s, ls)
        args = split_top(rewrite_refs(s[ls + 2:le - 2], set(), counter))
        name = m.group(1)
        if name in full: rem = set(range(len(args)))
        else:
            cand = {r for a, r in dropped[name] if a == len(args)}
            assert len(cand) == 1, (name, len(args), dropped[name])
            rem = set(cand.pop())
        kept = [a.strip() for i, a in enumerate(args) if i not in rem]
        out.append(s[j:m.end(1)])
        out.append(("[\\" + ", ".join(kept) + "\\]") if kept else "")
        counter[name] += 1
        j = le
    return "".join(out)

# ---- pass 1: written static arguments, in every file of the copy
refs = collections.Counter()
for n in sorted(os.listdir(d)):
    if not n.endswith((".fsi", ".fss")) or n.startswith("Compiler"): continue
    s = rd(n)
    if not NAMEPAT.search(s): continue
    skip = {ls for _, name, ls, _ in headers(s)} if n in FILES else set()
    c = collections.Counter()
    s2 = rewrite_refs(s, skip, c)
    if s2 != s:
        wr(n, s2); refs.update(c)
        print("pass 1, %s: %d written static argument lists shortened" % (n, sum(c.values())))

# ---- pass 2: the declarations themselves
removed_total = collections.Counter()
for n in FILES:
    s = rd(n)
    lo, hi = region(n, s)
    hs = headers(s, lo, hi)
    edits = []            # (start, end, replacement), non-overlapping, applied from the end
    for k, (st, name, ls, le) in enumerate(hs):
        ps = split_top(s[ls + 2:le - 2])
        gone = [is_integer_param(p) for p in ps]
        names = [g for g in gone if g]
        if not names: continue
        # the declaration's scope: to the next line at column 0 that is not `end`
        m = re.compile(r"^(?!end\b)\S", re.M).search(s, s.index("\n", le) + 1 if "\n" in s[le:] else len(s))
        se = min(m.start() if m else len(s), hi)
        tv = re.compile(r"(?<![\w'])(%s)(?![\w'])" % "|".join(names))
        kept = [p.strip() for p, g in zip(ps, gone) if not g]
        rest = tv.sub("ZZ32", s[le:se])
        if not kept: rest = re.sub(r"^[ \t]*\n\s*(?=\()", "", rest)   # `name\n   (params)` -> `name(params)`
        new = (tv.sub("ZZ32", s[st:ls]) + (("[\\" + ", ".join(kept) + "\\]") if kept else "") + rest)
        edits.append((st, se, new))
        removed_total[n] += len(names)
    for st, se, new in sorted(edits, reverse=True):
        s = s[:st] + new + s[se:]
    wr(n, s)
    print("pass 2, %s: %d declarations, %d static parameters removed" % (n, len(edits), removed_total[n]))

# ---- 3: the unbounded point operators, split into the three shapes
T2, T3 = "(ZZ32,ZZ32)", "(ZZ32,ZZ32,ZZ32)"
def three(fmt): return "\n".join(fmt.format(T=t) for t in ("ZZ32", T2, T3))
SPLITS = {
    "FortressLibrary.fsi": [
        ("opr (x:I):[\\I\\] : LeftRange[\\I\\]\n", three("opr (x:{T}): : LeftRange[\\{T}\\]") + "\n"),
        ("opr (l:I)::[\\I\\] : LeftRange[\\I\\]\n", three("opr (l:{T}):: : LeftRange[\\{T}\\]") + "\n"),
        ("opr ::[\\I\\](l:I,s:I): LeftRange[\\I\\]\n", three("opr ::(l:{T},s:{T}): LeftRange[\\{T}\\]") + "\n")],
    "FortressLibrary.fss": [
        ("opr (x:I):[\\I\\] : LeftRange[\\I\\] = x#\n", three("opr (x:{T}): : LeftRange[\\{T}\\] = x#") + "\n"),
        ("opr (l:I)::[\\I\\] : LeftRange[\\I\\] = l#\n", three("opr (l:{T}):: : LeftRange[\\{T}\\] = l#") + "\n"),
        ("opr ::[\\I\\](l:I,s:I): LeftRange[\\I\\] = (l:):s\n", three("opr ::(l:{T},s:{T}): LeftRange[\\{T}\\] = (l:):s") + "\n")]}
for n, reps in SPLITS.items():
    s = rd(n)
    for a, b in reps:
        assert s.count(a) == 1, (n, a)
        s = s.replace(a, b)
    wr(n, s)
    print("step 3, %s: %d point operators split into three shapes" % (n, len(reps)))

# ---- check: every I, J, K left in the edited regions, by declaration
for n in FILES:
    s = rd(n); lo, hi = region(n, s)
    hs = headers(s, lo, hi)
    left = collections.Counter()
    for i, l in enumerate(s[:hi].split("\n"), 1):
        off = sum(len(x) + 1 for x in s.split("\n")[:i - 1])
        if off < lo: continue
        if re.search(r"(?<![\w'])[IJK](?![\w'])", l):
            owner = [h[1] for h in hs if h[0] <= off]
            left[owner[-1] if owner else "?"] += 1
    print("left in %s: %s" % (n, dict(left) if left else "none"))
