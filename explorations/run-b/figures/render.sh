#!/bin/bash
# Typeset actual Fortress source: figures/NAME.tic -> NAME.svg (+ NAME.png to inspect).
# Usage: figures/render.sh NAME    (from anywhere; NAME.tic lives in figures/)
set -u
ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
source "$ROOT/experiment/env.sh"
cd "$(dirname "$0")"
NAME="$1"
"$FORTRESS_HOME/bin/fortick" "$NAME.tic" 2>&1 | grep -v 'Warning:\|^Loading \|Package cl is deprecated\|^Process with\|^  TEXINPUTS\|^or (for pdf'
TEXINPUTS=".:$FORTRESS_HOME/Fortify:" latex -interaction=nonstopmode "$NAME.tex" > "$NAME.latex.out" 2>&1; st=$?
if [ $st -ne 0 ]; then grep -B2 -A6 '^!' "$NAME.latex.out" | head -40; cp "$NAME.latex.out" "$NAME.latex.err"; fi
dvisvgm --no-fonts --exact-bbox -o "$NAME.svg" "$NAME.dvi" 2>&1 | tail -1
/opt/pw-browsers/chromium --headless --no-sandbox --disable-gpu --hide-scrollbars \
   --window-size="${WIN:-1400,900}" --screenshot="$NAME.png" "$NAME.svg" 2>/dev/null
rm -f "$NAME.tex" "$NAME.dvi" "$NAME.aux" "$NAME.log" "$NAME.latex.out"
echo "render $NAME exit: $st"; ls -la "$NAME.svg" "$NAME.png" 2>&1 | awk '{print $5, $9}'
