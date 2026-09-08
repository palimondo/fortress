#!/bin/bash
# Render a LaTeX math snippet to figures/NAME.svg (same TeX/dvisvgm pipeline as the code figures).
# Usage: mathfig.sh NAME 'latex math (display mode, no $$)'
set -u
ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
FIG="$ROOT/experiment/worker/figures"
NAME="$1"; MATH="$2"
cd "$FIG"
cat > "$NAME.tex" <<EOF
\documentclass{article}
\usepackage{amsmath,amssymb}
\usepackage[active,tightpage]{preview}
\setlength\PreviewBorder{6pt}
\begin{document}
\begin{preview}
\$\displaystyle $MATH\$
\end{preview}
\end{document}
EOF
latex -interaction=nonstopmode "$NAME.tex" > "$NAME.latex.out" 2>&1; st=$?
if [ $st -ne 0 ]; then grep -A4 '^!' "$NAME.latex.out" | head -20; fi
dvisvgm --no-fonts --exact-bbox -o "$NAME.svg" "$NAME.dvi" > /dev/null 2>&1
rm -f "$NAME.tex" "$NAME.dvi" "$NAME.aux" "$NAME.log" "$NAME.latex.out"
ls -la "$NAME.svg" | awk '{print $5, $9}'
