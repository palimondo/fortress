#!/usr/bin/env python3
"""sentence-scan.py <mode own|lifted> <file...>: pairs of same-named declarations whose static
parameters differ (Specification/basic/overloading.tex:100-105), found from the text.  Groups the
names the compiled overloading checker examines: top-level functions with the functional methods
(declarations with a `self` parameter inside a trait or object), and each trait's or object's own
dotted methods (inherited ones are not seen).  Local functions are not overloads the checker
examines and are skipped (indented deeper than the enclosing block's members).  Symbolic operators
are listed apart, because the checker skips them (NodeUtil.validOp).  Static parameters are compared
by count, kind and bounds after positional renaming.  Prints one line per pair: file:line:line name."""
import re, sys, itertools
import os
mode, files = sys.argv[1], [f for f in sys.argv[2:] if os.path.exists(f)]   # an unmatched glob is skipped
DECL = re.compile(r'^(\s*)(?:(?:private|abstract|getter|setter|override|value|coerce)\s+)*'
                  r'(opr\s+(?:BIG\s+)?(?:\S+?)|[A-Za-z_][A-Za-z0-9_\']*)\s*(\[\\.*?\\\])?\s*\((.*)$')
TO = re.compile(r'^(\s*)(?:value\s+)?(trait|object)\s+([A-Za-z_][A-Za-z0-9_]*)\s*(\[\\.*?\\\])?')
KEYW = {'if','while','for','do','case','typecase','label','exit','throw','atomic','spawn','then','else',
        'elif','end','println','print','assert','fail','try','catch','fn','of','in','also','at'}
def strip_comments(s):
    out, depth, i = [], 0, 0
    while i < len(s):
        if depth == 0 and s.startswith('(*)', i):
            j = s.find('\n', i); i = len(s) if j < 0 else j; continue
        if s.startswith('(*', i): depth += 1; i += 2; continue
        if depth and s.startswith('*)', i): depth -= 1; i += 2; continue
        if depth == 0 or s[i] == '\n': out.append(s[i])
        i += 1
    return ''.join(out)
def sparams(txt):
    if not txt: return []
    inner = txt[2:-2]
    parts, d, cur = [], 0, ''
    for ch in inner:
        if ch in '[(': d += 1
        if ch in '])': d -= 1
        if ch == ',' and d == 0: parts.append(cur.strip()); cur = ''
        else: cur += ch
    if cur.strip(): parts.append(cur.strip())
    res = []
    for p in parts:
        m = re.match(r'(nat|int|bool|dim|unit|opr)\s+(\S+)(.*)', p)
        kind, name, rest = (m.group(1), m.group(2), m.group(3)) if m else ('type', p.split()[0], p[len(p.split()[0]):])
        b = re.sub(r'^\s*extends\s*', '', rest).strip().strip('{}').strip()
        b = '' if b in ('', 'Any') else b
        res.append((kind, name, b))
    return res
def differ(p, q):
    if len(p) != len(q) or any(a[0] != b[0] for a, b in zip(p, q)): return True
    ren = {b[1]: a[1] for a, b in zip(p, q)}
    def r(t): return re.sub(r'\b[A-Za-z_]\w*\b', lambda m: ren.get(m.group(0), m.group(0)), t)
    return any(a[2].replace(' ', '') != r(b[2]).replace(' ', '') for a, b in zip(p, q))
def valid_op(n):   # NodeUtil.validOp for the opr names the checker examines
    if n in ('juxtaposition','in','per','square','cubic','inverse','squared','cubed'): return True
    if n in ('SUM','PROD') or len(n) < 2 or n.startswith('_') or n.endswith('_'): return False
    return all(c == '_' or c.isupper() for c in n)
for f in files:
    lines = strip_comments(open(f, encoding='utf-8', errors='replace').read()).split('\n')
    for k in range(len(lines) - 1):   # a header whose parameter list starts on the next line
        if re.match(r'^\s*(opr\s+[^\s(\[]+|\w+)\s*(\[\\[^()]*\\\])?\s*$', lines[k]) and re.match(r'\s*\(', lines[k + 1]):
            lines[k] = lines[k] + ' ' + lines[k + 1].strip(); lines[k + 1] = ''
    groups = {}          # (scope, name) -> [(line, sparams, symbolic)]
    scope, sp_trait, member_ind = None, [], None
    for i, l in enumerate(lines, 1):
        if not l.strip(): continue
        ind = len(l) - len(l.lstrip())
        m = TO.match(l)
        if m and ind == 0:
            hdr = l[m.end(3):].lstrip(); sp_txt = None
            if hdr.startswith('[\\'):          # the trait's parameters, balanced
                d = 0
                for k in range(len(hdr) - 1):
                    if hdr.startswith('[\\', k): d += 1
                    elif hdr.startswith('\\]', k):
                        d -= 1
                        if d == 0: sp_txt = hdr[:k + 2]; break
            scope, sp_trait, member_ind = m.group(3), sparams(sp_txt), None
            if re.search(r'\bend\s*$', l): scope = None
            continue
        if ind == 0 and re.match(r'end\b', l.strip()): scope = None; continue
        if ind == 0 and scope is not None and not l.startswith(' '): scope = None
        m = DECL.match(l)
        if not m: continue
        name = m.group(2)
        if name in KEYW: continue
        rest = m.group(4)
        if scope is None:
            if ind != 0: continue
        else:
            if member_ind is None: member_ind = ind
            if ind != member_ind: continue
        is_opr = name.startswith('opr')
        base = re.sub(r'^opr\s+', '', name)
        symbolic = is_opr and not valid_op(re.sub(r'^BIG\s+', '', base))
        # a declaration has a return type, a body, or ends the api line; a call does neither
        if not re.search(r'\)\s*(:|=|$|throws|requires|ensures|end\b)', rest) and not rest.rstrip().endswith(','):
            continue
        own = sparams(m.group(3))
        functional = scope is not None and re.search(r'\bself\b', rest.split(')')[0] + ')')
        if scope is None or functional:
            key = (None, base)
            spl = (sp_trait + own) if (functional and mode == 'lifted') else own
        else:
            key = (scope, base); spl = own
        groups.setdefault(key, []).append((i, spl, symbolic))
    for (sc, n), ds in sorted(groups.items(), key=lambda kv: kv[1][0][0]):
        for (a, pa, sa), (b, pb, sb) in itertools.combinations(ds, 2):
            if differ(pa, pb):
                tag = 'SYMBOLIC ' if (sa or sb) else ''
                print(f"{f}:{a}:{b}\t{tag}{n}" + (f"\t(in {sc})" if sc else ''))
