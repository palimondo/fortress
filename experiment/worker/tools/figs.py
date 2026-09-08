"""Extract (* FIG name *) ... (* END FIG *) regions from a Fortress source file into
figures/NAME.tic and render them with render.sh. Figures are therefore always typeset
from the actual source. Usage: figs.py SRC.fss [prefix] [name ...]"""
import os, re, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__))
FIG = os.path.join(HERE, '..', 'figures')
src = sys.argv[1]
prefix = sys.argv[2] if len(sys.argv) > 2 else 'fig'
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
for m in re.finditer(r'\(\* FIG (\w+) \*\)\n(.*?)\n\(\* END FIG \*\)', text, flags=re.S):
    name, body = m.group(1), m.group(2)
    if only and name not in only: continue
    fname = '%s_%s' % (prefix, name)
    open(os.path.join(FIG, fname + '.tic'), 'w').write(HEADER + '`' + body.rstrip() + '`' + FOOTER)
    r = subprocess.run([os.path.join(HERE, '..', 'render.sh'), fname], capture_output=True, text=True)
    last = [l for l in r.stdout.strip().split('\n') if 'render exit' in l]
    print(fname, last[-1] if last else r.stdout[-200:])
