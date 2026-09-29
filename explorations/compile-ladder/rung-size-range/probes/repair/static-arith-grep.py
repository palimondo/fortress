# static-arith-grep.py: every static-argument list [\ ... \] in ProjectFortress/tests, ProjectFortress/demos and Library
# (.fss and .fsi) with an element written as arithmetic: a '+', a '-' that is not part of '->', or two adjacent
# operands (juxtaposition, the product); a static parameter's declaration (nat n) and an operator argument are skipped.
# Prints file:line and the element.
import os, re, sys
root = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../../..')
os.chdir(root)
span = re.compile(r'\[\\(.*?)\\\]')
def split_top(s):
    out, depth, cur = [], 0, ''
    for ch in s:
        if ch in '([{': depth += 1
        elif ch in ')]}': depth -= 1
        if ch == ',' and depth == 0: out.append(cur); cur = ''
        else: cur += ch
    out.append(cur); return out
operand = r'(?:[0-9]+|[a-z_][A-Za-z0-9_]*)'
juxt = re.compile(r'^\s*' + operand + r'\s+' + operand + r'(\s+' + operand + r')*\s*$')
arith = re.compile(r'(?<![-<=])[+]|(?<![<=])-(?!>)')
for d in ['ProjectFortress/tests', 'ProjectFortress/demos', 'Library']:
    for dp, _, fs in os.walk(d):
        for f in sorted(fs):
            if not (f.endswith('.fss') or f.endswith('.fsi')): continue
            p = os.path.join(dp, f)
            for i, line in enumerate(open(p, encoding='utf-8', errors='replace'), 1):
                code = line.split('(*)')[0]
                for m in span.finditer(code):
                    for el in split_top(m.group(1)):
                        e = el.strip()
                        if not e: continue
                        if re.match(r'^(nat|int|bool|dim|unit|opr)\s', e): continue   # a static parameter's declaration
                        if not re.search(r'[A-Za-z0-9]', e): continue                   # an operator argument
                        if arith.search(e) or juxt.match(e):
                            print(f'{p}:{i}: {e}')
