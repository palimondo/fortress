#!/bin/bash
# usage: render.sh <file.tic> [png]  -- fortick -> latex -> dvisvgm (-> chromium png); leaves <name>.svg beside the .tic
source /home/user/fortress/experiment/env.sh
cd "$(dirname "$1")"; f="$(basename "$1")"; n="${f%.tic}"
"$FORTRESS_HOME/bin/fortick" -q "$f" > "$n.fortick.log" 2>&1 || { echo "fortick failed: $n"; tail -5 "$n.fortick.log"; exit 1; }
TEXINPUTS=".:$FORTRESS_HOME/Fortify:" latex -interaction=nonstopmode "$n.tex" > "$n.latex.log" 2>&1 || { echo "latex failed: $n"; grep -n "^!" "$n.latex.log" | head -5; }
[ -s "$n.dvi" ] || { echo "no dvi: $n"; exit 1; }
dvisvgm --no-fonts --exact-bbox -o "$n.svg" "$n.dvi" > "$n.dvisvgm.log" 2>&1 || { echo "dvisvgm failed: $n"; exit 1; }
if [ "$2" = "png" ]; then /opt/pw-browsers/chromium --headless --no-sandbox --disable-gpu --screenshot="$n.png" "$n.svg" > /dev/null 2>&1; fi
rm -f "$n.tex" "$n.dvi" "$n.aux" "$n.log" "$n.fortick.log" "$n.latex.log" "$n.dvisvgm.log"
echo "rendered $n.svg ($(wc -c < "$n.svg") bytes)"
