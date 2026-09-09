#!/bin/bash
# Render a LaTeX display-math snippet to figures/NAME.svg with the same TeX and
# dvisvgm pipeline as the code figures, so the formula and the Fortress render
# are typeset at parity.  Usage: tools/mathfig.sh NAME 'latex math'
set -u
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/figures"
NAME="$1"; MATH="$2"
cat > "$NAME.tex" <<TEX
\documentclass{article}
\usepackage{amsmath,amssymb}
\usepackage[active,tightpage]{preview}
\setlength\PreviewBorder{6pt}
\begin{document}
\begin{preview}
\mbox{\$\displaystyle $MATH\$}
\end{preview}
\end{document}
TEX
latex -interaction=nonstopmode "$NAME.tex" > "$NAME.latex.out" 2>&1; st=$?
if [ $st -ne 0 ]; then grep -A4 '^!' "$NAME.latex.out" | head -20; fi
dvisvgm --no-fonts --exact-bbox -o "$NAME.svg" "$NAME.dvi" > /dev/null 2>&1
rm -f "$NAME.tex" "$NAME.dvi" "$NAME.aux" "$NAME.log" "$NAME.latex.out"
echo "math $NAME exit: $st $(stat -c %s "$NAME.svg" 2>/dev/null)"
