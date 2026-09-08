#!/bin/bash
# Typeset actual Fortress source: figures/NAME.tic -> NAME.svg (+ NAME.png for inspection).
# Usage: experiment/worker/render.sh NAME   (NAME.tic must live in experiment/worker/figures/)
set -u
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
source "$ROOT/experiment/env.sh"
FIG="$ROOT/experiment/worker/figures"
T="$ROOT/experiment/worker/transcript.txt"
NAME="$1"
cd "$FIG"
{
  echo "======== $(date -u +%Y-%m-%dT%H:%M:%SZ) render $NAME.tic"
  "$FORTRESS_HOME/bin/fortick" "$NAME.tic" && \
  TEXINPUTS=".:$FORTRESS_HOME/Fortify:" latex -interaction=nonstopmode "$NAME.tex" > "$NAME.latex.out" 2>&1; st=$?
  if [ $st -ne 0 ]; then grep -A3 '^!' "$NAME.latex.out" | head -40; fi
  dvisvgm --no-fonts --exact-bbox -o "$NAME.svg" "$NAME.dvi" 2>&1 | tail -2
  /opt/pw-browsers/chromium --headless --no-sandbox --disable-gpu --hide-scrollbars \
     --window-size="${WIN:-1400,900}" --screenshot="$NAME.png" "$NAME.svg" 2>/dev/null
  rm -f "$NAME.tex" "$NAME.dvi" "$NAME.aux" "$NAME.log" "$NAME.latex.out"
  ls -la "$NAME.svg" "$NAME.png" 2>&1
  echo "-------- render exit: $st"
} | tee -a "$T"
