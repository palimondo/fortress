#!/usr/bin/env python3
"""Every native binding of the one library, and every native-backed declaration of
the compiler prelude, as TSV.  Run from the repository root.
  bindings.tsv : file line owner kind name header glue           (builtinPrimitive bodies)
  objects.tsv  : file line object javaclass                       (objects of a `native component`)
  cprelude.tsv : file line owner name header alias javamethod     (compiler prelude bodies calling an `import java` alias)
"""
import re, sys, os

LIB = ['Library/FortressLibrary.fss', 'ProjectFortress/LibraryBuiltin/FortressBuiltin.fss',
       'Library/Reflect.fss', 'Library/File.fss', 'Library/FlatString.fss', 'Library/Writer.fss',
       'Library/Reader.fss', 'ProjectFortress/LibraryBuiltin/NativeArray.fss', 'Library/System.fss',
       'ProjectFortress/LibraryBuiltin/AnyType.fss']
CPRE = ['ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss', 'Library/CompilerLibrary.fss',
        'Library/CompilerAlgebra.fss', 'Library/CompilerSystem.fss']

def strip_comments(s):
    out, i, depth = [], 0, 0
    while i < len(s):
        if not depth and s.startswith('(*)', i):
            j = s.find('\n', i)
            j = len(s) if j < 0 else j
            out.append(' ' * (j - i)); i = j; continue
        if not depth and s[i] == '"':
            j = i + 1
            while j < len(s) and s[j] != '"' and s[j] != '\n':
                j += 2 if s[j] == '\\' else 1
            out.append(s[i:j + 1]); i = j + 1; continue
        if s.startswith('(*', i): depth += 1; out.append('  '); i += 2; continue
        if depth and s.startswith('*)', i): depth -= 1; out.append('  '); i += 2; continue
        c = s[i]
        out.append(c if (not depth or c == '\n') else ' ')
        i += 1
    return ''.join(out)

OWNER_RE = re.compile(r'^(?:private\s+)?(?:value\s+)?(trait|object)\s+([A-Za-z_][A-Za-z0-9_]*)')
DECL_START = re.compile(r'^\s*(?:private\s+|abstract\s+|override\s+)*(opr\b|getter\b|setter\b|coerce\b|[A-Za-z_][A-Za-z0-9_]*\s*(\[\\|\(|⟦))')

def owners(lines):
    """owner of each line: the enclosing top-level trait/object, else '(top)'."""
    res, cur = [], '(top)'
    for ln in lines:
        m = OWNER_RE.match(ln)
        if m: cur = m.group(2)
        res.append(cur)
        if re.match(r'^end\b', ln): cur = '(top)'
    return res

def header_before(lines, li, col):
    """the declaration header that ends with the '=' before (li, col)."""
    text = lines[li][:col]
    j = li
    parts = [text]
    while not DECL_START.match(parts[0]) and j > 0:
        j -= 1
        parts.insert(0, lines[j])
    h = ' '.join(p.strip() for p in parts)
    h = re.sub(r'\s*=\s*$', '', h).strip()
    return j, h

def decl_name(h):
    m = re.match(r'(?:private\s+|abstract\s+|override\s+)*(opr|getter|setter|coerce)?\s*(.*)', h)
    kind = m.group(1) or 'fn'
    rest = m.group(2)
    if kind == 'opr':
        # opr NAME(… | opr (self…)NAME | opr |self| | opr [ …]
        mm = re.match(r'\s*(\|self\||\|\|?|[^\s(\[\\]+)', rest)
        if rest.startswith('('):  # postfix, e.g. opr (self)!
            mm2 = re.search(r'\)\s*([^\s:(]+)', rest)
            return kind, (mm2.group(1) if mm2 else '?')
        return kind, (mm.group(1) if mm else '?')
    mm = re.match(r'\s*([A-Za-z_][A-Za-z0-9_]*)', rest)
    return kind, (mm.group(1) if mm else '?')

def lib_bindings():
    rows, objs = [], []
    for f in LIB:
        if not os.path.exists(f): continue
        raw = open(f, encoding='utf-8').read()
        s = strip_comments(raw)
        lines = s.split('\n')
        own = owners(lines)
        native = re.search(r'^native component', s, re.M) is not None
        pkg = re.search(r'package\s*(?::\s*String)?\s*=\s*"([^"]+)"', s)
        for li, ln in enumerate(lines):
            m = OWNER_RE.match(ln)
            if native and m and m.group(1) == 'object':
                objs.append((f, li + 1, m.group(2), (pkg.group(1) + '.' + m.group(2)) if pkg else '?'))

        starts = [0]
        for ln in lines: starts.append(starts[-1] + len(ln) + 1)
        import bisect
        for mm in re.finditer(r'builtinPrimitive\s*\(\s*"([^"]+)"\s*\)', s):
            li = bisect.bisect_right(starts, mm.start()) - 1
            col = mm.start() - starts[li]
            pre = lines[li][:col].rstrip()
            if pre.endswith('='):
                hl, h = header_before(lines, li, len(pre))
            else:
                k = li - 1
                while k >= 0 and not lines[k].rstrip().endswith('='): k -= 1
                hl, h = header_before(lines, k, len(lines[k].rstrip()))
            kind, name = decl_name(h)
            rows.append((f, hl + 1, own[hl], kind, name, h, mm.group(1)))
    return rows, objs

def cprelude():
    rows = []
    for f in CPRE:
        raw = open(f, encoding='utf-8').read()
        s = strip_comments(raw)
        alias = {}
        for m in re.finditer(r'import\s+java\s+([\w.]+)\.\{([^}]*)\}', s):
            pkg = m.group(1)
            for it in m.group(2).split(','):
                it = it.strip()
                if not it: continue
                mm = re.match(r'([\w.]+)\s*=>\s*(\w+)', it)
                if mm: alias[mm.group(2)] = pkg + '.' + mm.group(1)
                else: alias[it.split('.')[-1]] = pkg + '.' + it
        lines = s.split('\n')
        own = owners(lines)
        for li, ln in enumerate(lines):
            if re.match(r'^\s*import\b', ln): continue
            if not DECL_START.match(ln): continue
            # the '=' between header and body: the first one with space (or end of line) after it
            sep = re.search(r'=(\s|$)', ln)
            while sep and ln[:sep.start()].rstrip().endswith(('<', '>', '/', '=', '!')) and not ln[:sep.start()].endswith(' '):
                sep = re.search(r'=(\s|$)', ln[sep.end():]) and re.compile(r'=(\s|$)').search(ln, sep.end())
            if not sep: continue
            body = ln[sep.end():]
            if body.strip() == '' and li + 1 < len(lines): body = lines[li + 1]
            used = [a for a in re.findall(r'\b(j[A-Za-z0-9_]+)\s*\(', body) if a in alias]
            if not used: continue
            h = ln[:sep.start()].strip()
            kind, name = decl_name(h)
            rows.append((f, li + 1, own[li], kind, name, h, used[0], alias[used[0]]))
    return rows

if __name__ == '__main__':
    out = sys.argv[1]
    rows, objs = lib_bindings()
    with open(os.path.join(out, 'bindings.tsv'), 'w') as fh:
        fh.write('file\tline\towner\tkind\tname\theader\tglue\n')
        for r in rows: fh.write('\t'.join(map(str, r)) + '\n')
    with open(os.path.join(out, 'objects.tsv'), 'w') as fh:
        fh.write('file\tline\tobject\tjavaclass\n')
        for r in objs: fh.write('\t'.join(map(str, r)) + '\n')
    cr = cprelude()
    with open(os.path.join(out, 'cprelude.tsv'), 'w') as fh:
        fh.write('file\tline\towner\tkind\tname\theader\talias\tjavamethod\n')
        for r in cr: fh.write('\t'.join(map(str, r)) + '\n')
    from collections import Counter
    print('bindings', len(rows), Counter(r[0] for r in rows))
    print('native objects', len(objs), Counter(r[0] for r in objs))
    print('compiler prelude native-backed decls', len(cr), Counter(r[0] for r in cr))
