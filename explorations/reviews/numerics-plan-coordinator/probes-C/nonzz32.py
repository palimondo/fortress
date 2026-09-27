#!/usr/bin/env python3
"""nonzz32.py : candidates for question 3 of measure-C, ranges whose integer is not ZZ32.
Reads, under /home/user/fortress: ProjectFortress/tests, ProjectFortress/demos (recursively),
Library, ProjectFortress/LibraryBuiltin, explorations/run-c4/src, SpecData/examples (the sources
of the specification's example boxes) and the Fortress source kept in `%` comment lines of
Specification/**/*.tex.  For each file, comments and string literals are blanked; then
  - the identifiers of a non-ZZ32 integer type are collected: declared `x: ZZ64` (also NN32,
    NN64, ZZ; parameters, locals, fields, `var`), or bound `x = e` where e contains a widen(,
    unsigned(, big( call or such an identifier (to a fixpoint);
  - a line is a candidate when it holds a range-building form (a binary, prefix or postfix `#`,
    `:` or `::` whose operand is not a type, or seq( ) and one of its operands mentions such an
    identifier or a widen(/unsigned(/big( call, or when it is a `for`/generator clause
    `x <- r` over an identifier r bound to such a range.
Prints file:line and the line as written; each candidate is then read by hand (measure-C.md)."""
import os, re, sys, glob

ROOT = "/home/user/fortress"
T = r"(?:ZZ64|NN32|NN64|ZZ)"
CONV = re.compile(r"\b(?:widen|unsigned|big)\s*\(")

def blank(src, tex=False):
    """blank comments and strings, keeping line structure"""
    out, i, depth, instr = [], 0, 0, False
    while i < len(src):
        c = src[i]
        if not instr and src.startswith("(*)", i) and depth == 0:     # line comment
            j = src.find("\n", i); j = len(src) if j < 0 else j
            out.append(" " * (j - i)); i = j; continue
        if not instr and src.startswith("(*", i): depth += 1; out.append("  "); i += 2; continue
        if not instr and depth and src.startswith("*)", i): depth -= 1; out.append("  "); i += 2; continue
        if depth: out.append("\n" if c == "\n" else " "); i += 1; continue
        if c == '"' and not (i and src[i - 1] == "\\"): instr = not instr; out.append(" "); i += 1; continue
        if instr: out.append("\n" if c == "\n" else " "); i += 1; continue
        out.append(c); i += 1
    return "".join(out)

def files():
    for d in ("ProjectFortress/tests", "ProjectFortress/demos", "Library", "ProjectFortress/LibraryBuiltin",
              "explorations/run-c4/src", "SpecData/examples"):
        for p in sorted(glob.glob(os.path.join(ROOT, d, "**", "*.fs[si]"), recursive=True)):
            yield p, open(p, encoding="utf-8", errors="replace").read()
    for p in sorted(glob.glob(os.path.join(ROOT, "Specification", "**", "*.tex"), recursive=True)):
        lines = open(p, encoding="utf-8", errors="replace").read().split("\n")
        # keep only the %-comment lines that hold Fortress source, at their line numbers
        yield p, "\n".join(l[1:] if l.startswith("%") and not l.startswith("%%%") else "" for l in lines)

RANGE = re.compile(r"(?<![:=<>A-Z_])(#|::|:)(?![:=])")   # not AND:, OR:, LEXICO: ...

def operands(line, m):
    """the text left and right of a range operator, cut at a delimiter"""
    left = re.split(r"[,(\[=;{]|<-|←|\bin\b|\bdo\b|\bthen\b", line[:m.start()])[-1]
    right = re.split(r"[,)\]=;}]|\bdo\b|\bthen\b", line[m.end():])[0]
    return left.strip(), right.strip()

def is_type(s): return (re.match(r"^\(?\s*[A-Z][A-Za-z0-9_]*\b", s) is not None or re.match(r"^\(\s*\)", s) is not None) and not CONV.match(s)

hits = []
for p, src in files():
    b = blank(src)
    if not (re.search(r"\b%s\b" % T, b) or CONV.search(b)): continue
    blines = b.split("\n")
    starts = [i for i, l in enumerate(blines) if re.match(r"^[A-Za-z(]", l)] + [len(blines)]
    scope_of = {}
    for a, z in zip(starts, starts[1:]):
        blk = "\n".join(blines[a:z])
        names = set(re.findall(r"\b([a-z_]\w*'?)\s*:\s*%s\b" % T, blk))
        for _ in range(5):
            for m in re.finditer(r"(?m)^\s*(?:var\s+)?([a-z_]\w*'?)\s*(?::\s*\w+\s*)?(?::=|=)(?!=)([^\n]*)", blk):
                rhs = m.group(2)
                if CONV.search(rhs) or any(re.search(r"(?<![\w.])%s(?![\w'])" % re.escape(n), rhs) for n in names):
                    names.add(m.group(1))
        names.discard("self")
        for i in range(a, z): scope_of[i + 1] = names
    rangevars = set()
    for i, line in enumerate(blines, 1):
        names = scope_of.get(i, set())
        wide = lambda s: CONV.search(s) or any(re.search(r"(?<![\w.])%s(?![\w'])" % re.escape(n), s) for n in names)
        why = []
        for m in RANGE.finditer(line):
            l, r = operands(line, m)
            if m.group(1) == ":" and (is_type(r) or r == ""):   # an ascription, or a postfix : (checked on the left)
                if r == "" and l and wide(l): why.append("postfix %s on %s" % (m.group(1), l))
                continue
            if (l and wide(l)) or (r and not is_type(r) and wide(r)):
                why.append("%s: %s | %s" % (m.group(1), l, r))
        for m in re.finditer(r"\bseq\s*\(", line):
            if wide(line[m.end():]): why.append("seq")
        for m in re.finditer(r"^\s*(?:var\s+)?([a-z_]\w*'?)\s*(?::\s*[^=]+)?=(?!=)", line):
            if why: rangevars.add(m.group(1))
        for m in re.finditer(r"(?:<-|←)\s*([a-z_]\w*'?)\b", line):
            if m.group(1) in rangevars: why.append("generator over %s" % m.group(1))
        if why:
            raw = src.split("\n")[i - 1]
            hits.append((os.path.relpath(p, ROOT), i, raw.strip(), "; ".join(why)))
for f, i, raw, why in hits:
    print("%s:%d: %s\n    [%s]" % (f, i, raw[:200], why[:200]))
print("# %d candidate lines" % len(hits), file=sys.stderr)
