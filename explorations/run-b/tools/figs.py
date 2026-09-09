"""Typeset marked regions of the actual source.

Extracts every (* FIG name *) ... (* END FIG *) region of a Fortress source file
into figures/PREFIX_name.tic and renders it with figures/render.sh, so a figure
can only ever show what the interpreter runs.  Usage:
    tools/figs.py SRC.fss PREFIX [name ...]
"""
import os, re, subprocess, sys, textwrap
HERE = os.path.dirname(os.path.abspath(__file__))
FIG = os.path.join(HERE, '..', 'figures')
src, prefix = sys.argv[1], sys.argv[2]
only = set(sys.argv[3:])
text = open(src).read()
HEADER = r"""\documentclass{article}
\usepackage{fortify}
\usepackage[active,tightpage]{preview}
\setlength\PreviewBorder{8pt}
\begin{document}
\begin{preview}
"""
FOOTER = "\n\\end{preview}\n\\end{document}\n"
for m in re.finditer(r'\(\* FIG (\w+) \*\)\n(.*?)\n[ \t]*\(\* END FIG \*\)', text, flags=re.S):
    name, body = m.group(1), textwrap.dedent(m.group(2))
    if only and name not in only: continue
    fname = '%s_%s' % (prefix, name)
    open(os.path.join(FIG, fname + '.tic'), 'w').write(HEADER + '`' + body.rstrip() + '`' + FOOTER)
    r = subprocess.run([os.path.join(FIG, 'render.sh'), fname], capture_output=True, text=True)
    last = [l for l in r.stdout.strip().split('\n') if 'exit' in l]
    print(fname, last[-1] if last else r.stdout[-300:])
