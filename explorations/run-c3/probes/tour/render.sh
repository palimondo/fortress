#!/bin/sh
# Rebuild every SVG in this directory, then rebuild ../../tour.html.
#   sh explorations/run-c3/probes/tour/render.sh
# Sources: tour.json (extracted from tour.md), rNN.tic (Fortify), fNN.tex (LaTeX).
set -e
. "$FORTRESS_HOME/explorations/experiment/env.sh"
cd "$(dirname "$0")"
export TEXINPUTS=".:$FORTRESS_HOME/Fortify:"
for n in $(seq -w 1 31); do
  "$FORTRESS_HOME/bin/fortick" "r$n.tic"          # r$n.tic -> r$n.tex
  for p in r f; do
    latex -interaction=nonstopmode "$p$n.tex" >/dev/null
    dvisvgm --no-fonts --exact-bbox -o "$p$n.svg" "$p$n.dvi" >/dev/null 2>&1
  done
done
rm -f ./*.dvi ./*.aux ./*.log
python3 build_tour.py
